import { create } from 'zustand';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const API_URL = import.meta.env.MODE === "development" ? 'http://localhost:3000' : "";

export const useProductStore = create((set, get) => ({
    products: [],
    loading: false,
    error: null,
    currentProduct: null,

    //format data to be sent to the backend
    formData: {
        name: '',
        description: '',
        price: 0,
        category: '',
        image: '',
    },

    // setFormData is used to set the form data
    // resetForm is used to reset the form data to its initial state
    setFormData: (formData) => set({ formData }),
    resetFormData: () => set({
        formData: {
            name: '',
            description: '',
            price: 0,
            category: '',
            image: '',
        }
    }),

    addProduct: async (e) => {
        e.preventDefault();
        set({ loading: true, error: null });
        try {
            const { formData } = get();
            await axios.post(`${API_URL}/api/products`, formData);
            await get().fetchProducts();
            get().resetFormData();
            toast.success('Product added successfully.');
            document.getElementById('add-product-modal').close();
        } catch (error) {
            console.log('An error occurred while adding the product.', error);
            if (error.response && error.response.status === 422) {
                set({ error: 'Please fill in all the fields.' });
            } else if (error.response && error.response.status === 429) {
                set({ error: 'Too many requests. Please try again later.' });
            } else {
                set({ error: 'An error occurred while adding the product.' });
            }
        } finally {
            set({ loading: false });
        }
    },

    fetchProducts: async () => {
        set({ loading: true, error: null });
        try {
            const response = await axios.get(`${API_URL}/api/products`);
            // response.data.data means the first data is coming from axios and the second data is coming from the backend
            set({ products: response.data.data, loading: false });
        } catch (error) {
            if (error.status == 429) {
                set({ error: 'Too many requests. Please try again later.' });
            } else set({ error: 'An error occurred while fetching products.' });
        } finally {
            set({ loading: false });
        }
    },

    get productCount() {
        return get().products.length;
    },

    deleteProduct: async (id) => {
        set({ loading: true, error: null });
        try {
            await axios.delete(`${API_URL}/api/products/${id}`);
            set(prev => ({
                products: prev.products.filter(product => product.id !== id),
            }));
            toast.success('Product deleted successfully.');
        } catch (error) {
            console.log('An error occurred while deleting the product.', error);
            toast.error('An error occurred while deleting the product.');
        } finally {
            set({ loading: false });
        }
    },

    fetchProductsByCategory: async (category) => {
        set({ loading: true, error: null });
        try {
            const res = await axios.get(`${API_URL}/api/products/category/${category}`);
            set({ products: res.data.data, loading: false });
        } catch (err) {
            console.error(err);
            set({
                error: `No products found in '${category}'`,
                products: [],
                loading: false,
            });
        }
    },

    fetchProductById: async (id) => {
        set({ loading: true, error: null });
        try {
            const response = await axios.get(`${API_URL}/api/products/${id}`);
            set({
                currentProduct: response.data.data,
                formData: response.data.data,
                loading: false, error: null,
            });
        } catch (error) {
            console.log('An error occurred while fetching the product.', error);
            set({ error: 'An error occurred while fetching the product.', currentProduct: null });
            toast.error('An error occurred while fetching the product.');
        } finally {
            set({ loading: false });
        }
    },

    updateProduct: async (id) => {
        set({ loading: true, error: null });
        try {
            const { formData } = get();
            const response = await axios.put(`${API_URL}/api/products/${id}`, formData);
            set({ currentProduct: response.data.data });
            toast.success('Product updated successfully.');
        } catch (error) {
            toast.error('An error occurred while updating the product.');
            console.log('An error occurred while updating the product.', error);
        } finally {
            set({ loading: false });
        }
    },
}))
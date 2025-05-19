import React, { useEffect } from 'react';
import { useProductStore } from '../store/useProductStore';
import { PackageIcon, PlusCircleIcon, RefreshCcw } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import AddProductModal from '../components/AddProductModal';
import CategoryDropdown from '../components/CategoryDropdown';

export default function HomePage() {
  const { products, loading, error, fetchProducts } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <button
          className="flex py-3 px-4 rounded-full bg-blue-500"
          onClick={() =>
            document.getElementById('add-product-modal').showModal()
          }
        >
          <PlusCircleIcon className="mr-2" />
          Add Product
        </button>
        <button>
          <RefreshCcw
            className="w-6 h-6 text-white hover:text-gray-400 transition-colors"
            onClick={fetchProducts}
          />
        </button>
      </div>

      <AddProductModal />
      <CategoryDropdown />

      {error && (
        <div className="alert alert-error mb-8">
          <div>
            <span>{error}</span>
          </div>
        </div>
      )}

      {products.length === 0 && !loading && (
        <div className="flex flex-col justify-center items-center h-96 space-y-4">
          <div className="bg-base-100 rounded-full p-6">
            <PackageIcon className="size-12" />
          </div>
          <div className="text-center space-y-2">
            <h3 className="text-2xl font-semibold ">No products found</h3>
            <p className="text-gray-500 max-w-sm">
              Get started by adding your first product to the inventory
            </p>
          </div>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <span className="text-xl">Fetching the products</span>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 ml-4"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid:cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </main>
  );
}

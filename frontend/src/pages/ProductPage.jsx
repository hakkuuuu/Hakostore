import { useEffect } from 'react';
import { useProductStore } from '../store/useProductStore';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save, Trash } from 'lucide-react';

export default function ProductPage() {
  const {
    currentProduct,
    formData,
    setFormData,
    loading,
    error,
    fetchProductById,
    updateProduct,
    deleteProduct,
  } = useProductStore();

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    fetchProductById(id);
  }, [fetchProductById, id]);

  const handeleDelete = async () => {
    await deleteProduct(id);
    navigate('/');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="loading loading-spinner loading-lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="alert alert-error shadow-lg">
          <div>
            <span>{error}</span>
          </div>
        </div>
      </div>
    );
  }

  console.log('Current', currentProduct);
  return (
    <div className="container mx-auto px-4 py-6 max-w-4xl">
      <button
        onClick={() => navigate('/')}
        className="btn btn-ghost mb-8 rounded-full"
      >
        <ArrowLeft className="size-4 mr-2" />
        Back to Products
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="rounded-lg overflow-hidden shadow-lg bg-base-100">
          <img
            src={currentProduct?.image}
            alt={currentProduct?.name}
            className="size-full object-cover"
          />
        </div>

        {/* Product Form */}
        <div className="card bg-base-100 shadow-lg">
          <div className="card-body">
            <h2 className="card-title text-2xl font-bold mb-6">Edit Product</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                updateProduct(id);
              }}
              className="space-y-6"
            >
              {/* Product Name */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Product Name</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Product Name"
                    className="input input-bordered w-full"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                </div>
              </div>

              {/* Product Category */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Product Category</span>
                </label>
                <div className="relative">
                  <select
                    className="select select-bordered w-full focus:select-primary transition-colors duration-200"
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                  >
                    <option disabled value="">
                      Select a category
                    </option>

                    <option value="electronics">Electronics</option>
                    <option value="clothing">Clothing</option>
                    <option value="accessories">Accessories</option>
                  </select>
                </div>
              </div>

              {/* Product Price */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Product Price</span>
                </label>
                <div className="relative">
                  <input
                    type="number"
                    placeholder="Product Price"
                    className="input input-bordered w-full"
                    value={formData.price}
                    onChange={(e) =>
                      setFormData({ ...formData, price: e.target.value })
                    }
                  />
                </div>
              </div>
              {/* Product Image */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Product Image URL</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Product Image URL"
                    className="input input-bordered w-full"
                    value={formData.image}
                    onChange={(e) =>
                      setFormData({ ...formData, image: e.target.value })
                    }
                  />
                </div>
              </div>

              {/* Product Description */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Product Description</span>
                </label>
                <div className="relative">
                  <textarea
                    placeholder="Product Description"
                    className="textarea textarea-bordered w-full"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                  />
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex justify-between items-center">
                <button
                  type="button"
                  className="btn btn-error btn-outline rounded-full"
                  onClick={handeleDelete}
                >
                  Delete Product
                  <Trash className="size-4" />
                </button>
                <button
                  type="submit"
                  className="btn btn-info btn-outline rounded-full"
                  disabled={
                    loading ||
                    !formData.name ||
                    !formData.price ||
                    !formData.image ||
                    !formData.category
                  }
                >
                  {loading ? (
                    <span className="loading loading-spinner loading-sm" />
                  ) : (
                    <>
                      <Save className="size-4" />
                      Save Changes
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

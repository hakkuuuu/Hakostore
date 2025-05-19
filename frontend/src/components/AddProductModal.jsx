import {
  DollarSignIcon,
  ImageIcon,
  Package2Icon,
  PlusCircleIcon,
} from 'lucide-react';
import { useProductStore } from '../store/useProductStore';

function AddProductModal() {
  const { addProduct, formData, setFormData, loading } = useProductStore();

  return (
    <dialog id="add-product-modal" className="modal">
      <div className="modal-box">
        {/* CLOSE BUTTON */}
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            X
          </button>
        </form>

        {/* MODAL HEADER */}
        <h3 className="font-bold text-xl mb-8">Add New Product</h3>

        <form onSubmit={addProduct} className="space-y-6">
          <div className="grid gap-6">
            {/* PRODUCT NAME INPUT */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-base font-medium">
                  Product Name
                </span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-base-content/50"></div>
                <input
                  type="text"
                  placeholder="Enter product name"
                  className="input input-bordered w-full py-3 focus:input-primary transition-colors duration-200"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>
            </div>

            {/* PRODUCT CATEGORY */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-base font-medium">
                  Category
                </span>
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

                  <option value="Electronics">Electronics</option>
                  <option value="Clothing">Clothing</option>
                  <option value="Accessories">Accessories</option>
                </select>
              </div>
            </div>

            {/* PRODUCT PRICE INPUT */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-base font-medium">Price</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-base-content/50"></div>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                  className="input input-bordered w-full py-3 focus:input-primary transition-colors duration-200"
                  value={formData.price === 0 ? '' : formData.price}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      price:
                        e.target.value === '' ? 0 : parseFloat(e.target.value),
                    })
                  }
                />
              </div>
            </div>

            {/* PRODUCT IMAGE */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-base font-medium">
                  Image URL
                </span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none text-base-content/50"></div>
                <input
                  type="text"
                  placeholder="https://example.com/image.jpg"
                  className="input input-bordered w-full py-3 focus:input-primary transition-colors duration-200"
                  value={formData.image}
                  onChange={(e) =>
                    setFormData({ ...formData, image: e.target.value })
                  }
                />
              </div>
            </div>
          </div>

          {/* PRODUCT DECRIPTION */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-base font-medium">
                Description
              </span>
            </label>

            <div className="relative">
              <textarea
                className="textarea textarea-bordered h-24 w-full resize-none focus:textarea-primary transition-colors duration-200"
                placeholder="Enter product description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              ></textarea>
            </div>
          </div>

          {/* MODAL ACTIONS */}
          <div className="modal-action">
            <button
              type="button"
              className="btn btn-error btn-outline rounded-full"
              onClick={() =>
                document.getElementById('add-product-modal')?.close()
              }
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex btn btn-info rounded-full bg-blue-600 text-white"
              disabled={
                !formData.name ||
                !formData.price ||
                !formData.image ||
                !formData.category ||
                loading
              }
            >
              {loading ? (
                <span className="loading loading-spinner loading-sm" />
              ) : (
                <>
                  <PlusCircleIcon className="mr-2" />
                  Add Product
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* BACKDROP */}
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
}
export default AddProductModal;

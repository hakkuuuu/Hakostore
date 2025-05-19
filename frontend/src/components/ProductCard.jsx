import { EditIcon, Trash } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useProductStore } from '../store/useProductStore';

export default function ProductCard({ product }) {
  const { deleteProduct } = useProductStore();
  console.log(product);
  return (
    <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300 rounded-3xl">
      {/* Product Image */}
      <figure className="w-full h-56 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.onerror = null; // prevents infinite loop
            e.target.src =
              'https://media.istockphoto.com/id/1409329028/vector/no-picture-available-placeholder-thumbnail-icon-illustration-design.jpg?s=612x612&w=0&k=20&c=_zOuJu755g2eEUioiOUdz_mHKJQJn-tDgIAhQzyeKUQ=';
          }}
        />
      </figure>

      {/* Product Details */}
      <div className="card-body">
        <h2 className="card-title">{product.name}</h2>
        <p className="text-gray-500 w-full break-words">
          {product.description}
        </p>
        <span className="text-lg text-blue-400 font-bold">${product.price}</span>

        {/* Card Actions */}
        <div className="card-actions justify-between items-center">
          <Link
            to={`/product/${product.id}`}
            className="btn btn-info btn-outline flex items-center gap-1 rounded-full"
          >
            Edit Product <EditIcon className="size-4 m-2" />
          </Link>

          <button
            className="btn btn-error btn-outline flex items-center gap-1 rounded-full"
            onClick={() => deleteProduct(product.id)}
          >
            Delete Product <Trash className="size-4 m-2" />
          </button>
        </div>
      </div>
    </div>
  );
}

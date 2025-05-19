// components/CategoryDropdown.jsx
import React from 'react';
import { useProductStore } from '../store/useProductStore';

const categories = ['All', 'Electronics', 'Clothing', 'Accessories'];

export default function CategoryDropdown() {
  const { fetchProducts, fetchProductsByCategory } = useProductStore();

  const handleChange = (e) => {
    const value = e.target.value;
    if (value === 'All') {
      fetchProducts();
    } else {
      fetchProductsByCategory(value);
    }
  };

  return (
    <div className="mb-6">
      <select
        onChange={handleChange}
        className="select select-bordered w-full max-w-xs rounded-2xl"
        defaultValue="All"
      >
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
    </div>
  );
}

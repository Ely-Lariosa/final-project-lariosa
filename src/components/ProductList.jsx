import React from 'react';
import ProductCard from './ProductCard';
import './ProductList.css';

const ProductList = ({ products, updateQuantity, onProductSelect, onDelete }) => {
  if (products.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-state-icon">📦</div>
        <h3>No Products Found</h3>
        <p>Try selecting a different category or add new products to get started.</p>
      </div>
    );
  }

  return (
    <div className="product-grid">
      {products.map(product => (
        <ProductCard
          key={product.id}
          product={product}
          updateQuantity={updateQuantity}
          onProductSelect={onProductSelect}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default ProductList;
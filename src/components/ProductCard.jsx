import React, { useState } from 'react';
import './ProductCard.css';

const ProductCard = ({ product, updateQuantity, onProductSelect, onDelete }) => {
  const [cartMessage, setCartMessage] = useState('');
  const isLowStock = product.quantity <= 5;

  // --- HANDLERS FOR STOCK ADJUSTMENT (CRITICAL FIX) ---
  const handleIncrease = (e) => {
    e.stopPropagation();
    updateQuantity(product.id, 1); // Increase stock
  };

  const handleDecrease = (e) => {
    e.stopPropagation();
    if (product.quantity > 0) {
      updateQuantity(product.id, -1); // Decrease stock, prevent negative
    }
  };
  // ----------------------------------------------------

  const handleAddToCart = (e) => {
    e.stopPropagation();

    if (product.quantity > 0) {
      setCartMessage(`✓ Added to cart`);
      // When adding to cart, we assume one item is sold, reducing stock by 1
      updateQuantity(product.id, -1); 

      setTimeout(() => {
        setCartMessage('');
      }, 1500);
    } else {
      setCartMessage('Out of stock');
      setTimeout(() => {
        setCartMessage('');
      }, 1500);
    }
  };

  const handleImageClick = () => {
    onProductSelect(product);
  };

  const handleNameClick = () => {
    onProductSelect(product);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    if (window.confirm(`Delete "${product.name}"? This action cannot be undone.`)) {
      onDelete(product.id);
    }
  };

  return (
    <div className={`product-card ${isLowStock ? 'low-stock' : ''}`}>
      <div className="card-image" onClick={handleImageClick}>
        <img 
          src={product.image} 
          alt={product.name}
        />
        <div className={`stock-badge ${isLowStock ? 'low' : ''}`}>
          {isLowStock ? `${product.quantity} left` : 'In Stock'}
        </div>
        <div className="rating-badge">
          ⭐ {product.rating}
        </div>
      </div>
      
      <div className="card-content">
        <div className="card-header">
          <span className="category-tag">{product.category}</span>
          <h3 
            className="card-title"
            onClick={handleNameClick}
          >
            {product.name}
          </h3>
        </div>
        
        <p className="card-description">
          {product.description}
        </p>
        
        {/* Price Section first, since it is core info */}
        <div className="price-section">
          <div className="price">${product.price.toFixed(2)}</div>
          <div className="stock-value">
            <span className="stock-label">Stock:</span>
            <span className={`stock-count ${isLowStock ? 'low' : ''}`}>
              {product.quantity}
            </span>
          </div>
        </div>

        {/* Quantity Controls for stock management (if needed) */}
        <div className="quantity-controls">
          <span className="quantity-label">Adjust Stock:</span>
          <div className="quantity-buttons">
            <button 
              className="quantity-btn decrease"
              onClick={handleDecrease}
              disabled={product.quantity <= 0}
              type="button"
              aria-label="Decrease stock quantity"
            >
              −
            </button>
            <span className="quantity-value">{product.quantity}</span>
            <button 
              className="quantity-btn increase"
              onClick={handleIncrease}
              type="button"
              aria-label="Increase stock quantity"
            >
              +
            </button>
          </div>
        </div>
        
        {/* Cart Message is placed before actions */}
        {cartMessage && (
          <div className={`cart-message ${product.quantity === 0 ? 'error' : 'success'}`}>
            {cartMessage}
          </div>
        )}
        
        <div className="card-actions">
          <button 
            className="action-btn primary-btn"
            onClick={handleAddToCart}
            disabled={product.quantity <= 0}
            type="button"
          >
            🛒 Add to Cart
          </button>
          <button 
            className="action-btn secondary-btn"
            onClick={() => onProductSelect(product)}
            type="button"
          >
            📋 Details
          </button>
          <button 
            className="action-btn danger-btn"
            onClick={handleDelete}
            type="button"
            aria-label="Delete product"
          >
            🗑️ Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
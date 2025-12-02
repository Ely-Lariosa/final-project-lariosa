import React from 'react';

const Header = ({ total, productsCount, lowStockCount }) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  };

  return (
    <header className="header">
      <div className="header-content">
        <div className="header-left">
          <h1> Product Management App</h1>
          <p className="header-subtitle">Modern Product Management System</p>
        </div>
        
        <div className="stats-grid">
          <div className="stat-box">
            <span className="stat-label">Total Products</span>
            <span className="stat-value">{productsCount}</span>
          </div>
          <div className="stat-box">
            <span className="stat-label">Total Value</span>
            <span className="stat-value total">{formatCurrency(total)}</span>
          </div>
          <div className="stat-box">
            <span className="stat-label">Low Stock</span>
            <span className={`stat-value ${lowStockCount > 0 ? 'warning' : ''}`}>
              {lowStockCount}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
import React from 'react';
import './Sidebar.css';

const Sidebar = ({ products, categories, totalProducts, totalValue, lowStockCount }) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  };

  const getCategoryStats = (category) => {
    const categoryProducts = products.filter(p => p.category === category);
    const totalValue = categoryProducts.reduce((sum, p) => sum + (p.price * p.quantity), 0);
    const lowStock = categoryProducts.filter(p => p.quantity <= 5).length;
    
    return {
      count: categoryProducts.length,
      value: totalValue,
      lowStock
    };
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-section">
        <h3 className="sidebar-title">📊 Store Overview</h3>
        
        <div className="overview-stats">
          <div className="overview-stat">
            <span className="overview-label">Total Products</span>
            <span className="overview-value">{totalProducts}</span>
          </div>
          
          <div className="overview-stat">
            <span className="overview-label">Inventory Value</span>
            <span className="overview-value total">{formatCurrency(totalValue)}</span>
          </div>
          
          <div className="overview-stat">
            <span className="overview-label">Low Stock Items</span>
            <span className={`overview-value ${lowStockCount > 0 ? 'warning' : ''}`}>
              {lowStockCount}
            </span>
          </div>
        </div>
      </div>

      <div className="sidebar-section">
        <h3 className="sidebar-title">📈 Category Breakdown</h3>
        
        <div className="category-list">
          {categories.map(category => {
            const stats = getCategoryStats(category);
            
            return (
              <div key={category} className="category-item">
                <div className="category-header">
                  <span className="category-name">{category}</span>
                  <span className="category-count">{stats.count}</span>
                </div>
                
                <div className="category-details">
                  <span className="category-value">{formatCurrency(stats.value)}</span>
                  {stats.lowStock > 0 && (
                    <span className="category-low-stock">
                      ⚠️ {stats.lowStock} low stock
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="sidebar-section">
        <h3 className="sidebar-title">📊 Quick Stats</h3>
        
        <div className="quick-stats">
          <div className="quick-stat">
            <div className="quick-stat-label">Average Price</div>
            <div className="quick-stat-value">
              {formatCurrency(products.reduce((sum, p) => sum + p.price, 0) / products.length)}
            </div>
          </div>
          
          <div className="quick-stat">
            <div className="quick-stat-label">Total Stock</div>
            <div className="quick-stat-value">
              {products.reduce((sum, p) => sum + p.quantity, 0)}
            </div>
          </div>
          
          <div className="quick-stat">
            <div className="quick-stat-label">Avg Rating</div>
            <div className="quick-stat-value">
              ⭐ {(products.reduce((sum, p) => sum + p.rating, 0) / products.length).toFixed(1)}
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
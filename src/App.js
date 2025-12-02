import React, { useState } from 'react';
import ProductList from './components/ProductList';
import ProductForm from './components/ProductForm';
import ProductDetail from './components/ProductDetail';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import './App.css';

const App = () => {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Wireless Earbuds Pro",
      category: "Electronics",
      price: 149.99,
      quantity: 8,
      image: "https://onward.ph/cdn/shop/files/JBLLiveBuds3_Main_Black_520x.png?v=1757249506",
      description: "Noise-cancelling wireless earbuds with premium sound quality",
      specifications: "ANC, 30hr battery, IPX7 waterproof, Wireless charging case",
      rating: 4.7
    },
    {
      id: 2,
      name: "Adjustable Dumbbells",
      category: "Fitness",
      price: 299.99,
      quantity: 4,
      image: "https://images.unsplash.com/photo-1576678927484-cc907957088c?w=400",
      description: "Space-saving adjustable dumbbell set 5-50 lbs",
      specifications: "15 weight settings, Quick-adjust dial, Non-slip grip",
      rating: 4.8
    },
    {
      id: 3,
      name: "4K Ultra HD Smart TV",
      category: "Electronics",
      price: 699.99,
      quantity: 6,
      image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400",
      description: "55-inch 4K Smart TV with built-in streaming apps",
      specifications: "HDR10+, Dolby Vision, 120Hz refresh, Voice remote",
      rating: 4.6
    },
    {
      id: 4,
      name: "Ergonomic Office Chair",
      category: "Office",
      price: 349.99,
      quantity: 7,
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400",
      description: "Premium ergonomic office chair with lumbar support",
      specifications: "Breathable mesh, Adjustable armrests, 360° swivel",
      rating: 4.5
    },
    {
      id: 5,
      name: "Air Fryer Oven",
      category: "Kitchen",
      price: 129.99,
      quantity: 10,
      image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400",
      description: "Multi-function air fryer oven with digital display",
      specifications: "6.3Qt capacity, 7 cooking functions, Digital touchscreen",
      rating: 4.4
    },
    {
      id: 6,
      name: "Mountain Bike",
      category: "Outdoor",
      price: 599.99,
      quantity: 3,
      image: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=400",
      description: "Full-suspension mountain bike for trail riding",
      specifications: "27.5\" wheels, 21-speed, Aluminum frame, Hydraulic disc brakes",
      rating: 4.9
    },
    {
      id: 7,
      name: "Fitness Tracker",
      category: "Fitness",
      price: 89.99,
      quantity: 15,
      image: "https://images.unsplash.com/photo-1576243345690-4e4b79b63288?w=400",
      description: "Advanced fitness tracker with heart rate monitoring",
      specifications: "24/7 HR, Sleep tracking, 10-day battery, Waterproof",
      rating: 4.3
    },
    {
      id: 8,
      name: "Noise Cancelling Headphones",
      category: "Electronics",
      price: 229.99,
      quantity: 5,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
      description: "Over-ear headphones with premium noise cancellation",
      specifications: "Active Noise Cancelling, 35hr battery, Foldable design",
      rating: 4.7
    },
    {
      id: 9,
      name: "Standing Desk Converter",
      category: "Office",
      price: 199.99,
      quantity: 9,
      image: "https://images.unsplash.com/photo-1594337259951-12b6b3a78c6d?w=400",
      description: "Electric sit-stand desk converter for workspace flexibility",
      specifications: "Motorized height adjustment, Memory presets, Spacious desktop",
      rating: 4.6
    },
    {
      id: 10,
      name: "Coffee Maker",
      category: "Kitchen",
      price: 79.99,
      quantity: 12,
      image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400",
      description: "Programmable coffee maker with thermal carafe",
      specifications: "12-cup capacity, Programmable timer, Pause & serve",
      rating: 4.5
    },
    {
      id: 11,
      name: "Hiking Backpack",
      category: "Outdoor",
      price: 129.99,
      quantity: 8,
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400",
      description: "70L hiking backpack with waterproof rain cover",
      specifications: "Multiple compartments, Hydration reservoir, Adjustable straps",
      rating: 4.4
    },
    {
      id: 12,
      name: "Resistance Bands Set",
      category: "Fitness",
      price: 34.99,
      quantity: 20,
      image: "https://images.unsplash.com/photo-1598974357801-cbca100e5d10?w=400",
      description: "Complete resistance bands set for home workouts",
      specifications: "5 resistance levels, Door anchor, Exercise guide",
      rating: 4.2
    }
  ]);

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const addProduct = (newProduct) => {
    const productWithId = {
      ...newProduct,
      id: products.length + 1,
      quantity: parseInt(newProduct.quantity),
      price: parseFloat(newProduct.price),
      rating: parseFloat(newProduct.rating)
    };
    setProducts([...products, productWithId]);
    setIsModalOpen(false);
  };

  const updateQuantity = (productId, change) => {
    setProducts(prevProducts => 
      prevProducts.map(product => {
        if (product.id === productId) {
          const newQuantity = Math.max(0, product.quantity + change);
          return { ...product, quantity: newQuantity };
        }
        return product;
      })
    );
  };

  const deleteProduct = (productId) => {
    setProducts(products.filter(product => product.id !== productId));
    setSelectedProduct(null);
  };

  const editProduct = (updatedProduct) => {
    setProducts(products.map(product => 
      product.id === updatedProduct.id ? updatedProduct : product
    ));
    setSelectedProduct(null);
  };

  const filteredProducts = selectedCategory === "All" 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  const categories = ["All", ...new Set(products.map(p => p.category))];

  const total = products.reduce((sum, product) => {
    return sum + (product.price * product.quantity);
  }, 0);

  const totalProducts = products.length;
  const lowStockCount = products.filter(p => p.quantity <= 5).length;

  return (
    <div className="app">
      <Header 
        total={total} 
        productsCount={totalProducts} 
        lowStockCount={lowStockCount} 
      />
      
      <div className="main-container">
        <div className="add-product-section">
          <button 
            className="add-product-button"
            onClick={() => setIsModalOpen(true)}
          >
            <span className="plus-icon">+</span> Add New Product
          </button>
        </div>

        {isModalOpen && (
          <div className="modal-overlay">
            <div className="modal">
              <div className="modal-header">
                <h2>Add New Product</h2>
                <button 
                  className="close-button"
                  onClick={() => setIsModalOpen(false)}
                  aria-label="Close"
                >
                  ×
                </button>
              </div>
              <div className="modal-content">
                <ProductForm 
                  addProduct={addProduct} 
                  onClose={() => setIsModalOpen(false)}
                />
              </div>
            </div>
          </div>
        )}

        {selectedProduct ? (
          <ProductDetail 
            product={selectedProduct}
            onBack={() => setSelectedProduct(null)}
            onUpdateQuantity={updateQuantity}
            onEditProduct={editProduct}
            onDeleteProduct={deleteProduct}
          />
        ) : (
          <div className="content-layout">
            <Sidebar 
              products={products}
              categories={categories.filter(cat => cat !== "All")}
              totalProducts={totalProducts}
              totalValue={total}
              lowStockCount={lowStockCount}
            />
            
            <div className="main-content">
              <div className="filter-section">
                <h3>Filter by Category</h3>
                <div className="category-filters">
                  {categories.map(category => (
                    <button
                      key={category}
                      className={`filter-btn ${selectedCategory === category ? 'active' : ''}`}
                      onClick={() => setSelectedCategory(category)}
                    >
                      {category}
                      {category !== "All" && (
                        <span className="filter-count">
                          ({products.filter(p => p.category === category).length})
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
              
              <ProductList 
                products={filteredProducts}
                updateQuantity={updateQuantity}
                onProductSelect={setSelectedProduct}
                onDelete={deleteProduct}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
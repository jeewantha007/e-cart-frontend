import React, { useEffect, useState } from 'react';

import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import ProductCard from "../../components/ProductCard";
import axios from 'axios';

export default function Electronics() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [priceRange, setPriceRange] = useState([1000, 100000]);
  const [searchTerm, setSearchTerm] = useState('');
  
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cartItems");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const handleAddToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(item => item.id === product.id);
      let updatedCart;
      if (existingItem) {
        updatedCart = prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        updatedCart = [...prevCart, { ...product, quantity: 1 }];
      }
  
      // Save updated cart to localStorage
      localStorage.setItem("cartItems", JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  // Fetch products once on component mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/v1/category/electronics');
        setProducts(response.data);
        setFilteredProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    
    fetchProducts();
  }, []);

  // Apply filters whenever filter criteria change
  useEffect(() => {
    applyFilters();
  }, [searchTerm, priceRange, products]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const handleReset = () => {
    setPriceRange([1000, 100000]);
    setSearchTerm('');
    setFilteredProducts(products);
  };

  const applyFilters = () => {
    const filtered = products.filter((product) => {
      // Price range check
      const priceMatch = product.price >= priceRange[0] && product.price <= priceRange[1];
      
      // Search term check - search in name and description
      const searchMatch = !searchTerm || 
                         (product.name && product.name.toLowerCase().includes(searchTerm)) || 
                         (product.description && product.description.toLowerCase().includes(searchTerm));
      
      return priceMatch && searchMatch;
    });
    
    setFilteredProducts(filtered);
  };

  return (
    <div className="pro-container">
      <div className="pro-top">
        <h1>Electronics</h1>
        <TextField
          id="outlined-basic"
          placeholder="Search products..."
          variant="outlined"
          value={searchTerm}
          onChange={handleSearchChange}
          sx={{
            width: "300px",
            backgroundColor: "#f5f5f5",
            borderRadius: "8px",
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon style={{ color: "#1976d2" }} />
              </InputAdornment>
            ),
          }}
        />
      </div>

      <div className="pro-content">
        <div className="pro-middle">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                image={product.image || ''}
                category={product.category}
                title={product.name}
                description={product.description}
                price={product.price}
                onAddToCart={() => handleAddToCart(product)}
              />
            ))
          ) : (
            <p>No products found.</p>
          )}
        </div>
      </div>
    </div>
  );
}

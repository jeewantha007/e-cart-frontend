import React, { useEffect, useState } from 'react';
import "./products.css";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import ProductCard from "../../components/ProductCard";
import FilterPanel from "../../components/FilterPanel";
import axios from 'axios';


export default function Products() {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState({});
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

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/v1/products/getAll');
        setFilteredProducts(response.data);
        
        // Initialize categories based on unique product categories
        const uniqueCategories = {};
        response.data.forEach(product => {
          if (product.category) {
            uniqueCategories[product.category] = false;
          }
        });
        setCategories(uniqueCategories);
        
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    
    fetchProducts();
  }, []);

  console.log(filteredProducts);

  const handleCategoryChange = (updatedCategories) => {
    setCategories(updatedCategories);
  };

  const handlePriceRangeChange = (newPriceRange) => {
    setPriceRange(newPriceRange);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const handleReset = () => {
    setCategories({});
    setPriceRange([1000, 100000]);
    setSearchTerm('');
  };

  const filterProducts = () => {
    return filteredProducts.filter((product) => {
      // Check if no categories are selected (all false values)
      const noCategorySelected = Object.values(categories).every((v) => v === false);
      
      // Only check category match if at least one category is selected
      const isCategorySelected = noCategorySelected || 
        (product.category && categories[product.category] === true);
      
      const isPriceInRange = product.price >= priceRange[0] && product.price <= priceRange[1];
      const isTitleMatched = product.name && product.category.toLowerCase().includes(searchTerm);
      
      return isCategorySelected && isPriceInRange && isTitleMatched;
    });
  };

  const productsToDisplay = filterProducts();

  return (
    <div className="pro-container">
      <div className="pro-top">
        <h1>All Products</h1>
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
        <div className="pro-sidebar">
          <FilterPanel
            onCategoryChange={handleCategoryChange}
            onPriceRangeChange={handlePriceRangeChange}
            onReset={handleReset}
          />
        </div>

        <div className="pro-middle">
          {productsToDisplay.length > 0 ? (
            productsToDisplay.map((product) => (
              <ProductCard
                key={product.id}
                image={product.image || ''}
                category={product.category}
                title={product.name}  // Use product.name for title
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

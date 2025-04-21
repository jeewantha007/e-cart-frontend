import React, { useEffect, useState } from 'react';
import "./products.css";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import ProductCard from "../../components/ProductCard";
import FilterPanel from "../../components/FilterPanel";
import axios from 'axios';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState({});
  const [priceRange, setPriceRange] = useState([1000, 100000]);
  const [searchTerm, setSearchTerm] = useState('');
  
  // For storing product reactions (favorites/dislikes)
  const [productReactions, setProductReactions] = useState({});
  
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cartItems");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Function to get userId from localStorage
  const getUserId = () => {
    return localStorage.getItem('userId');
  };

  // Handle adding product to favorites
  const handleFavorite = async (productId, isFavorited) => {
    const userId = getUserId();
    
    if (!userId) {
      alert("Please login to add products to favorites");
      return;
    }
    
    try {
      await axios.post('http://localhost:3000/api/v1/ratings/userRatings', {
        productId,
        userId,
        statusType: 'favorite',
        status: isFavorited ? 1 : 0
      });
      
      // Update local state to reflect the change
      setProductReactions(prev => ({
        ...prev,
        [productId]: {
          ...prev[productId],
          favorite: isFavorited
        }
      }));
      
      console.log(`Product ${isFavorited ? 'added to' : 'removed from'} favorites`);
    } catch (error) {
      console.error('Error updating favorite status:', error);
    }
  };
  
  // Handle disliking a product
  const handleDislike = async (productId, isDisliked) => {
    const userId = getUserId();
    
    if (!userId) {
      alert("Please login to dislike products");
      return;
    }
    
    try {
      await axios.post('http://localhost:3000/api/v1/ratings/userRatings', {
        productId,
        userId,
        statusType: 'dislike',
        status: isDisliked ? 1 : 0
      });
      
      // Update local state to reflect the change
      setProductReactions(prev => ({
        ...prev,
        [productId]: {
          ...prev[productId],
          dislike: isDisliked
        }
      }));
      
      console.log(`Product ${isDisliked ? 'disliked' : 'removed from dislikes'}`);
    } catch (error) {
      console.error('Error updating dislike status:', error);
    }
  };

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
        const response = await axios.get('http://localhost:3000/api/v1/products/getAll');
        setProducts(response.data);
        setFilteredProducts(response.data);
        
        // Initialize categories based on unique product categories
        const uniqueCategories = {};
        response.data.forEach(product => {
          if (product.category) {
            uniqueCategories[product.category] = false;
          }
        });
        setCategories(uniqueCategories);
        
        // Additionally, fetch user ratings if user is logged in
        fetchUserRatings();
        
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    
    fetchProducts();
  }, []);
  
  // Fetch user's existing ratings for products
  const fetchUserRatings = async () => {
    const userId = getUserId();
    if (!userId) return;
    
    try {
      // Fetch user ratings from backend
      const response = await axios.get(`http://localhost:3000/api/v1/ratings/getUserRatings/${userId}`);
      
      // Process the ratings and update state
      const reactions = {};
      response.data.forEach(rating => {
        if (!reactions[rating.product_id]) {
          reactions[rating.product_id] = {};
        }
        
        if (rating.status_type === 'favorite' && rating.status === 1) {
          reactions[rating.product_id].favorite = true;
        }
        
        if (rating.status_type === 'dislike' && rating.status === 1) {
          reactions[rating.product_id].dislike = true;
        }
      });
      
      setProductReactions(reactions);
    } catch (error) {
      console.error('Error fetching user ratings:', error);
    }
  };

  // Apply filters whenever filter criteria change
  useEffect(() => {
    applyFilters();
  }, [searchTerm, categories, priceRange, products]);

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
    const resetCategories = {};
    Object.keys(categories).forEach(cat => {
      resetCategories[cat] = false;
    });
    setCategories(resetCategories);
    setPriceRange([1000, 100000]);
    setSearchTerm('');
    setFilteredProducts(products);
  };

  const applyFilters = () => {
    const filtered = products.filter((product) => {
      const selectedCategories = Object.entries(categories).filter(([_, isSelected]) => isSelected);
      const categoryMatch = selectedCategories.length === 0 || 
                           (product.category && categories[product.category] === true);
      const priceMatch = product.price >= priceRange[0] && product.price <= priceRange[1];
      const searchMatch = !searchTerm || 
                         (product.name && product.name.toLowerCase().includes(searchTerm)) || 
                         (product.description && product.description.toLowerCase().includes(searchTerm));
      return categoryMatch && priceMatch && searchMatch;
    });
    setFilteredProducts(filtered);
  };

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
            categories={categories}
            priceRange={priceRange}
            onCategoryChange={handleCategoryChange}
            onPriceRangeChange={handlePriceRangeChange}
            onReset={handleReset}
          />
        </div>

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
                // Pass the handlers with the product ID and initial reaction state
                handleFavorite={(isFavorited) => handleFavorite(product.id, isFavorited)}
                handleDislike={(isDisliked) => handleDislike(product.id, isDisliked)}
                // Pass initial reaction state
                initialReaction={
                  productReactions[product.id]?.favorite ? "favorite" : 
                  productReactions[product.id]?.dislike ? "dislike" : null
                }
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
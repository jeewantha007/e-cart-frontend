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
  const [priceRange, setPriceRange] = useState([0, 1000000]);
  const [searchTerm, setSearchTerm] = useState('');
  const [productRatings, setProductRatings] = useState({}); // Store average ratings for products

  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cartItems");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const getUserId = () => {
    const userId = localStorage.getItem('userId');
    return userId;
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

  // Handle rating submission - called from ProductCard
  const handleRatingSubmit = async (productId, newRating) => {
    const userId = getUserId();

    if (!userId) {
      console.error('User must be logged in to rate products');
      alert('Please login to rate products');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/api/v1/ratings/submit', {
        product_id: parseInt(productId),
        user_id: parseInt(userId),
        rating: parseInt(newRating)
      });

      if (response.status === 200 || response.status === 201) {
        console.log('Rating submitted successfully:', response.data);
        // Refresh product ratings to get updated averages
        fetchProductRatings();
        alert('Rating submitted successfully!');
      }
    } catch (error) {
      console.error('Error submitting rating:', error);
    }
  };

  // Fetch all product ratings and averages
  const fetchProductRatings = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/v1/ratings/getAll');

      if (response.status === 200) {
        console.log('Ratings data:', response.data); // Debug log
        // Map products by id to ratings object
        const ratingsMap = {};
        response.data.forEach(product => {
          ratingsMap[product.id] = {
            averageRating: parseInt(product.averageRating) || 0,
           
          };
        });
        console.log('Ratings map:', ratingsMap); // Debug log
        setProductRatings(ratingsMap);
      }
    } catch (error) {
      console.error('Error fetching product ratings:', error);
    }
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
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();

    // Fetch product ratings
    fetchProductRatings();
  }, []);

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
    setPriceRange([0, 1000000]);
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

  const currentUserId = getUserId();

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
                productId={product.id}
                userId={currentUserId}
                image={product.image || ''}
                category={product.category}
                title={product.name}
                description={product.description}
                price={product.price}
                qty={product.qty || 0}
                onAddToCart={() => handleAddToCart(product)}
                averageRating={productRatings[product.id]?.averageRating || 0}
                userRating={0}
                onRatingSubmit={handleRatingSubmit}
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

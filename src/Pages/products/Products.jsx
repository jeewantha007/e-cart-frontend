import React, { useState } from 'react';
import "./products.css";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import ProductCard from "../../components/ProductCard";
import FilterPanel from "../../components/FilterPanel";

// Sample product data
const allProducts = [
  { id: 1, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9eR-1ToDErfVoakImpmLaUJlaoJYSwJHAQA&s', category: 'electronics', title: 'Smartphone X', description: 'Latest smartphone...', price: 1999 },
  { id: 2, image: 'https://s.yimg.com/uu/api/res/1.2/8qEpdS41t1J25mZqg2FdWg--~B/Zmk9c3RyaW07aD03MjA7dz0xMjgwO2FwcGlkPXl0YWNoeW9u/https://media-mbst-pub-ue1.s3.amazonaws.com/creatr-uploaded-images/2024-03/fb9eb290-dfcf-11ee-9faf-f58030c650b1', category: 'clothing', title: 'T-shirt', description: 'Stylish t-shirt...', price: 5000 },
  { id: 3, image: 'https://cdn.thewirecutter.com/wp-content/media/2024/11/runningshoes-2048px-09517.jpg?auto=webp&quality=75&width=1024', category: 'footwear', title: 'Running Shoes', description: 'Comfortable running shoes...', price: 5900 },
  { id: 4, image: 'https://cdn.thewirecutter.com/wp-content/media/2023/07/bluetoothheadphones-2048px-0876.jpg', category: 'accessories', title: 'Headphones', description: 'Wireless headphones...', price: 1990 },
  { id: 5, image: 'https://media.amway.eu/sys-master/images/ha3/h31/12164080107550/312396_1_IMAGE_product-image_800_800', category: 'homeKitchen', title: 'Blender', description: 'Powerful kitchen blender...', price: 20000 },
];

export default function Products() {
  const [filteredProducts, setFilteredProducts] = useState(allProducts);
  const [categories, setCategories] = useState({});
  const [priceRange, setPriceRange] = useState([1000, 100000]);
  const [searchTerm, setSearchTerm] = useState('');

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
    return allProducts.filter((product) => {
      const noCategorySelected = Object.values(categories).every((v) => v === false);
      const isCategorySelected = noCategorySelected || categories[product.category];
      const isPriceInRange = product.price >= priceRange[0] && product.price <= priceRange[1];
      const isTitleMatched = product.title.toLowerCase().includes(searchTerm);

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
                image={product.image}
                category={product.category}
                title={product.title}
                description={product.description}
                price={product.price}
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

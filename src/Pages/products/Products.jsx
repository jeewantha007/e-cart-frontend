import React from "react";
import "./products.css";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import ProductCard from "../../components/ProductCard";
import FilterPanel from "../../components/FilterPanel";

export default function Products() {
  return (
    <div className="pro-container">
      <div className="pro-top">
        <h1>All Products</h1>
        <TextField
          id="outlined-basic"
          placeholder="Search products"
          variant="outlined"
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

            <FilterPanel/>

        

        </div>

        <div className="pro-middle">
          <ProductCard />
          <ProductCard />

          <ProductCard />

          <ProductCard />

          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </div>
      </div>
    </div>
  );
}

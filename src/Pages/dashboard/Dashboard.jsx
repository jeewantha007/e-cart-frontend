import React from "react";
import "./dashboard.css";
import Home from "../home/Home";
import Products from "../products/Products";
import Categories from "../Categories/Categories";

import Badge, { badgeClasses } from "@mui/material/Badge";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCartOutlined";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import { Link, Routes, Route } from "react-router-dom";
import Cart from "../cart/Cart";
import Login from "../login/Login";
import Register from "../register/Register";

export default function Dashboard() {
  const CartBadge = styled(Badge)`
    & .${badgeClasses.badge} {
      top: -12px;
      right: -6px;
    }
  `;

  return (
    <div className="dashboard">
      <nav className="navbar">
        <div className="logo">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQt1WqAhsjbTEz_IxcDDdYmqQOeC1dd6sXd7nr52vBY0OmcAhavLE9olYW5SV8p2WDjVfU&usqp=CAU"
            alt="Logo"
            className="logoImg"
          />
          <span className="logoText">E-Cart</span>
        </div>
        <ul className="nav-links">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/products">Products</Link>
          </li>
          <li>
            <Link to="/categories">Categories</Link>
          </li>

          <Link to={'/cart'}>
            <IconButton>
              <ShoppingCartIcon fontSize="small" />
              <CartBadge badgeContent={5} color="primary" overlap="circular" />
            </IconButton>
          </Link>

          <li>
          <Link to="/login">Login</Link>
          </li>
        </ul>
      </nav>

      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </main>

      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} E-Cart. All rights reserved.</p>
      </footer>
    </div>
  );
}

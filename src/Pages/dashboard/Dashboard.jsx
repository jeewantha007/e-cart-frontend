import React, { useEffect, useState } from 'react';
import './dashboard.css';
import { Link, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Badge, { badgeClasses } from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCartOutlined';
import LogoutIcon from '@mui/icons-material/Logout';

import Home from '../home/Home';
import Products from '../products/Products';
import Categories from '../Categories/Categories';
import Cart from '../cart/Cart';
import OrderHistory from '../OrderHistory/OrderHistory';
import Footer from '../../components/Footer';
import Clothing from '../Categories/Clothing';
import Footwear from '../Categories/Footwear';
import HomeKitchen from '../Categories/HomeKitchen';
import Electronics from '../Categories/Electronics';
import Accessories from '../Categories/Accessories';

export default function Dashboard() {
  const [cartCount, setCartCount] = useState(0);
  const navigate = useNavigate();

  const CartBadge = styled(Badge)`
    & .${badgeClasses.badge} {
      top: -12px;
      right: -6px;
    }
  `;

  const handleLogout = () => {
    localStorage.clear();
    navigate('/', { replace: true });
    window.location.reload(); // Force re-evaluate App routing based on localStorage
  };

  // Function to update the cart count from localStorage
  const updateCartCount = () => {
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    const newCartCount = cartItems.reduce((total, item) => total + (item.quantity || 0), 0);
    setCartCount(newCartCount);
  };

  // This will be triggered each time localStorage is updated directly in this session
  useEffect(() => {
    // Initial load to get cart count
    updateCartCount();

    // Listen for changes in cart items stored in localStorage
    const interval = setInterval(() => {
      updateCartCount();  // Re-check cart count every 500ms
    }, 500);

    // Clean up the interval when component unmounts
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="dashboard">
      <nav className="navbar">
        <Link style={{ textDecoration: 'none', color: 'inherit' }} to="home">
          <div className="logo">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQt1WqAhsjbTEz_IxcDDdYmqQOeC1dd6sXd7nr52vBY0OmcAhavLE9olYW5SV8p2WDjVfU&usqp=CAU"
              alt="Logo"
              className="logoImg"
            />
            <span className="logoText">E-Cart</span>
          </div>
        </Link>

        <ul className="nav-links">
          <li><Link to="/dashboard">Home</Link></li>
          <li><Link to="/dashboard/products">Products</Link></li>
          <li><Link to="/dashboard/categories">Categories</Link></li>
          <li><Link to="/dashboard/orders">Order History</Link></li>
          <li>
            <Link to="/dashboard/cart">
              <IconButton size="large">
                <ShoppingCartIcon />
                <CartBadge badgeContent={cartCount} color="primary" overlap="circular" />
              </IconButton>
            </Link>
          </li>
          <li>
            <Button
              color="inherit"
              startIcon={<LogoutIcon />}
              onClick={handleLogout}
              sx={{ textTransform: 'none' }}
            >
              Logout
            </Button>
          </li>
        </ul>
      </nav>

      <main className="main-content">
        <Routes>
          <Route index element={<Home />} />
          <Route path="products" element={<Products />} />
          <Route path="categories" element={<Categories />} />
          <Route path="orders" element={<OrderHistory />} />
          <Route path="clothing" element={<Clothing />} />
          <Route path="footwear" element={<Footwear />} />
          <Route path="home-kitchen" element={<HomeKitchen />} />
          <Route path="electronics" element={<Electronics />} />
          <Route path="accessories" element={<Accessories />} />
          <Route path="cart" element={<Cart />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </main>
      {/* <Footer/> */}
    </div>
  );
}

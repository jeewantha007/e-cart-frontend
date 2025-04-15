import React from 'react';
import './dashboard.css';
import Home from '../home/Home';
import Products from '../products/Products';
import Badge, { badgeClasses } from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCartOutlined'
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
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
    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQt1WqAhsjbTEz_IxcDDdYmqQOeC1dd6sXd7nr52vBY0OmcAhavLE9olYW5SV8p2WDjVfU&usqp=CAU" alt="Logo" className="logoImg" />
    <span className="logoText">E-Cart</span>
  </div>
  <ul className="nav-links">
    <li><a href="#">Home</a></li>
    <li><a href="#">Products</a></li>
    <li><a href="#">Categories</a></li>

    <IconButton>
  <ShoppingCartIcon fontSize="small" />
  <CartBadge badgeContent={5} color="primary" overlap="circular" />
</IconButton>
    <li><a href="#">Logout</a></li>
  </ul>
</nav>


      <main className="main-content">

        {/* <Home/> */}
        <Products/>
     
      </main>

    
      

      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} E-Cart. All rights reserved.</p>
      </footer>
    </div>
  );
}

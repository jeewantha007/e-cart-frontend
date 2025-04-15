import React from 'react';
import './dashboard.css';
import Home from '../home/Home';

export default function Dashboard() {
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
    <li><a href="#">Logout</a></li>
  </ul>
</nav>


      <main className="main-content">

        <Home/>
     
      </main>

    
      

      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} E-Cart. All rights reserved.</p>
      </footer>
    </div>
  );
}

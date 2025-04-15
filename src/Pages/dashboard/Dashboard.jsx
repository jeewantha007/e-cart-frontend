import React from 'react';
import './dashboard.css';

export default function Dashboard() {
  return (
    <div className="dashboard">
      <nav className="navbar">
        <h1 className="logo">E-Cart</h1>
        <ul className="nav-links">
          <li><a href="#">Home</a></li>
          <li><a href="#">Products</a></li>
          <li><a href="#">Categories</a></li>
          <li><a href="#">Logout</a></li>
        </ul>
      </nav>

      <main className="main-content">
        <h2>Welcome to your dashboard!</h2>
        <p>This is a simple dashboard layout with a navbar.</p>
      </main>

      <main className="main-content">
        <h2>Welcome to your dashboard!</h2>
        <p>This is a simple dashboard layout with a navbar.</p>
      </main>

      <main className="main-content">
        <h2>Welcome to your dashboard!</h2>
        <p>This is a simple dashboard layout with a navbar.</p>
      </main>

      <main className="main-content">
        <h2>Welcome to your dashboard!</h2>
        <p>This is a simple dashboard layout with a navbar.</p>
      </main>
      

      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} E-Cart. All rights reserved.</p>
      </footer>
    </div>
  );
}

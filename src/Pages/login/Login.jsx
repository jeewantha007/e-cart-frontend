import React, { useState } from 'react';
import axios from 'axios';
import './loginCSS.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:3000/api/v1/user/login', {
        email,
        password,
      });

      console.log(res.data); // Handle success (e.g., save token or user info)
      alert('Login successful!');
    } catch (err) {
      console.error(err);
      alert('Login failed!');
    }
  };

  return (
    <div className="auth-wrapper">
    <div className="auth-container">
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQt1WqAhsjbTEz_IxcDDdYmqQOeC1dd6sXd7nr52vBY0OmcAhavLE9olYW5SV8p2WDjVfU&usqp=CAU" alt="" />
      <h2>Welcome Back</h2>
      <p>Log in to your account to continue shopping</p>
      <form className="auth-form" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
  
        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
  
        <button type="submit">Login</button>
        <p>Already have an account? <a href="/register">Create one now</a></p>
      </form>
    </div>
  </div>
  
  );
}

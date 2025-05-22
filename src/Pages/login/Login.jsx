import React, { useState } from 'react';
import axios from 'axios';
import './loginCSS.css';  // Correct path if CSS is in the same directory

import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:3000/api/v1/user/login', {
        email,
        password,
      });

      const { user, token } = res.data;

      localStorage.setItem('authToken', token);
      localStorage.setItem('role', user.role);
      localStorage.setItem('userId', user.id);

      // Redirect based on role
      setTimeout(() => {
        if (user.role === 'admin') {
          navigate('/admin-dashboard', { replace: true });
          window.location.reload();
        } else {
          navigate('/dashboard', { replace: true });
          window.location.reload();
        }
      }, 1000);

    } catch (err) {
      alert(`Login failed: ${err.response?.data?.error || err.message}`);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-container">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQt1WqAhsjbTEz_IxcDDdYmqQOeC1dd6sXd7nr52vBY0OmcAhavLE9olYW5SV8p2WDjVfU&usqp=CAU"
          alt="Welcome"
        />
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

          <p>
            Don't have an account? <a href="/register">Create one now</a>
          </p>
        </form>
      </div>
    </div>
  );
}

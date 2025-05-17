import React, { useState } from 'react';
import axios from 'axios';
import './loginCSS.css';  // Correct path if CSS is in the same directory

import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [debugInfo, setDebugInfo] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setDebugInfo('Processing login...');

    try {
      console.log('Sending login request with:', { email, password });

      const res = await axios.post('http://localhost:3000/api/v1/user/login', {
        email,
        password,
      });

      const { user, token } = res.data;

      console.log('Response data:', res.data);
      console.log('Role from response:', user.role); // ✅ Confirmed

      setDebugInfo(`Login successful! Role: ${user.role}`);

      localStorage.setItem('authToken', token);
      localStorage.setItem('role', user.role);
      localStorage.setItem('userId', user.id); 

      // Redirect based on role
   // In Login.jsx, after localStorage.setItem(...)
setTimeout(() => {
  if (user.role === 'admin') {
    console.log('Redirecting to admin dashboard...');
    navigate('/admin-dashboard', { replace: true });
    window.location.reload(); // 👈 Force re-evaluation
  } else {
    console.log('Redirecting to user dashboard...');
    navigate('/dashboard', { replace: true });
    window.location.reload(); // 👈 Force re-evaluation
  }
}, 1000);


    } catch (err) {
      console.error('Login error:', err);
      setDebugInfo(`Login failed: ${err.response?.data?.error || err.message}`);
      alert('Login failed. Check console for more info.');
    }
  };

  // Test buttons (simulate local login without backend)
  const testUserNavigation = () => {
    localStorage.setItem('role', 'user');
    localStorage.setItem('authToken', 'test-token');
    setDebugInfo('Test: Set role to user, redirecting...');
    window.location.replace('/dashboard');
  };

  const testAdminNavigation = () => {
    localStorage.setItem('role', 'admin');
    localStorage.setItem('authToken', 'test-token');
    setDebugInfo('Test: Set role to admin, redirecting...');
    window.location.replace('/admin-dashboard');
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

        {debugInfo && (
          <div style={{
            padding: '10px',
            margin: '10px 0',
            backgroundColor: '#f7f7f7',
            border: '1px solid #ddd',
            borderRadius: '4px'
          }}>
            <strong>Debug:</strong> {debugInfo}
          </div>
        )}

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

          <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
            <button type="button" onClick={testUserNavigation} style={{ flex: 1 }}>
              Test User Navigation
            </button>
            <button type="button" onClick={testAdminNavigation} style={{ flex: 1 }}>
              Test Admin Navigation
            </button>
          </div>

          <p>
            Don't have an account? <a href="/register">Create one now</a>
          </p>
        </form>
      </div>
    </div>
  );
}

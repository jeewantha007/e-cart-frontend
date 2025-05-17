import React, { useState } from 'react';
import '../login/loginCSS.css';
import axios from 'axios';


export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contactNo: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/api/v1/user/register', {
        name: formData.name,
        email: formData.email,
        contact_no: formData.contactNo,
        password: formData.password
      });

      console.log(response.data);
      alert("Registration successful!");
      // You can redirect to login page here if needed
    } catch (error) {
      console.error(error);
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <div className="auth-wrapper">
    <div className="auth-container">
      <img 
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQt1WqAhsjbTEz_IxcDDdYmqQOeC1dd6sXd7nr52vBY0OmcAhavLE9olYW5SV8p2WDjVfU&usqp=CAU" 
        alt="Shop Smart Logo" 
      />
      <h2>Create an Account</h2>
      <p>Join E-Cart to start shopping</p>
      <form className="auth-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          required
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          required
          onChange={handleChange}
        />
        <input
          type="tel"
          name="contactNo"
          placeholder="Contact No"
          value={formData.contactNo}
          required
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          required
          onChange={handleChange}
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          required
          onChange={handleChange}
        />
        <button type="submit">Register</button>
        <p>Already have an account? <a href="/">Login</a></p>
      </form>
    </div>
  </div>
  
  );
}

import React from "react";
import "./home.css";
import Button from "@mui/material/Button";
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import { Link } from "react-router-dom";
import ContactMailIcon from '@mui/icons-material/ContactMail';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';

export default function Home() {
  return (
    <div className="home-container">
      {/* Top Section */}
      <div className="home-top">
        <div className="home-topRight">
          <h1>E-Cart, Live Better</h1>
          <p>
            Discover the latest products at unbeatable prices. From electronics
            to fashion, find everything you need at Shop Smart Academy Store
          </p>

          <Link to="products" style={{ textDecoration: "none" }}>
            <Button variant="contained" sx={{ mr: 2 }}>
              Shop Now
            </Button>
          </Link>

          <Link to="categories" style={{ textDecoration: "none" }}>
            <Button className="btn" variant="outlined" size="medium">
              Browse categories
            </Button>
          </Link>
        </div>

        <div className="home-topleft">
          <img
            className="homeImage"
            src="https://d1hdtc0tbqeghx.cloudfront.net/wp-content/uploads/2021/11/24122148/Featured.jpg"
            alt="E-Cart Promo"
          />
        </div>
      </div>

      {/* Features Section */}
      <div className="home-bottom">
        <div className="feature-box">
          <CheckCircleOutlineOutlinedIcon className="feature-icon" />
          <h3>Quality Products</h3>
          <p>Carefully selected products that meet our high standards</p>
        </div>
        <div className="feature-box">
          <MonetizationOnOutlinedIcon className="feature-icon" />
          <h3>Competitive Prices</h3>
          <p>Best deals to ensure you get value for your money</p>
        </div>
        <div className="feature-box">
          <ElectricBoltIcon className="feature-icon" />
          <h3>Fast Shipping</h3>
          <p>Quick delivery to get your products to you faster</p>
        </div>
        <div className="feature-box">
          <SupportAgentIcon className="feature-icon" />
          <h3>24/7 Support</h3>
          <p>Our customer service team is always here to help</p>
        </div>
      </div>

      {/* Contact Us Section */}
      <div className="contact-us-section">
        <h2><ContactMailIcon sx={{ mr: 1, verticalAlign: 'middle' }} /> Contact Us</h2>
        <p>If you have any questions or need support, feel free to reach out!</p>
        <div className="contact-details">
          <p><PhoneIcon sx={{ mr: 1, verticalAlign: 'middle' }} /> +94 77 123 4567</p>
          <p><EmailIcon sx={{ mr: 1, verticalAlign: 'middle' }} /> support@ecart.com</p>
        </div>
        <Link to="/contact" style={{ textDecoration: "none" }}>
          <Button variant="contained" color="secondary">
            Get In Touch
          </Button>
        </Link>
      </div>
    </div>
  );
}

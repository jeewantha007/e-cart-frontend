import React, { useEffect } from "react";
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
// Import AOS
import AOS from 'aos';
import 'aos/dist/aos.css';
import Footer from "../../components/Footer";
import HomeImage from '../../assets/homeImage.jpeg';

export default function Home() {
  // Initialize AOS
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
      mirror: true,
      offset: 100,
      easing: 'ease-in-out'
    });
    
    // Update AOS on window resize
    window.addEventListener('resize', () => {
      AOS.refresh();
    });
    
    return () => {
      window.removeEventListener('resize', () => {
        AOS.refresh();
      });
    };
  }, []);

  return (
    <div className="home-container">
      {/* Hero Section */}
      <div className="home-top">
        <div className="home-topleft" data-aos="fade-right" data-aos-duration="1200">
          <img data-aos="fade-right"
            src={HomeImage}
            alt="E-Cart Shopping" 
            className="homeImage floating" 
          />
        </div>
        <div className="home-topRight" data-aos="fade-left" data-aos-duration="1200">
          <h1 className="hero-title">E-Cart, Live Better</h1>
          <p className="hero-description">
            Discover the latest products at unbeatable prices. From electronics
            to fashion, find everything you need at Shop E-Cart Store
          </p>
          <div className="hero-buttons">

            <Link to={'/dashboard/products'}>
            <Button 
              variant="contained" 
              className="primary-btn button-hover-effect"
              data-aos="zoom-in"
              data-aos-delay="300"
            >
              Shop Now
            </Button>
            </Link>

            <Link to={"/dashboard/categories"}>
             <Button 
              variant="outlined" 
              className="secondary-btn button-hover-effect"
              data-aos="zoom-in"
              data-aos-delay="500"
            >
              Browse categories
            </Button>
            </Link>
           
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="section-wrapper">
        <h2 className="section-title" data-aos="fade-up" data-aos-duration="800">Why Choose Us</h2>
        <div className="home-bottom">
          <div className="feature-box" data-aos="flip-left" data-aos-delay="100" data-aos-duration="800">
            <CheckCircleOutlineOutlinedIcon className="feature-icon" fontSize="large" />
            <h3>Quality Products</h3>
            <p>Carefully selected products that meet our high standards</p>
          </div>

          <div className="feature-box" data-aos="flip-left" data-aos-delay="300" data-aos-duration="800">
            <MonetizationOnOutlinedIcon className="feature-icon" fontSize="large" />
            <h3>Competitive Prices</h3>
            <p>Best deals to ensure you get value for your money</p>
          </div>

          <div className="feature-box" data-aos="flip-left" data-aos-delay="500" data-aos-duration="800">
            <ElectricBoltIcon className="feature-icon" fontSize="large" />
            <h3>Fast Shipping</h3>
            <p>Quick delivery to get your products to you faster</p>
          </div>

          <div className="feature-box" data-aos="flip-left" data-aos-delay="700" data-aos-duration="800">
            <SupportAgentIcon className="feature-icon" fontSize="large" />
            <h3>24/7 Support</h3>
            <p>Our customer service team is always here to help</p>
          </div>
        </div>
      </div>

      {/* Contact Us Section */}
      <div className="section-wrapper">
        <div className="contact-us-section" data-aos="fade-up" data-aos-duration="1000">
          <h2 className="contact-title">
            <ContactMailIcon className="contact-icon" /> Contact Us
          </h2>
          <p className="contact-subtitle">
            If you have any questions or need support, feel free to reach out!
          </p>
          <div className="contact-details">
            <p data-aos="fade-right" data-aos-delay="200">
              <PhoneIcon className="contact-detail-icon" /> +94 77 123 4567
            </p>
            <p data-aos="fade-right" data-aos-delay="400">
              <EmailIcon className="contact-detail-icon" /> support@ecart.com
            </p>
          </div>
          <Button 
            variant="contained" 
            color="primary" 
            className="contact-btn button-hover-effect"
            data-aos="zoom-in"
            data-aos-delay="600"
          >
            Get In Touch
          </Button>
        </div>
       
      </div>
       
    </div>
  );
}
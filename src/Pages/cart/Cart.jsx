import React from "react";
import "./cart.css";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { useCart } from "../../components/CartProvider";

export default function Cart() {
  const { cartItems } = useCart();
  const subtotal = cartItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="cart-wrapper">
      <div className="cart-left">
        <div className="cart-top">
          <h1>Your Cart</h1>
        </div>

        {cartItems.length === 0 ? (
          <div className="cart-content-empty">
            <img
              className="cartImage"
              src="https://cdn-icons-png.flaticon.com/512/11010/11010851.png"
              alt="Empty cart"
            />
            <h2>Your cart is empty</h2>
            <p>Looks like you haven't added any products to your cart yet.</p>
            <Button variant="contained" sx={{ mt: 2 }}>
              <Link to="/products" style={{ textDecoration: "none", color: "inherit" }}>Start Shopping</Link>
            </Button>
          </div>
        ) : (
          <div className="cart-content">
            {cartItems.map((item, idx) => (
              <div key={idx} className="cart-item">
                <img src={item.image} alt={item.title} className="cart-item-img" />
                <div className="cart-item-details">
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <p>Rs. {item.price}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="cart-right">
        <h2>Order Summary</h2>
        <div className="summary-row">
          <span>Subtotal ({cartItems.length} items)</span>
          <span>Rs. {subtotal}</span>
        </div>
        <div className="summary-row">
          <span>Shipping</span>
          <span>Free</span>
        </div>
        <div className="summary-row">
          <span>Tax</span>
          <span>Rs. 0.00</span>
        </div>
        <hr />
        <div className="summary-row total">
          <span>Total</span>
          <span>Rs. {subtotal}</span>
        </div>
        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
          disabled={cartItems.length === 0}
          fullWidth
        >
          Proceed to Checkout
        </Button>
      </div>
    </div>
  );
}

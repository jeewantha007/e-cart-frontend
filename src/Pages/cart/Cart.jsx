import React, { useState, useEffect } from "react";
import "./cart.css";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import CartItem from "../../components/CartItem";

export default function Cart() {
  // Load cart from localStorage
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cartItems");
    if (savedCart) {
      return JSON.parse(savedCart).map(item => ({
        ...item,
        price: parseFloat(item.price) // 👈 ensure price is a number
      }));
    }
    return [];
  });
  

  // Update localStorage whenever cart changes
  const updateLocalStorage = (updatedItems) => {
    localStorage.setItem("cartItems", JSON.stringify(updatedItems));
  };

  const handleIncrement = (id) => {
    const updatedItems = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCartItems(updatedItems);
    updateLocalStorage(updatedItems);
  };

  const handleDecrement = (id) => {
    const updatedItems = cartItems.map((item) =>
      item.id === id && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    setCartItems(updatedItems);
    updateLocalStorage(updatedItems);
  };

  const handleDelete = (id) => {
    const updatedItems = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedItems);
    updateLocalStorage(updatedItems);
  };

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    alert("Proceeding to checkout...");
    localStorage.removeItem("cartItems");
    setCartItems([]);
  };

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
              <Link
                to="/products"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                Start Shopping
              </Link>
            </Button>
          </div>
        ) : (
          <div className="cart-content">
            {cartItems.map((item) => (
              <CartItem
              image={item.image}
                key={item.id}
                item={item}
                onIncrement={handleIncrement}
                onDecrement={handleDecrement}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>

      <div className="cart-right">
        <h2>Order Summary</h2>
        <div className="summary-row">
          <span>Subtotal ({cartItems.length} items)</span>
          <span>Rs. {subtotal.toFixed(2)}</span>
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
          <span>Rs. {subtotal.toFixed(2)}</span>
        </div>
        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
          fullWidth
          onClick={handleCheckout}
        >
          Proceed to Checkout
        </Button>
      </div>
    </div>
  );
}

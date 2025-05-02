import React, { useState } from "react";
import "./cart.css";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import CartItem from "../../components/CartItem";
import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
} from "@mui/material";
import axios from "axios";

export default function Cart() {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cartItems");
    if (savedCart) {
      return JSON.parse(savedCart).map((item) => ({
        ...item,
        price: parseFloat(item.price),
      }));
    }
    return [];
  });

  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [cardDetails, setCardDetails] = useState({
    name: "",
    number: "",
    expiry: "",
    cvv: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [orderError, setOrderError] = useState("");

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

  const userId = localStorage.getItem('userId');
  console.log(userId);
  


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

  const validateCardForm = () => {
    const newErrors = {};
    if (!cardDetails.name.trim()) newErrors.name = "Cardholder name is required.";
    if (!/^\d{16}$/.test(cardDetails.number)) newErrors.number = "Card number must be 16 digits.";
    if (!/^\d{2}\/\d{2}$/.test(cardDetails.expiry)) newErrors.expiry = "Expiry must be in MM/YY format.";
    if (!/^\d{3,4}$/.test(cardDetails.cvv)) newErrors.cvv = "CVV must be 3 or 4 digits.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCheckout = async () => {
    // Get the user ID correctly - you have two different ways to access it in your code
    const userId = localStorage.getItem("userId") || localStorage.getItem("user_id");
  
    if (!userId) {
      setOrderError("User ID is required. Please log in.");
      return;
    }
  
    if (paymentMethod === "card" && !validateCardForm()) {
      return;
    }
  
    setLoading(true);
    setOrderError("");
  
    // Format card details to match backend expectations
    const formattedCardDetails = paymentMethod === "card" ? {
      holder: cardDetails.name,
      last4: cardDetails.number.slice(-4), // Only send last 4 digits as expected by backend
    } : null;
  
    // Map cart items to match the backend's expected format
    const formattedCartItems = cartItems.map(item => ({
      productId: item.id,
      productName: item.name || item.title,
      quantity: item.quantity,
      price: parseFloat(item.price)
    }));
  
    try {
      const response = await axios.post("http://localhost:3000/api/v1/transaction/placeOrder", {
        userId,
        cartItems: formattedCartItems,
        paymentMethod,
        cardDetails: formattedCardDetails
      });
  
      if (response.data.success) {
        alert("Order placed successfully!");
        localStorage.removeItem("cartItems");
        setCartItems([]);
        setCardDetails({ name: "", number: "", expiry: "", cvv: "" });
        setErrors({});
      } else {
        setOrderError(response.data.message || "Something went wrong with your order.");
      }
    } catch (error) {
      console.error("Order failed", error);
      setOrderError(error.response?.data?.message || "Failed to place order. Please try again.");
    } finally {
      setLoading(false);
    }
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
              <Link to="/products" style={{ textDecoration: "none", color: "inherit" }}>
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
          <span>Rs. 500.00</span>
        </div>
        <div className="summary-row">
          <span>Tax 12%</span>
          <span>Rs. {(subtotal * 0.12).toFixed(2)}</span>
        </div>
        <hr />
        <div className="summary-row total">
          <span>Total</span>
          <span>Rs. {(subtotal + subtotal * 0.12 + 500).toFixed(2)}</span>
        </div>

        <FormControl component="fieldset" sx={{ mt: 3 }}>
          <FormLabel component="legend">Select Payment Method</FormLabel>
          <RadioGroup
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            <FormControlLabel value="cod" control={<Radio />} label="Cash on Delivery" />
            <FormControlLabel value="card" control={<Radio />} label="Card Payment" />
          </RadioGroup>
        </FormControl>

        {paymentMethod === "card" && (
          <form
            className="card-form"
            onSubmit={(e) => {
              e.preventDefault();
              handleCheckout();
            }}
            style={{ marginTop: "16px", display: "flex", flexDirection: "column", gap: "10px" }}
          >
            <TextField
              label="Cardholder Name"
              variant="outlined"
              required
              value={cardDetails.name}
              onChange={(e) => setCardDetails({ ...cardDetails, name: e.target.value })}
              error={!!errors.name}
              helperText={errors.name}
            />
            <TextField
              label="Card Number"
              variant="outlined"
              required
              value={cardDetails.number}
              onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value })}
              inputProps={{ maxLength: 16 }}
              error={!!errors.number}
              helperText={errors.number}
            />
            <div style={{ display: "flex", gap: "10px" }}>
              <TextField
                label="MM/YY"
                variant="outlined"
                required
                value={cardDetails.expiry}
                onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
                inputProps={{ maxLength: 5 }}
                error={!!errors.expiry}
                helperText={errors.expiry}
              />
              <TextField
                label="CVV"
                variant="outlined"
                required
                value={cardDetails.cvv}
                onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
                inputProps={{ maxLength: 4 }}
                error={!!errors.cvv}
                helperText={errors.cvv}
              />
            </div>
          </form>
        )}

        {orderError && (
          <div style={{ color: "red", marginTop: "10px" }}>{orderError}</div>
        )}

        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 3 }}
          fullWidth
          onClick={handleCheckout}
          disabled={loading}
        >
          {loading ? "Processing..." : paymentMethod === "cod" ? "Place Order (COD)" : "Pay & Place Order"}
        </Button>
      </div>
    </div>
  );
}

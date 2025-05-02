import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import "./components.css";

const CartItem = ({ item, onIncrement, onDecrement, onDelete, image }) => {
  const totalPrice = (item.price * item.quantity).toFixed(2);

  return (
    <div className="cart-item">
      <div className="product-image">
        <img src={image} alt={item.name} className="product-img" />
      </div>

      <div className="product-details">
        <h3>{item.name}</h3>
        <p className="product-description">{item.description}</p>
        <p>
          Price: LKR {item.price.toFixed(2)} &nbsp;&nbsp; Total: LKR {totalPrice}
        </p>
      </div>

      <div className="quantity-actions">
        <div className="quantity-box">
          <button onClick={() => onDecrement(item.id)}>-</button>
          <span>{item.quantity}</span>
          <button onClick={() => onIncrement(item.id)}>+</button>
        </div>
        <DeleteIcon
          className="delete-icon"
          onClick={() => onDelete(item.id)}
        />
      </div>
    </div>
  );
};

export default CartItem;

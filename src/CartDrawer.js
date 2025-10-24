import React, { useContext } from 'react';
import './CartDrawer.css';
import { CartContext } from './CartContext';
import { useNavigate } from 'react-router-dom';

const CartDrawer = () => {
  const { cart, setCart, isOpen, closeCart } = useContext(CartContext);
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleUpdateQuantity = (index, delta) => {
    const item = cart[index];
    if (!item) return;
    const newQty = Math.max(1, (item.quantity || 1) + delta);
    // rely on setCart for persistence
    const updated = cart.map((it, i) => i === index ? { ...it, quantity: newQty } : it);
    setCart(updated);
  };

  const handleRemove = (index) => {
    const updated = cart.filter((_, i) => i !== index);
    setCart(updated);
  };

  const subtotal = cart.reduce((acc, item) => acc + Number(item.price || 0) * (item.quantity || 1), 0);
  const shipping = 250;
  const total = subtotal + shipping;

  return (
    <div className="cart-overlay">
      <div className="cart-drawer">
        <button className="close-btn" onClick={closeCart}>✕</button>
        <h2>Your Cart</h2>

        {(!cart || cart.length === 0) ? (
          <p>No items in cart</p>
        ) : (
          <div>
            {cart.map((item, index) => (
              <div key={index} className="cart-item">
                <img src={(item.image && item.image.startsWith('http')) ? item.image : ("http://localhost:5000/" + item.image)} alt={item.name} />
                <div style={{ flex: 1 }}>
                  <p>{item.name}</p>
                  <p>Rs. {item.price}</p>
                  <div className="quantity-control">
                    <button onClick={() => handleUpdateQuantity(index, -1)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => handleUpdateQuantity(index, 1)}>+</button>
                  </div>
                </div>
                <button className="remove-btn" onClick={() => handleRemove(index)}>🗑</button>
              </div>
            ))}

            <hr />
            <p>Subtotal: Rs. {subtotal}</p>
            <p>Shipping: Rs. {shipping}</p>
            <h3>Total: Rs. {total}</h3>
            <button className="checkout-btn" onClick={() => { closeCart(); navigate('/payment') }}>BUY NOW</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;

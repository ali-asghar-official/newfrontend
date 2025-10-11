import React from 'react'
import './CartDrawer.css'



const CartDrawer = ({ isOpen, onClose, cart, setCart }) => {
  if (!isOpen) return null;

  const updateQuantity = (index, delta) => {
    const updatedCart = [...cart];
    updatedCart[index].quantity = Math.max(1, updatedCart[index].quantity + delta);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCart(updatedCart);
  };

  const removeItem = (index) => {
    const updatedCart = cart.filter((_, i) => i !== index);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCart(updatedCart);
  };

  const subtotal = cart.reduce(
    (acc, item) => acc + Number(item.price) * item.quantity,
    0
  );
  const shipping = 250;
  const total = subtotal + shipping;

  return (
    <div className="cart-overlay">
      <div className="cart-drawer">
        <button className="close-btn" onClick={onClose}>✕</button>
        <h2>Your Cart</h2>

        {cart.length === 0 ? (
          <p>No items in cart</p>
        ) : (
          <div>
            {cart.map((item, index) => (
              <div key={index} className="cart-item">
                <img src={"http://localhost:5000/" + item.image} alt={item.name} />
                <div style={{ flex: 1 }}>
                  <p>{item.name}</p>
                  <p>Rs. {item.price}</p>
                  <div className="quantity-control">
                    <button onClick={() => updateQuantity(index, -1)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(index, 1)}>+</button>
                  </div>
                </div>
                <button className="remove-btn" onClick={() => removeItem(index)}>🗑</button>
              </div>
            ))}

            <hr />
            <p>Subtotal: Rs. {subtotal}</p>
            <p>Shipping: Rs. {shipping}</p>
            <h3>Total: Rs. {total}</h3>
            <button className="checkout-btn">BUY NOW</button>
          </div>
        )}
      </div>
    </div>

  );
};

export default CartDrawer

import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import logo from './Asset/logo.png';
import { CiSearch, CiShoppingCart } from "react-icons/ci";
import { FaBars, FaTimes } from "react-icons/fa";
import { AuthContext } from './AuthContext';
import CartDrawer from './CartDrawer';
import { CartContext } from './CartContext';

const Navbar = () => {
 
   const { user, logout } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const { cart, openCart } = useContext(CartContext);

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
  };

  const isLoggedIn = Boolean(user);

  const cartCount = (cart || []).reduce((acc, item) => acc + (Number(item.quantity) || 1), 0);

  return (
    <>
      <div className='nav-container'>
      <div className='nav-logo'>
        <Link to="/"><img src={logo} alt="Logo" /></Link>
      </div>

      <div className="nav-center">
        <input className='Search_input' placeholder="Search..." />
        <CiSearch className='search-btn' />
      </div>

      <div className="nav-right">
        {isLoggedIn && <span className='user-name'>Hello, {user?.username || user?.name}</span>}

        <div className='cart-wrapper'>
          <button
            aria-label='Open cart'
            className='cart-button'
            onClick={() => openCart()}
            type='button'
          >
            <CiShoppingCart className='cart-btn' />
          </button>
          {cartCount > 0 && <span className='cart-badge'>{cartCount}</span>}
        </div>
        <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FaTimes /> : <FaBars />}
        </div>
      </div>

      <div className={`nav-items ${menuOpen ? 'open' : ''}`}>
        <Link className='nav-item' to="/" onClick={() => setMenuOpen(false)}>Home</Link>
        <Link className='nav-item' to="/Product" onClick={() => setMenuOpen(false)}>Products</Link>

        {isLoggedIn ? (
          <button className='logout-button' onClick={handleLogout}>Logout</button>
        ) : (
          <>
            <Link className='nav-item' to="/signup" onClick={() => setMenuOpen(false)}>Login</Link>
            <Link className='nav-item' to="/Register" onClick={() => setMenuOpen(false)}>Register</Link>
          </>
        )}
      </div>
      </div>
  {/* Cart Drawer rendered at Navbar level */}
  <CartDrawer />
    </>
  );
};

export default Navbar;
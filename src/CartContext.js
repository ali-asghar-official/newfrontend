import React, { createContext, useState, useEffect, useContext, useRef } from 'react';
import { AuthContext } from './AuthContext';

export const CartContext = createContext();

const guestKey = 'cart:guest'

const getUserKey = (user) => {
  if (!user) return guestKey
  const id = user.id || user._id || user.email || JSON.stringify(user)
  return `cart:user:${encodeURIComponent(id)}`
}

export const CartProvider = ({ children }) => {
  const { user } = useContext(AuthContext)
  const prevUser = useRef(user)

  const [cart, setCart] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  // initialize: load guest cart by default
  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem(guestKey) || '[]')
      setCart(Array.isArray(stored) ? stored : [])
    } catch (e) {
      setCart([])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // when user changes, load/merge appropriate cart
  useEffect(() => {
    const doOnUserChange = () => {
      const key = getUserKey(user)
      // if user logged in
      if (user) {
        // load user's saved cart
        let userCart = []
        try { userCart = JSON.parse(localStorage.getItem(key) || '[]') } catch(e){ userCart = [] }

        // merge guest cart if any
        let guestCart = []
        try { guestCart = JSON.parse(localStorage.getItem(guestKey) || '[]') } catch(e){ guestCart = [] }

        const merged = [...(userCart || [])]
        for (const g of (guestCart || [])) {
          const gid = g.id || g._id
          const idx = merged.findIndex(u => (u.id === gid) || (u._id && u._id === gid))
          if (idx >= 0) {
            merged[idx] = { ...merged[idx], quantity: (merged[idx].quantity || 1) + (g.quantity || 1) }
          } else {
            merged.push({ ...g })
          }
        }

        setCart(merged)
        // persist merged under user key
        try { localStorage.setItem(key, JSON.stringify(merged || [])) } catch(e){}
        // clear guest cart after merging
        try { localStorage.removeItem(guestKey) } catch(e){}
      } else {
        // user logged out or not logged in -> clear UI cart per requirement
        setCart([])
      }
    }

    // detect login/logout transitions
    const wasUser = prevUser.current
    if (!wasUser && user) {
      // login
      doOnUserChange()
    } else if (wasUser && !user) {
      // logout: ensure user's cart was already saved by cart effect; clear UI
      // do not delete user's saved cart
      setCart([])
    } else if (!wasUser && !user) {
      // still guest - keep guest cart (already loaded at init)
    } else if (wasUser && user && (wasUser.id !== user.id)) {
      // switched user account - load that user's cart
      doOnUserChange()
    }

    prevUser.current = user
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  // persist cart to localStorage under appropriate key whenever cart changes
  useEffect(() => {
    const key = getUserKey(user)
    try { localStorage.setItem(key, JSON.stringify(cart || [])) } catch(e){}
  }, [cart, user])

  const addToCart = (product, options = { open: true }) => {
    // normalize id (support _id from backend)
    const prod = { ...product, id: product.id || product._id }
    setCart((prev) => {
      const existing = prev.find((p) => (p.id === prod.id) || (p._id && p._id === prod.id))
      if (existing) {
        return prev.map((p) => (p.id === prod.id || p._id === prod.id) ? { ...p, quantity: (p.quantity || 1) + (prod.quantity || 1) } : p)
      }
      return [...prev, { ...prod, quantity: prod.quantity || 1 }]
    })
    if (options.open) setIsOpen(true)
  }

  const updateQuantity = (id, quantity) => {
    setCart((prev) => prev.map((p) => p.id === id ? { ...p, quantity: Math.max(1, quantity) } : p))
  }

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((p) => p.id !== id))
  }

  const clearCart = () => setCart([])

  const openCart = () => setIsOpen(true)
  const closeCart = () => setIsOpen(false)
  const toggleCart = () => setIsOpen((s) => !s)

  return (
    <CartContext.Provider value={{ cart, setCart, addToCart, updateQuantity, removeFromCart, clearCart, isOpen, openCart, closeCart, toggleCart }}>
      {children}
    </CartContext.Provider>
  )
}

export default CartProvider

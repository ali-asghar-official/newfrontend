import React, { useContext, useState } from 'react'
import './Payment.css'
import { CartContext } from './CartContext'
import { AuthContext } from './AuthContext'
import { API_URL } from './config'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const Payment = () => {
  const { cart, clearCart } = useContext(CartContext)
  const { user } = useContext(AuthContext)
  const navigate = useNavigate()
  const [processing, setProcessing] = useState(false)
  const [card, setCard] = useState({ number: '', name: '', expiry: '', cvv: '' })

  const subtotal = cart.reduce((acc, it) => acc + Number(it.price || 0) * (it.quantity || 1), 0)
  const shipping = 250
  const total = subtotal + shipping

  const handleChange = (e) => setCard({ ...card, [e.target.name]: e.target.value })

  const handlePay = async (e) => {
    e.preventDefault()
    if (cart.length === 0) {
      toast.error('Your cart is empty')
      return
    }
    // minimal validation
    if (!card.number || !card.name || !card.expiry || !card.cvv) {
      toast.error('Please fill payment details')
      return
    }

    setProcessing(true)

    // simulate payment processing delay
    setTimeout(async () => {
      const orderId = 'ORD' + Date.now()
      const order = {
        id: orderId,
        user: user?.id || user?._id || user?.email || null,
        items: cart,
        subtotal,
        shipping,
        total,
        createdAt: new Date().toISOString()
      }

      // try to send to backend order endpoint, if available
      const tryPost = async (urls) => {
        for (const url of urls) {
          try {
            const res = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(order) })
            if (res.ok) return true
          } catch (e) {
            // ignore and try next
          }
        }
        return false
      }

      const posted = await tryPost([
        `${API_URL}/api/orders/add`,
        `${API_URL}/orders/add`,
        `${API_URL}/order/add`
      ])

      if (!posted) {
        // fallback: persist locally so admin dashboard can pick it up
        try {
          const existing = JSON.parse(localStorage.getItem('orders') || '[]')
          existing.push(order)
          localStorage.setItem('orders', JSON.stringify(existing))
        } catch (e) {
          // ignore
        }
      }

      clearCart()
      toast.success('Payment successful')
      navigate('/payment/success', { state: { orderId } })
    }, 1200)
  }

  return (
    <div className="payment-page">
      <div className="payment-container">
        <h2>Checkout</h2>
        <div className="payment-grid">
          <form className="payment-form" onSubmit={handlePay}>
            <label>Cardholder Name</label>
            <input name="name" value={card.name} onChange={handleChange} placeholder="Full name" />

            <label>Card Number</label>
            <input name="number" value={card.number} onChange={handleChange} placeholder="1234 1234 1234 1234" />

            <div className="row">
              <div>
                <label>Expiry</label>
                <input name="expiry" value={card.expiry} onChange={handleChange} placeholder="MM/YY" />
              </div>
              <div>
                <label>CVV</label>
                <input name="cvv" value={card.cvv} onChange={handleChange} placeholder="123" />
              </div>
            </div>

            <button className="pay-btn" type="submit" disabled={processing}>{processing ? 'Processing...' : `Pay Rs. ${total}`}</button>
          </form>

          <aside className="payment-summary">
            <h3>Order Summary</h3>
            <div className="summary-items">
              {cart.map((it, i) => (
                <div key={i} className="summary-item">
                  <span>{it.name} x {it.quantity}</span>
                  <span>Rs. {Number(it.price || 0) * (it.quantity || 1)}</span>
                </div>
              ))}
            </div>
            <hr />
            <p>Subtotal: Rs. {subtotal}</p>
            <p>Shipping: Rs. {shipping}</p>
            <h3>Total: Rs. {total}</h3>
          </aside>
        </div>
      </div>
    </div>
  )
}

export default Payment

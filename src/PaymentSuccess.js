import React from 'react'
import './Payment.css'
import { useLocation, Link } from 'react-router-dom'

const PaymentSuccess = ()=>{
  const { state } = useLocation()
  const orderId = state?.orderId || ('ORD' + Date.now())

  return (
    <div style={{padding:30}}>
      <div style={{maxWidth:700,margin:'0 auto',background:'#fff',padding:20,borderRadius:6}}>
        <h2>Payment Successful</h2>
        <p>Your order id: <strong>{orderId}</strong></p>
        <p>Thank you for your purchase!</p>
        <Link to='/' style={{color:'#2e8b57'}}>Return to Home</Link>
      </div>
    </div>
  )
}

export default PaymentSuccess

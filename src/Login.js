import React, { useState, useContext } from 'react'
import './Login.css'
import toast from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from './AuthContext'

const Login = () => {
  const { login } = useContext(AuthContext)
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const emailChange = (event) => setEmail(event.target.value)
  const passwordChange = (event) => setPassword(event.target.value)

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!email || !password) {
      toast.error('Please provide email and password.')
      return
    }

    try {
      const response = await fetch('http://localhost:5000/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })

      const result = await response.json()

      if (response.ok) {
        toast.success('Login Successful!')

        // Save token and user info in localStorage
        localStorage.setItem('token', result.token)
        localStorage.setItem('user', JSON.stringify(result.user))

        // update auth context so navbar updates immediately
        if (typeof login === 'function') login(result.user)

        // Redirect based on role
        if (result.user && result.user.role === 'admin') {
          navigate('/AdminHome')
        } else {
          navigate('/') // customer homepage
        }
      } else {
        toast.error(result.message || 'Login failed.')
      }
    } catch (error) {
      toast.error('Login failed. Server not responding.')
      console.error('Login error:', error)
    }
  }

  return (
    <div className='login_page'>
      <div className='login_box'>
        <p className='login_header'>LOGIN</p>

        <form onSubmit={handleSubmit} aria-label='login form'>
          <div className='login_item'>
            <label htmlFor='email'>Email</label>
            <input
              id='email'
              name='email'
              value={email}
              onChange={emailChange}
              className='login_input'
              type='email'
              required
            />
          </div>

          <div className='login_item'>
            <label htmlFor='password'>Password</label>
            <input
              id='password'
              name='password'
              value={password}
              onChange={passwordChange}
              className='login_input'
              type='password'
              required
            />
          </div>

          <button type='submit' className='login_btn'>LOGIN</button>
        </form>

        <div className='login_option'>
          <span className='bar'></span>
          <span className='login_or'>OR</span>
          <span className='bar'></span>
        </div>

        <div className='login_option'>
          <Link to='/Register'>Create New Account</Link>
        </div>

        <div className='login_navigate'></div>
      </div>
    </div>
  )
}

export default Login

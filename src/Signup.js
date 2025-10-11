import React from 'react'
import './Signup.css'
import {useState} from 'react'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'


const Signup = () => {

const [email,setEmail] = useState()
const [password,setPassword] = useState()


const emailChange =(event)=>{
  setEmail(event.target.value)
}
const passwordChange =(event)=>{
  setPassword(event.target.value)
}

const showNum = async(event)=>{
  console.log(email,password);
  const response = await fetch('http://localhost:5000/user/data',{
    method:'POST',
    body:JSON.stringify({email,password}),
    headers:{'Content-Type':'application/json'}
    

  })
const result = await response.json()
toast.success(result.message)
};



  return (
    <div className='signup_page'>
    <div className='signup_box'>
        <p className='signup_header'>LOGIN</p>
  
           <div className='signup_item'>
          <label>Email</label>
          <input onChange={emailChange} className='signup_input' type='email'/>
          </div>
          <div className='signup_item'>
          <label>Password</label>
          <input onChange={passwordChange} className='signup_input' type='password' />
          </div>
        
          <button onClick={showNum} className='signup_btn'>LOGIN</button>
          
    
          <div className='login_option'>
          <span className='bar'></span>
          <span className='login_or'>OR</span>
          <span className='bar'></span>
          </div>
          {/* <div className='login_icons'>
        <span className='login_icon'>G</span>
        <span className='login_icon'>F</span>
        <span className='login_icon'>in</span>
          </div> */}
          <div className='login_option'>
          <Link to='/Register'>Create New Account</Link>
          </div>

          <div className='login_navigate'>
         
         
          </div>

          
        </div>
      </div>
    
  )
}

export default Signup
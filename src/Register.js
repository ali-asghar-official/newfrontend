import React from 'react'
import {useState} from 'react'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'


const Register = () => {


const [name,setName] = useState()
const [email,setEmail] = useState()
const [password,setPassword] = useState()

const nameChange = (event)=>{
   setName(event.target.value)
}
const emailChange = (event)=>{
   setEmail(event.target.value)
}
const passwordChange = (event)=>{
   setPassword(event.target.value)
}



const saveHandler = async(event)=>{
    event.preventDefault()

try {

const response = await fetch('http://localhost:5000/user/register',{
   method:'POST',
   body:JSON.stringify({name,email,password}),
   headers:{'Content-Type':'application/json'}
})

const result = await response.json()
toast.success(result.message)

   
} catch (error) {
   console.log(error)
   
}




}


  return (
    <div className='signup_page'>
        <form onSubmit={saveHandler}>
    <div className='signup_box'>
        <p className='signup_header'>CREATE NEW ACCOUNT</p>
  
           <div className='signup_item'>
          <label>NAME</label>
          <input onChange={nameChange} required className='signup_input' type='text'/>
          </div>
           <div className='signup_item'>
          <label>Email</label>
          <input onChange={emailChange} required className='signup_input' type='email'/>
          </div>
          <div className='signup_item'>
          <label>Password</label>
          <input onChange={passwordChange} required className='signup_input' type='password' />
          </div>
        
          <button type='submit' className='signup_btn'>SIGN UP</button>
          
    
          <div className='login_option'>
          <Link to='/Signup'>Already have an Account ?</Link>
          </div>
          <div className='login_navigate'>
         
         
          </div>

          
        </div>
        </form>
      </div>
  )
}

export default Register

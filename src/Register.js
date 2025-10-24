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
console.log("Name:",name)
console.log("Email:",email)
console.log("Password:",password)


   
} catch (error) {
   console.log(error)
   
}




}


  return (
      <div className='login_page'>
            <form onSubmit={saveHandler}>
      <div className='login_box'>
            <p className='login_header'>CREATE NEW ACCOUNT</p>
  
                <div className='login_item'>
               <label>NAME</label>
               <input onChange={nameChange} required className='login_input' type='text'/>
               </div>
                <div className='login_item'>
               <label>Email</label>
               <input onChange={emailChange} required className='login_input' type='email'/>
               </div>
               <div className='login_item'>
               <label>Password</label>
               <input onChange={passwordChange} required className='login_input' type='password' />
               </div>
        
               <button type='submit' className='login_btn'>SIGN UP</button>
          
    
               <div className='login_option'>
               <Link to='/signup'>Already have an Account ?</Link>
               </div>
               <div className='login_navigate'>
         
         
               </div>

          
            </div>
            </form>
         </div>
  )
}

export default Register

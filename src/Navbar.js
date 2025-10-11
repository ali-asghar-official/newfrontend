import React from 'react'
import {Link } from 'react-router-dom'
import './Navbar.css'
import logo from './Asset/logo.png'
import { CiSearch } from "react-icons/ci";
import { CiShoppingCart } from "react-icons/ci";
import { IoIosCall } from "react-icons/io";
import { MdEmail } from "react-icons/md";
import { FaWhatsapp } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { CiTwitter } from "react-icons/ci";
import Dropdown from 'react-bootstrap/Dropdown';


const Navbar = () => {

const searchHandler = async(event)=>{

const value = event.target.value

try {


  const response = await fetch('http://localhost:5000/product/search?name='+value,{
    method:'GET',
    headers: {'Content-Type':'application/json'}
  })

const result = await response.json()
console.log(result)

  
} catch (error) {
  console.log(error)
  
}




}


  return (
<>
 <div className='up-nav'>
  <div className='up-nav-item-1'>
<IoIosCall />  <p>+09123456789</p> <MdEmail /> <p>test@gmail.com</p>
  </div>

  <div className='up-nav-item-2'>
<p>Free Delivery on orders over $260</p>
  </div>

  <div className='up-nav-item-3'>
    <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        Languages
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href="#/action-1">English</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Urdu</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Arabic</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
<FaWhatsapp className='icon'/>
<FaFacebook className='icon' />
<CiTwitter className='icon' />
  </div>

  </div>
    
<div className='nav-container'>
 

<div className='nav-logo'>
<Link to="/"> <img src={logo} alt="Logo" /></Link>
</div>


   
       
             
        <input onChange={searchHandler} className='Search_input' placeholder="Search in Daraz" ></input>
        <CiSearch className='search-btn'/>
        <CiShoppingCart className='cart-btn'/>
        <div className='nav-items'>
         <Link className='nav-item' to="/">Home</Link> 
         <Link className='nav-item' to="/Product">Products</Link> 
         <Link className='nav-item' to="/Signup">Pages</Link> 
         <Link className='nav-item' to="/Signup">Register</Link> 
         
         </div>
        </div>
     </> 
  )
}

export default Navbar
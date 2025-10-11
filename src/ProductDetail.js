import React from 'react'
import {useEffect, useState} from 'react';
import './ProductDetail.css'
import { FaStar } from "react-icons/fa";
import CartDrawer from "./CartDrawer";

const ProductDetail = () => {

const [cart, setCart] = useState([]);
const [isCartOpen, setIsCartOpen] = useState(false);

const addToCart = () => {
  let newCart = JSON.parse(localStorage.getItem("cart")) || [];

  // check if product already in cart
  const existingIndex = newCart.findIndex((item) => item._id === product._id);

  if (existingIndex >= 0) {
    newCart[existingIndex].quantity += 1; // increase qty
  } else {
    newCart.push({ ...product, quantity: 1 }); // add with qty = 1
  }

  localStorage.setItem("cart", JSON.stringify(newCart));
  setCart(newCart);
  setIsCartOpen(true);
};


const params = new URLSearchParams(window.location.search)
const id = params.get('id')
const [product,setProduct] = useState()

const getProduct = async()=>{

try {

const response = await fetch('http://localhost:5000/single/product?id='+id,{
    method:'GET',
    headers:{'Content-Type':'application/json'}
})

const result = await response.json()
console.log(result)
setProduct(result.item)
    
} catch (error) {
    console.log(error)
}

}

useEffect(()=>{
    getProduct()
},[])

if (!product) {
    return <div>Loading...</div>;
  }



  return (
    <div>
    <div className='productdisplay'>
<div className='productdisplay-left'>
<div className='productdisplay-img-list'>
<img src={'http://localhost:5000/'+product.image} alt='Here is an image1'/>
<img src={'http://localhost:5000/'+product.image} alt='Here is an image2'/>
<img src={'http://localhost:5000/'+product.image} alt='Here is an image3'/>
<img src={'http://localhost:5000/'+product.image} alt='Here is an image4'/>
</div>

<div className='productdisplay-img'>

    <img className='productdisplay-main-img' src={'http://localhost:5000/'+product.image} alt='Here is an image4'/>

</div>





<div className='productdisplay-right'>
<h1>{product.name}</h1>
<div className='productdisplay-right-star'>

   <FaStar />
   <FaStar />
   <FaStar />
   <FaStar />
   <FaStar />
    
    <p>(122)</p>
</div>

<div className='productdisplay-right-prices'>
    <div className='productdisplay-right-price-new'>Rs.{product.price}
    </div>

</div>

<div className='productdisplay-right-description'>
A short product description is a concise marketing copy highlighting a product's unique benefits, features, and value proposition to persuade a customer to purchase.
</div>
<div className='productdisplay-right-size'>

    <h1>Select Size</h1>
    <div className='productdisplay-right-sizes'>
    <div>S</div>
    <div>M</div>
    <div>L</div>
    <div>XL</div>
    <div>XXL</div>
    </div>

</div>



<button onClick={addToCart}>ADD TO CART</button>
<p className='productdisplay-right-category'><span>Category:</span>Women, T-Shirt</p>
   
    </div>
    </div>
    </div>
    <CartDrawer
  isOpen={isCartOpen}
  onClose={() => setIsCartOpen(false)}
  cart={cart}
  setCart={setCart}
/>
   </div>



    
  )
}

export default ProductDetail


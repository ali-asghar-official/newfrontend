import React, { useEffect, useState, useContext } from 'react'
import './ProductDetail.css'
import { FaStar } from "react-icons/fa";
import toast from 'react-hot-toast'
import { CartContext } from './CartContext'
import { useLocation } from 'react-router-dom'

const ProductDetail = () => {

const { addToCart } = useContext(CartContext);

const addToCartHandler = () => {
  if (!product) return;
  addToCart(product);
  toast.success('Added to cart');
};


const { search } = useLocation()
const params = new URLSearchParams(search)
const id = params.get('id')

const [product, setProduct] = useState(null)
const [loading, setLoading] = useState(false)
const [error, setError] = useState(null)

const getProduct = async () => {
    if (!id) {
        setError('No product id provided')
        setProduct(null)
        setLoading(false)
        return
    }

    setLoading(true)
    setError(null)
    try {
            const response = await fetch('http://localhost:5000/product/single?id=' + id, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        })

        if (!response.ok) {
            const text = await response.text()
            throw new Error(`Server responded ${response.status}: ${text}`)
        }

        const result = await response.json()
        console.log('Product detail result:', result)
        setProduct(result.item || null)
    } catch (err) {
        console.error('Failed to load product:', err)
        setError(err.message || 'Failed to load product')
        setProduct(null)
    } finally {
        setLoading(false)
    }
}

useEffect(() => {
    // re-run when the search (id) changes
    getProduct()
    // eslint-disable-next-line react-hooks/exhaustive-deps
}, [search])

if (loading) return <div>Loading...</div>
if (error) return <div style={{ color: 'red' }}>{error}</div>
if (!product) return <div>Product not found.</div>



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



<button onClick={addToCartHandler}>ADD TO CART</button>
<p className='productdisplay-right-category'><span>Category:</span>Women, T-Shirt</p>
   
    </div>
    </div>
    </div>
   
   </div>



    
  )
}

export default ProductDetail


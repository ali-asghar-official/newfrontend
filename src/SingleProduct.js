import './Product.css'
import { useNavigate } from 'react-router-dom'
import React, { useContext } from 'react'
import { CartContext } from './CartContext'
import toast from 'react-hot-toast'




const SingleProduct = ({name,price,brand,category,file,rating,id})=> {

const navigate = useNavigate()
const navigateHandler = ()=>{
  navigate('/ProductDetail?id='+id)
}

  const { addToCart } = useContext(CartContext);

  const handleAddToCart = (e) => {
    // prevent the outer click that navigates to detail
    e.stopPropagation();
    addToCart({ _id: id, name, price, image: file, quantity: 1 });
    toast.success('Added to cart');
  }
return  (

 <div onClick={navigateHandler}className='products'>
    <div className='product'>

  <div className='product_img'>
<img src={'http://localhost:5000/'+file} alt='product_1'/>
  </div>
    <div className='product_content'>
    <p className='title'>{name}</p>
    <span className='price'>Rs. {price}</span>
    <div className='product_price_section'>
    {/* <p className='category'>{category?.title || category}</p> */}
    {/* <span className='brand'>Brand:{brand}</span> */}
    </div>
    
    </div>

<button className='add-to-cart' onClick={handleAddToCart}>Add to Cart</button>
    </div>
    
    </div>

)

}

export default SingleProduct
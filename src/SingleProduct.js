import './Product.css'
import { useNavigate } from 'react-router-dom'



const SingleProduct = ({name,price,brand,category,file,rating,id})=> {

const navigate = useNavigate()
const navigateHandler = ()=>{
  navigate('/ProductDetail?id='+id)
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
    <p className='category'>{category?.title || category}</p>
    <span className='brand'>Brand:{brand}</span>
    </div>
    
    </div>
<span className='rating'>{rating}</span>
{/* <button className='add-to-cart'>Add to Cart</button> */}
    </div>
    
    </div>

)

}

export default SingleProduct
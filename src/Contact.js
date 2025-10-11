import React, { useState, useEffect } from 'react'
import './Contact.css'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const Contact = () => {

const [name,setName] = useState()
const [price,setPrice] = useState()
const [category,setCategory] = useState()
const [brand,setBrand] = useState()
const [detail,setDetail] = useState()
const [preview,setPreview] = useState()
const navigate = useNavigate()
const [product,setProduct] = useState({})
const [cat,setCat] = useState([])
const [brnd,setBrnd] = useState([])

const nameChange = (event)=>{
    setName(event.target.value)
}
const priceChange = (event)=>{
    setPrice(event.target.value)
}
const categoryChange = (event)=>{
  console.log(event.target.value)
    setCategory(event.target.value)
}
const brandChange = (event)=>{
    setBrand(event.target.value)
}
// const detailChange = (event)=>{
//     setDetail(event.target.value)
// }


const fileChange = async (event)=>{
 const file =event.target.files[0]

 const formData = new FormData()
 formData.append('image',file)

 const response = await fetch('http://localhost:5000/image/upload',{
    method:"POST",
    body: formData,
 });
 const result = await response.json()
 console.log(result.file)
 setPreview(result.file)

}



const saveHandler = async(event)=>{
    event.preventDefault()
    console.log(name,brand)
  


if(product.name){
 
try {
  const response = await fetch('http://localhost:5000/product/update?id='+product._id,{
    method: 'PUT',
    body:JSON.stringify({name,price,category,brand,detail,preview}),
    headers:{'Content-Type':'application/json'}
  });

  const result = await response.json()
  toast.success(result.message)
  navigate('/Productlist')
} catch (error) {
  console.log(error);
}
}else{
    try {
    const response = await fetch('http://localhost:5000/product/add',{
    method:'POST',
    body:JSON.stringify({name,price,category,brand,detail,preview}),
    headers:{'Content-Type':'application/json'}
    

  })

const result = await response.json()
toast.success(result.message)
setName('')
setPrice('')
setCategory('')
setBrand('')
setDetail('')
navigate("/Product")

} catch (error){
  console.log(error)
}
}
};



const params = new URLSearchParams(window.location.search)

const id = params.get('id')

const getSingleProduct = async()=>{

  const response = await fetch('http://localhost:5000/single/product?id='+id,{
    method: 'GET',
    headers:{'Content-Type':'application/json'}
  })

  const result = await response.json();
  
setName(result.item.name)
setPrice(result.item.price)
setCategory(result.item.category)
setBrand(result.item.brand)
setDetail(result.item.detail)
setProduct(result.item)

}

useEffect(()=>{
  if(id){
    getSingleProduct()
  }
},[])


const getCategories = async()=>{
const response = await fetch('http://localhost:5000/receive/category',{
  method:'GET',
  headers:{'Content-Type':'application/json'}

})
const result = await response.json()
setCat(result.list)
}
useEffect(()=>{
  getCategories()
},[])


const getBrand = async()=>{
const response = await fetch('http://localhost:5000/receive/brand',{
  method:'GET',
  headers:{'Content-Type':'application/json'}

})
const result = await response.json()
setBrnd(result.list)
}
useEffect(()=>{
  getBrand()
},[])

  return (

<div className='product_main'>
<form onSubmit={saveHandler}>
    <div className='product_form'>
    <h2>Create New Product</h2>

    <input value={name} onChange={nameChange} 
    placeholder='Enter Product Name' 
    required></input>
    
    <input value={price} 
    onChange={priceChange} 
    placeholder='Enter Product Price' 
    required type='number'></input>

    <select className='category-options'
    value={category}
    onChange={categoryChange}> 
    {cat.map((item,index)=>{
      return <option>{item.title}</option>
    })}
    </select>

    <select className='category-options'
    value={brand}
    onChange={brandChange}> 
    {brnd.map((item,index)=>{
      return <option>{item.title}</option>
    })}
    </select>

    <input onChange={fileChange} type="file"></input>
    
    <button>Save Product</button>
    </div>

</form>
</div>


  )
}

export default Contact
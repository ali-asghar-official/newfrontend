import './ProductList.css'
import {useEffect,useState} from 'react'
import { RxUpdate } from "react-icons/rx";
import { RiDeleteBin6Line } from "react-icons/ri";
import toast from 'react-hot-toast';
import {useNavigate} from 'react-router-dom'



const ProductList = ()=>{
const [products,setProducts] = useState([])
const navigate = useNavigate()

const getProducts = async()=>{

    const response = await fetch('http://localhost:5000/product/list',{
    method: 'GET',
    headers: {'Content-Type':'application/json'}

    })
const result = await response.json()
setProducts(result.list)

};

useEffect(()=>{
getProducts()

},[])

const deleteProduct = async(item)=>{

  const response = await fetch('http://localhost:5000/product/delete?id='+item._id,{
    method: 'DELETE',
    headers: {'Content-Type': 'application/json'}
  })

  const result = await response.json()
  toast.success(result.message)
window.location.reload();
}

const updateHandler = (item)=>{


  navigate("/contact?id="+item._id)
}




return(
<div className='product_list_main'>
<div className='product_table'>

<table>
<thead className='table_head'>
    <tr>
        <th>ID</th>
        <th>Image</th>
        <th>Name</th>
        <th>Price</th>
        <th>Category</th>
        <th>Brand</th>
        <th>Date</th>
        <th>Actions</th>
    </tr>
</thead>

<tbody>
{products.map((item,index)=>{
  console.log(item)

    return <tr className='table_row'>
    <td>{item._id}</td>
    <td className='product_table_image'><img alt='abc' src={'http://localhost:5000/'+item?.image}/></td>
    <td>{item.name}</td>
    <td>Rs.{item.price}</td>
    <td>{item.category?.title}</td>
    <td>{item.brand}</td>
    <td>{new Date(item.createdAt).toLocaleDateString()}</td>


    <tr>
    <td onClick={()=>updateHandler(item)} className='product_list_action'><RxUpdate /></td>
    <td onClick={()=>deleteProduct(item)} className='product_list_action' ><RiDeleteBin6Line /></td>
  </tr>
</tr>



})}






</tbody>


</table>


</div>

</div>



)

}

export default ProductList
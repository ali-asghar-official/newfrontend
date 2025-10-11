import React from 'react'
import './CategoryList.css'
import {useEffect,useState} from 'react'
import { RxUpdate } from "react-icons/rx";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const CategoryList = () => {

const [list,setList] = useState([])
const navigate = useNavigate()

const getCategories = async()=>{

try {

const response = await fetch('http://localhost:5000/category/list',{
    method: 'GET',
    headers: {'Content-Type': 'application/json'}
})

const result = await response.json()
console.log(result)
setList(result.list)

    
} catch (error) {
    console.log(error.message)
    
}

}
useEffect(()=>{
getCategories()


},[])

const navigateHandler = (id)=>{
 navigate('/Category?id='+id)
}


const deleteCategory = async(item)=>{

  const response = await fetch('http://localhost:5000/category/delete?id='+item._id,{
    method: 'DELETE',
    headers: {'Content-Type': 'application/json'}
  })
window.location.reload();
  const result = await response.json()
  toast.success(result.message)

}




  return (
    <div className='Cat-table-Container'>

        <table className='cat-table'>
<thead className='cat-head'>
<tr className='cat-head-row'>
    <th>Id</th>
    <th>Image</th>
    <th>Title</th>
    <th>Date</th>
    <th>Actions</th>
</tr>


</thead>

<tbody>
    {list.map((item,index)=>{
        return <tr className='cat-row'>
        <td className='cat-id'>{item._id}</td>
        <td className='cat-image'><img src={'http://localhost:5000/'+item.image} alt='category-pics' /></td>
        <td>{item.title}</td>
        <td>{new Date(item.createdAt).toLocaleDateString()}</td>
        <tr>
    <td  className='cat-icon'>< RxUpdate onClick={()=>navigateHandler(item._id)} /></td>
    <td onClick={()=>deleteCategory(item)} className='cat-icon' ><RiDeleteBin6Line /></td>
  </tr>
    </tr>

    
    })}


    
</tbody>




        </table>
      
    </div>
  )
}

export default CategoryList

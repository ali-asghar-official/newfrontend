import React from 'react'
import './Category.css'
import {useState,useEffect} from 'react'
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';


const Category = () => {

const [title,setTitle] = useState()
const [file,setFile] = useState()
const [data,setData] = useState({})

const navigate = useNavigate()
    
const titleChange = (event)=>{
    setTitle(event.target.value)
}
const fileChange = async(event)=>{
    const file = event.target.files[0]
    console.log(file)
    try {

        const formData = new FormData()
        formData.append('image',file)

        const response = await fetch('http://localhost:5000/image/upload',{
            method: 'POST',
            body:formData
        })
        const result = await response.json()
        setFile(result.file)

        
    } catch (error) {
        console.log(error)
    }
}


const saveHandler = async(event)=>{
    event.preventDefault()
try {
    
    const response = await fetch('http://localhost:5000/category/add',{
        method:'POST',
        body:JSON.stringify({title,file}),
        headers:{'Content-Type':'application/json'}
    })

    const result = await response.json();
    toast.success(result.message)
    navigate('/CategoryList')

} catch (error) {
    console.log(error)
}
}



const params = new URLSearchParams(window.location.search)
const id = params.get('id')



// Fetch single category by id
const getSingleCat = async () => {
  try {
    const response = await fetch(`http://localhost:5000/category/single?id=${id}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });

    const result = await response.json();
    console.log(result);
    setTitle(result.findedCat.title);
    setFile(result.findedCat.image)
    setData(result.findedCat);

  } catch (error) {
    console.log(error);
  }
};

// Update category
const updateCategory = async () => {
  try {
    const response = await fetch(`http://localhost:5000/category/update?id=${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, file })
    });

    const result = await response.json();
    console.log(result);
    toast.success(result.message);
    navigate('/CategoryList')
  } catch (error) {
    console.log(error);
    toast.error("Update failed");
  }
};


  useEffect(() => {
    if (id) {
      getSingleCat();
    }
  }, [id]);




  return (
    <div className='Category-Main'>
        <form onSubmit={(e)=>{
e.preventDefault(); // prevent page reload
  if (id) {
    updateCategory(); // update if editing
  } else {
    saveHandler(); // (optional) create new if no id
  }
        }}>
      <div className='Category-items'>
        <input value={title} onChange={titleChange} placeholder='Enter Category Name' type='text'></input>
        <input onChange={fileChange} type='file'></input>
        <div className='cat-preview'>
            <img src={'http://localhost:5000/'+data.image}/>
        </div>
        <button>Save category</button>
      </div>
</form>

    </div>
  )
}

export default Category

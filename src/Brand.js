import React from 'react'
import './Category.css'
import {useState,useEffect} from 'react'
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Brand = () => {

const [title,setTitle] = useState()
const [file,setFile] = useState()
const [preview,setPreview] = useState()

const navigate = useNavigate()
    
const titleChange = (event)=>{
    setTitle(event.target.value)
}
const fileChange = async(event)=>{
    const file = event.target.files[0]
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
    
    const response = await fetch('http://localhost:5000/brand/add',{
        method:'POST',
        body:JSON.stringify({title,file}),
        headers:{'Content-Type':'application/json'}
    })

    const result = await response.json();
    toast.success(result.message)
    navigate('/Contact')


} catch (error) {
    console.log(error)
}
}


const params = new URLSearchParams(window.location.search)
const id = params.get('id')



// Fetch single brand by id
const getSingleBrand = async () => {
  try {
    const response = await fetch(`http://localhost:5000/brand/single?id=${id}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });

    const result = await response.json();
    console.log(result);
       setTitle(result.findedBrand.title);
      setFile(result.findedBrand.image);
      setPreview(`http://localhost:5000/${result.file}`); // update preview
  } catch (error) {
    console.log(error);
  }
};

// Update brand
const updateBrand = async () => {
  try {
    const response = await fetch(`http://localhost:5000/brand/update?id=${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, file })
    });

    const result = await response.json();
    console.log(result);
    toast.success(result.message);
    navigate('/BrandList')
  } catch (error) {
    console.log(error);
    toast.error("Update failed");
  }
};


  useEffect(() => {
    if (id) {
      getSingleBrand();
    }
  }, [id]);





  return (
     <div className='Category-Main'>
        <form onSubmit={(e)=>{
e.preventDefault(); // prevent page reload
  if (id) {
    updateBrand(); // update if editing
  } else {
    saveHandler(); // (optional) create new if no id
  }
        }}>
      <div className='Category-items'>
        <input value={title} onChange={titleChange} placeholder='Enter Brand Name' type='text'></input>
        <input onChange={fileChange} type='file'></input>
        <div className='cat-preview'>
            <img src={'http://localhost:5000/'+file}/>
        </div>
        <button>Save Brand</button>
      </div>
</form>

    </div>
  )
}

export default Brand

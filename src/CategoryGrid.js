import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import './CategoryGrid.css';

const CategoryGrid = () => {
  const [catList, setCatList] = useState([]);
  const navigate = useNavigate();

  const getCatList = async () => {
    try {
      const response = await fetch('http://localhost:5000/category/list', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });

      const result = await response.json();
      setCatList(result.list);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCatList();
  }, []);

  const getSelectCat = (item) => {
    const id = item._id;
    navigate(`/product?category=${id}`); // ✅ go to Products page with category id
  };

  return (
    <div className='category-grid'>
      {catList.map((item, index) => (
        <div 
          key={item._id} 
          onClick={() => getSelectCat(item)} 
          className='category-item'
        >
          <div>
            <img src={`http://localhost:5000/${item.image}`} alt='category_pics'/>
          </div>
          <div>
            <p className='title'>{item.title}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default CategoryGrid;

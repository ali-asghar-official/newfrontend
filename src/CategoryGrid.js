import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import './CategoryGrid.css';
import { API_URL } from './config'

const CategoryGrid = () => {
  const [catList, setCatList] = useState([]);
  const navigate = useNavigate();

  const getCatList = async () => {
    try {
  const response = await fetch(`${API_URL}/category/list`, {
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
            <img src={`${API_URL}/${item.image}`} alt='category_pics'/>
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

import React from 'react'
import './BrandGrid.css'
import haier from './Asset/haier.jpg'


const BrandGrid = () => {
  return (
    <div className='brand-grid'>

        <div className='brand-item'> 
          <img src={haier} alt='category_pics'/>
            <button className='brand-btn'>Visit Store</button>
          </div>
          <div className='brand-item'> 
          <img src={haier} alt='category_pics'/>
            <button className='brand-btn'>Visit Store</button>
          </div>
          <div className='brand-item'> 
          <img src={haier} alt='category_pics'/>
            <button className='brand-btn'>Visit Store</button>
          </div>
          <div className='brand-item'> 
          <img src={haier} alt='category_pics'/>
            <button className='brand-btn'>Visit Store</button>
          </div>
          <div className='brand-item'> 
          <img src={haier} alt='category_pics'/>
            <button className='brand-btn'>Visit Store</button>
          </div>
          <div className='brand-item'> 
          <img src={haier} alt='category_pics'/>
            <button className='brand-btn'>Visit Store</button>
          </div>
          <div className='brand-item'> 
          <img src={haier} alt='category_pics'/>
            <button className='brand-btn'>Visit Store</button>
          </div>

          <div class="bg-red-300 p-4 sm:bg-green-300 md:bg-blue-300 lg:bg-yellow-300">
  Resize me!
</div>
         
          
          </div>

      
    
  )
}

export default BrandGrid

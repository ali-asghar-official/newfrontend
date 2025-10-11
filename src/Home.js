import React from 'react'
import './Home.css'
import Product from './Product';
import CategoryGrid from './CategoryGrid';
import BrandGrid from './BrandGrid';
import {Link } from 'react-router-dom'
import { useState, useEffect } from "react";
import shipping from './Asset/shipping.png'
import moneyback from './Asset/moneyback.png'
import freindly from './Asset/freindly.png'
import banner1 from './Asset/banner-1.png' 
import banner2 from './Asset/banner-2.png' 
import pic1 from './Asset/pic-1.png'
import pic2 from './Asset/pic-2.png'
import pic3 from './Asset/pic-3.png'
import pic4 from './Asset/pic-4.png'
import { FaWhatsapp } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { CiTwitter } from "react-icons/ci";
import { MdOutlineStarPurple500 } from "react-icons/md";
import banner222 from './Asset/banner-222.png'




const images = ["/newbanner1.png", "/newbanner2.png",];


const Home = () => {

const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);





  return (


 
    <>
      {/* First Section */}
       <section
      className="hero-section"
      style={{
        backgroundImage: `url(${images[currentImage]})`,
      }}
    >
      <div className="hero-content">
        <h1>Ecommerce Store</h1>
        <p>
      Discover a wide range of quality products at unbeatable prices. 
      From fashion to electronics, we bring everything you need right to your doorstep.
    </p>
    <br/>
     <button className='hero-btn'>Collections</button>
      </div>
    </section>

      {/* Second Section */}
      <div className="boxes-container">
      <div className="box">
       <img src={shipping}/>
       </div>


      <div className="box"><img src={moneyback}/></div>
      <div className="box"><img src={freindly}/></div>
      <div className="box"><img src={shipping}/></div>
    </div>



      <h1 className="product-heading">Featured Products</h1>
      <p style={{textAlign:'center'}}>We have your occasion covered</p>     
      <Product />
      {/* <h1 className="product-heading">Categories</h1>
      <CategoryGrid /> */}

<div className="mid-boxes-container">
      
      <div className="mid-box-1">
        <div className='box-1-content'>
<p>TOP COLLECTIONS</p>
<h3>Top Trend Style</h3>
<p className='shopnow'>Shop Now</p>
</div>

      </div>
      <div className="mid-box-2">
<div className='box-1-content'>
<p>PREMIUM - ONLINE EXCLUSIVE</p>
<h3>Here Your Style</h3>
<p className='shopnow'>Shop Now</p>
</div>



      </div>
    </div>

    <br/>


 <div className="marquee">

      <p>  <MdOutlineStarPurple500 />  FREE DELIVERY FOR ORDER OVER $120  <MdOutlineStarPurple500 />  FREE DELIVERY FOR ORDER OVER $120  <MdOutlineStarPurple500 />  FREE DELIVERY FOR ORDER OVER $120   <MdOutlineStarPurple500 />  FREE DELIVERY FOR ORDER OVER $120</p>
    </div>

        <br/>

<div className="lower-boxes-container">
  <div className='lower-box-1'>
    <br/>
    <p>For Online Purchase</p>
    <h2 className='off'>50% OFF</h2>
    <br/>
    <button className='hero-btn'>Collections</button>
  </div>

  <div className="lower-box-2">
    <img className="lower-box-2" src={banner222}/>
  </div>
</div>



     <div className='follow'><h1>Follow @ Daraz</h1>
    <p>The best quality products are waiting for you & choose it now.
</p>
</div>
<br/>

      {/* Gallery */}
      <div className="gallary-grid">
        <div className="four-pic-col">
          <img src={pic1} alt="" style={{ borderRadius: "25px" }} />
          <img src={pic2} alt="" style={{ borderRadius: "25px" }} />
          <img src={pic3} alt="" style={{ borderRadius: "25px" }} />
          <img src={pic4} alt="" style={{ borderRadius: "25px" }} />
        </div>
      </div>

      <br/>

      {/* Footer */}
      <footer>
        <div className="footer-section-1">
          <h3>TheWorkPlace*</h3>
          <p>
            Donec Sodales Sagittis Magna. Sed Consequat, Leo Eget Bibendum
            Sodales, Augue Velit Cursus Nunc, Quis Gravida Libero.
          </p>
        </div>
        <div className="footer-section-2">
          <h3>Quick Links</h3>
          <ul>
            <li><a style={{color:'black'}} href="#">Home</a></li>
            <li><a style={{color:'black'}} href="#">About US</a></li>
            <li><a style={{color:'black'}} href="#">Amenities</a></li>
            <li><a style={{color:'black'}} href="#">Pricing</a></li>
            <li><a style={{color:'black'}} href="#">Contact</a></li>
          </ul>
        </div>
        <div className="footer-section-3">
          <h3>Important Links</h3>
          <ul>
            <li><a style={{color:'black'}} href="#">Terms & Conditions</a></li>
            <li><a style={{color:'black'}} href="#">Legal</a></li>
            <li><a style={{color:'black'}} href="#">Business</a></li>
            <li><a style={{color:'black'}} href="#">Partners</a></li>
          </ul>
        </div>
        <div className="footer-section-4">
          <h3>Let’s Connect!</h3>
          <p>Connect with entrepreneurs, build your network, make great business.</p>
          <FaWhatsapp className='icon'/>
          <br/>
          <FaFacebook className='icon' />
          <br/>
          <CiTwitter className='icon' />
        </div>
      </footer>
    </>

    

    

// <div className="container">
//   <div className="main-content">
//     <h1 className="main-heading">Categories</h1>
//     <CategoryGrid />
//     <br />
//     <h1 className="main-heading">Our Products</h1>
//     <Product />
  
//     <br />
//     <h1 className="main-heading">Brands</h1>
//     <BrandGrid />

// <br />
// <br />
// <br />


//   </div>

  );

};

export default Home
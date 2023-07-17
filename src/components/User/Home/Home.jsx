import React, { useEffect, useState } from 'react';
import Navbar from '../../Shared/Navbar/Navbar';
import { Carousel } from 'react-responsive-carousel';
import './Home.css';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Footer from '../../Shared/Footer/Footer';
import Cards from '../Cruise/Cards';
import axios from 'axios';
import { baseApi } from '../../../store/Api';

function Home() {
  const[cards,setCards]=useState([])

  useEffect(() => {
    axios.get(`${baseApi}cruise-data`, { withCredentials: true })
      .then((res) => {
        const firstThreeElements = res.data.slice(0, 3);
        setCards(firstThreeElements);
      })
      .catch((error) => console.log(error));
  }, []);
  

  return (
    <div>
      <Navbar />
      <div className='home' style={{ marginTop: "5px" }}>
        <Carousel autoPlay infiniteLoop interval={3000} showThumbs={false} showArrows={false}>
          <div style={{ position: "relative"}}>
            <img src="https://wallpapercave.com/wp/wp3194873.jpg" alt="Banner 1" className='img-banner'  />
            <div className="caption-overlay">
              <h1 className="image-text ">Sail with Us</h1>
              <p className='image-p mt-4'>We offer an array of houseboats in Deluxe, Premium and Luxury
 categories with varying capacity of accommodation. 
There are one-bedroom houseboats to up to ten-bedrooms</p>
            </div>
          </div>
          <div style={{ position: "relative"}}>
            <img src="https://i0.wp.com/happyhouseboat.com/wp-content/uploads/2020/12/Dolphin-one-bedroom-3.jpeg" alt="Banner 2" className='img-banner'  />
            <div className="caption-overlay">
              <h1 className="image-text">Explore New Journey</h1> 
              <p className='image-p mt-2'>Kerala Houseboat Guide Is your ultimate destination to book the perfect package. 
We help you find the best Kerala boat house that suit your requirement.</p>
            </div>
          </div>
          
        </Carousel>
        <div className='container' style={{ padding: "20px" }}>
            <Cards data={cards}/>
        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default Home;

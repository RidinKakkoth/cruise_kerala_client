import React, { useEffect, useState } from 'react';
import Navbar from '../../Shared/Navbar/Navbar';
import { Carousel } from 'react-responsive-carousel';
import './Home.css';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Footer from '../../Shared/Footer/Footer';
import Cards from './Cards';
import ChatBot from '../../Shared/ChatBot';
import { useSelector } from 'react-redux';
import { cruiseData } from '../../../config/UserEndpoints';

function Home() {
  const user=useSelector(state=>state.User.userToken)
  const[cards,setCards]=useState([])


  useEffect(() => {
    async function invoke(){
      const data=await cruiseData()
      if(data){
       const firstThreeElements = data?.data?.slice(0, 4);
        setCards(firstThreeElements);
      }
    }
    invoke()
  }, []);

  

  return (
    <div>
      <Navbar />
      {user&&<ChatBot/>}
      <div className='home' style={{ marginTop: "5px" }}>
        <Carousel autoPlay infiniteLoop interval={3000} showThumbs={false} showArrows={false}>
          <div style={{ position: "relative"}}>
            <img src="https://wallpapercave.com/wp/wp3194873.jpg" alt="Banner 1" className='img-banner'  />
            <div className="caption-overlay">
              <h1 className="image-text ">Sail with Us</h1>
              <p className='image-p mt-20 sm:mt-2 ms-5 sm:ms-0 '>We offer an array of houseboats in Deluxe, Premium and Luxury
 categories with varying capacity of accommodation. 
There are one-bedroom houseboats to up to ten-bedrooms</p>
            </div>
          </div>
          <div style={{ position: "relative"}}>
            <img src="https://i0.wp.com/happyhouseboat.com/wp-content/uploads/2020/12/Dolphin-one-bedroom-3.jpeg" alt="Banner 2" className='img-banner'  />
            <div className="caption-overlay">
              <h1 className="image-text ms-3 sm:ms-0 ">Explore New Journey</h1> 
              <p className='image-p mt-12 sm:mt-2 ms-5 sm:ms-0'>Kerala Houseboat Guide Is your ultimate destination to book the perfect package. 
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

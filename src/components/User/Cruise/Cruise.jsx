import React, { useEffect, useState } from 'react';
import './Cruise.css';
import axios from 'axios';
import { adminApi, baseApi } from '../../../store/Api';
import { Carousel } from 'react-responsive-carousel';

function Cruise() {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    axios.get(`${adminApi}cruise-data`, { withCredentials: true })
      .then((res) => {
        setCards(res.data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div id='cruise-cards-main-body'>
      <section>
        <div className="container">
          {/* <h1 className='cruise-main-h1'>Explore Our Cruises</h1> */}
          <div style={{background:"gray"}} className="category-filter">
            <div className="category">
              <h3>Categories:</h3>
            </div>
            <div className="filter">
              <h3>Filter:</h3>
            </div>
          </div>
          <div className="cruise-cards">
            {cards && cards.length > 0 ? (
              cards.map((card, index) => (
                <div key={index} className="each-card">
                  {/* <img className='img-cruise-card' src={`${baseApi}files/${card.Images[0]}`} alt="" /> */}
                  <Carousel  showThumbs={false} showArrows={false}>
                    {card.Images.map((image, index) => (
                      <div key={index}>
                        <img src={`${baseApi}files/${image}`} alt="Banner" className='img-cruise-card' />
                      </div>
                    ))}
                  </Carousel>
                  <div style={{display:"flex",justifyContent:"space-between"}}><h5>{card.name}</h5> rating</div>
                  <p style={{color:"#717171",fontWeight:'500'}}>{card.category}</p>
                  <p style={{color:"#717171"}}>{card.boarding},{card.district}</p>
                  <p style={{color:"black",fontWeight:'500',marginTop:"15px"}}>₹{card.baseRate} <span style={{color:"black",fontWeight:"400"}}>night</span> </p>
                  {/* <button className='card-btn'>Explore</button> */}
                </div>
              ))
            ) : (
              <p>No cruise cards available.</p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Cruise;

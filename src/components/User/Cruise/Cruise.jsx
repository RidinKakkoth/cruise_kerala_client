import React, { Fragment, useEffect, useState } from "react";
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import axios from 'axios';
import { baseApi } from '../../../store/Api';
import { Carousel } from 'react-responsive-carousel';
import './Cruise.css';
import { useNavigate } from 'react-router-dom';
import { Backdrop, Button, Checkbox, Fade, FormControlLabel, FormGroup, Rating, Typography } from '@mui/material';
import SearchBar from '../../Shared/SearchBar';
import Modal from '@mui/material/Modal';
import Loading from "../../Shared/Loading";

function Cruise() {
  const [cards, setCards] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [originalCards, setoriginalCards] = useState(cards);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [category, setCategory] =useState([]);

  const applyFilter = (id) => {
console.log(id,"iiiiiiiiiiddddddddddd");
    const newData=originalCards.filter((value)=>{
      console.log(value.category._id,"vvvvccccccc");
    return  value.category._id===id
  
    })
    setCards(newData)
    handleClose(); // Close the filter modal after applying the filter
  };
  
  


 useEffect(() => {
    axios.get(`${baseApi}cruise-data`, { withCredentials: true })
      .then((res) => {
       
        setCards(res.data.data);
        setoriginalCards(res.data.data)
        setCategory(res.data.categoryData)
        localStorage.clear()
      })
      .catch((error) => console.log(error));
  }, []);

  const handleClick = (obj) => {
    navigate('/cruises/' + obj._id);
  }

  function calculateAverageRating(reviews) {
    const ratingsArray = reviews?.map((value) => value.ratings);
    const averageRating = ratingsArray?.reduce((acc, rating) => acc + rating, 0) / (ratingsArray?.length || 1);
    return averageRating;
  }



  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />





<div className='-z-50 '>

</div>
      <Box component="main" sx={{ flexGrow: 1, p:3 }}>
        <Toolbar />
        <div className="container" id='conatiner-cruise'>
          <div className='searchbar container'>
                    <SearchBar /> 
                <div onClick={handleOpen} className='ml-auto  cursor-pointer'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
              </svg>
                </div>

          </div>
          <div className="cruise-cards container">
          {cards && cards.length > 0 ? (
  cards.map((card, index) => (
                  <div onClick={() => handleClick(card)} key={index} className="each-card shadow">
                    <Carousel showThumbs={false} showArrows={false}>
                      {card.Images.map((image, index) => (
                        <div key={index}>
                          <img src={`${baseApi}files/${image}`} alt="Banner" className='img-cruise-card' />
                        </div>
                      ))}
                    </Carousel>
                    <div className='font-sans' style={{ display: "flex", justifyContent: "space-between" }}>
                      <div>
                      <h5>{card.name}</h5>
                      </div>
                <Rating
                  className=""
                  readOnly
                  value={calculateAverageRating(card.review)}
                  size="small"
                  name="simple-controlled"
                />

                    </div>
                    <div className='flex-col '>
                        <div>
                        <p style={{ color: "#717171", fontWeight: '500' }}>{card.category.name}</p>
                        </div>
                        <div>
                        <p style={{ color: "#717171" }}>{card.boarding}, {card.district}</p>
                        </div>
                        <div className='flex '>
                        <p style={{ color: "black", fontWeight: '600', marginTop: "15px" }}>₹{card.baseRate} <span style={{ color: "black", fontWeight: "400" }}>night</span> </p>

                        </div>

                    </div>

                  </div>
                ))
            ) : (
              <div className="mt-16 mb-16 flex ">
                <div className="flex mx-auto">
                <Loading  />
                </div>
              </div>
            )}
          </div>

        </div>
      </Box>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
        <Box className="rounded-2xl flex-col " sx={style}>
  <h5 className='font-semibold text-lg border-b py-2 text-center'>Category</h5>

  <ul className="flex-col  items-center me-4 "> {/* Add justify-center and items-center classes here */}
    <li className="font-sans font-medium mb-2 cursor-pointer border rounded-md px-2 text-center py-2 hover:bg-gray-200" onClick={()=>{
      setCards(originalCards)
      handleClose()
    }}>All categories</li>
    {category?.map((categoryItem) => (
      <div key={categoryItem._id}> {/* Add key attribute for the mapping */}
        <li className="font-sans font-medium mb-2 cursor-pointer border rounded-md text-center py-2 hover:bg-gray-200" onClick={()=>{applyFilter(categoryItem._id)}}>
          {categoryItem.name}
        </li>
      </div>
    ))}
  </ul>
</Box>





        </Fade>
      </Modal>
    </Box>
  );
}

export default Cruise;


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 300,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};
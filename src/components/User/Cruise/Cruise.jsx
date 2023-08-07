import React, {  useEffect, useState } from "react";
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import { Carousel } from 'react-responsive-carousel';
import './Cruise.css';
import { useNavigate } from 'react-router-dom';
import { Backdrop, Fade,  Rating,  } from '@mui/material';
import SearchBar from '../../Shared/SearchBar';
import Modal from '@mui/material/Modal';
import Loading from "../../Shared/Loading";
import { cruiseData } from "../../../config/UserEndpoints";

function Cruise() {
  const [cards, setCards] = useState([]);
  const [originalCards, setoriginalCards] = useState([]);
  const [category, setCategory] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleClose = () => {
    setOpen(false);
    setSearchQuery(""); // Reset the search query when closing the modal
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const applyFilter = (id) => {
    const newData = originalCards.filter((value) => {
      return value.category._id === id;
    });
    setCards(newData);
    handleClose(); // Close the filter modal after applying the filter
  };

  
  useEffect(() => {
    async function invoke(){
      const data=await cruiseData()
      if(data){
        setCards(data.data);
        setLoading(false)
        setoriginalCards(data.data);
        setCategory(data.categoryData);
        localStorage.clear();

        const filterCards = (query) => {
          const filteredData = originalCards?.filter((card) => {
            const nameMatches = card?.name.toLowerCase().includes(query.toLowerCase());
            const districtMatches = card?.district.toLowerCase().includes(query.toLowerCase());
            return nameMatches || districtMatches;
          });
          setCards(filteredData);
        };
        filterCards(searchQuery);
       }
        }
        invoke()
  }, [searchQuery,originalCards]);


  // useEffect(() => {
  //   filterCards(searchQuery);
  // }, [searchQuery,filterCards]);

  const handleClick = (obj) => {
    navigate('/cruises/' + obj._id);
  };

  function calculateAverageRating(reviews) {
    const ratingsArray = reviews?.map((value) => value.ratings);
    const averageRating = ratingsArray?.reduce((acc, rating) => acc + rating, 0) / (ratingsArray?.length || 1);
    return averageRating;
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <div className='-z-50 '></div>
      <Box component="main" sx={{ flexGrow: 1, p:3 }}>
        <Toolbar />
        <div className="container" id='conatiner-cruise'>
          <div className='searchbar container'>
            <SearchBar onSearch={(query) => setSearchQuery(query)} />
            <div onClick={handleOpen} className='ml-auto  cursor-pointer'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
              </svg>
            </div>
          </div>

         {!loading?( <div className="cruise-cards container">
            {cards && cards.length > 0 ? (
              cards?.map((card, index) => (
                <div onClick={() => handleClick(card)} key={index} className="each-card shadow">

<Carousel showThumbs={false} showArrows={false}>
  {card?.Images.map((image, index) => (
    <div key={index} className="relative">
      <img src={image} alt="Banner" className='img-cruise-card' />

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
              <div className="w-[80vw] h-[60vh] flex justify-center items-center">
        
                  <h4 className="">No result found !!!</h4>
              </div>
            )}
          </div>):(<div className="mt-20 mb-32">
            <Loading  />
          </div> )}


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
            <ul className="flex-col  items-center me-4 ">
              <li className="font-sans font-medium mb-2 cursor-pointer border rounded-md px-2 text-center py-2 hover:bg-gray-200" onClick={()=>{
                setCards(originalCards);
                handleClose();
              }}>
                All categories
              </li>
              {category?.map((categoryItem) => (
                <div key={categoryItem._id}>
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

export default Cruise;

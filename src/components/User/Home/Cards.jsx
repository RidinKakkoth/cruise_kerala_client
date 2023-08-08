import { Rating } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Typewriter from 'typewriter-effect';

const Cards = ({ data }) => {
  const navigate = useNavigate();
  function calculateAverageRating(reviews) {
    const ratingsArray = reviews?.map((value) => value.ratings);
    const averageRating = ratingsArray?.reduce((acc, rating) => acc + rating, 0) / (ratingsArray?.length || 1);
    return averageRating;
  }

  return (
    <div className='w-full py-[4rem] px-4'>
        <div className='flex justify-around mb-5 italic text-3xl underline font-bold text-[#011742]'>
        <Typewriter
  options={{
    strings: ["Explore Our Cruises"],
    autoStart: true,
    loop: true,
  }}

/>

        </div>
        <div className='max-w-[1240px] mx-auto grid md:grid-cols-4 gap-4'>
  {data?.map((detail, index) => (
    <div
      key={index} onClick={() => { navigate('/cruises/' + detail._id) }}
      className='w-full shadow-2xl flex flex-col cursor-pointer p-4 my-4 rounded-lg hover:scale-105 duration-300 transform-gpu transition-transform text-center'
    >
      <div className='relative'>
        <img
          className='rounded-xl mx-auto w-full max-h-32 bg-white object-cover'
          src={detail.Images?.[0]}
          alt='/'
        />
      </div>
      <h2 className='text-xl font-bold text-center py-2'>{detail.name}</h2>
      {/* Your Rating component here */}
      <p className='text-center text-lg font-bold'>
        ₹ {detail.baseRate} <span className='text-sm font-normal'>per night</span>
      </p>
      <div className='text-center font-medium'>
        <div className='flex'>
          <p className='py-1 border-b text-gray-600 mx-auto mt-2'>{detail.boarding} , {detail.district}</p>
        </div>
        <p className='py-1 border-b text-gray-800 mx-auto mt-2'>
          Rooms: {detail.rooms} | Guest: {detail.maxGuest}
        </p>
      </div>
      <button
        className='bg-[#011742] text-white rounded-md font-medium my-2 mx-auto px-4 py-2'
      >
        <span className='text-white'>Explore</span>
      </button>
    </div>
  ))}
</div>





    </div>
  );
};

export default Cards;


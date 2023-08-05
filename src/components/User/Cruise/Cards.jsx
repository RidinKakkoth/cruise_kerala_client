import React from 'react';
import { useNavigate } from 'react-router-dom';
import Typewriter from 'typewriter-effect';

const Cards = ({ data }) => {
  const navigate = useNavigate();


  return (
    <div className='w-full py-[4rem] px-4 bg-white'>
        <div className='flex justify-around mb-5 italic text-3xl underline font-bold text-[#011742]'>
        <Typewriter
  options={{
    strings: ["Explore Our Cruises"],
    autoStart: true,
    loop: true,
  }}

/>

        </div>

      <div className='max-w-[1240px] mx-auto grid md:grid-cols-3 gap-8'>
        {data?.map((detail, index) => {
          return (
            <div
              key={index}
              className='w-full shadow-2xl flex flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300 text-center'
            >
              <img
                className='rounded-xl mx-auto mt-[-3rem] max-h-40  bg-white'
                
                src={detail.Images?.[0]}
                alt='/'
              />
              <h2 className='text-2xl font-bold text-center py-4'>{detail.name}</h2>
              <p className='text-center text-3xl font-bold'>
                ₹ {detail.baseRate} <span className='text-sm font-normal'>per night</span>
              </p>
              <div className='text-center font-medium'>
                <p className='py-2 border-b mx-6 mt-2'>{detail.district}</p>
                <p className='py-2 border-b mx-6 mt-3'>
                  Rooms:{detail.rooms} | Guest : {detail.maxGuest}
                </p>
              </div>
              <button
                onClick={() => {
                  navigate('/cruises');
                }}
                className='bg-[#011742] text-black rounded-md font-medium my-6 px-6 py-3 w-[50%] self-center'
              >
                <span className='text-white'>Explore</span>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Cards;

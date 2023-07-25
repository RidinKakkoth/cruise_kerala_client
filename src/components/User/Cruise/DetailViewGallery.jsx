import React, { useState } from "react";
import { baseApi } from  '../../../config/Api';
import { Carousel } from "react-responsive-carousel";

export default function DetailViewGaller({ data }) {
  const [showall, setShowall] = useState(false);

  const handleClick = () => {
    setShowall(true);
  };


  return (
    <div className="relative rounded-2xl">
<div className="flex justify-end">
  {showall && (
    <button
      onClick={() => {
        setShowall(false);
      }}
      className="rounded-3xl mb-2 text-lg font-medium bg-white shadow-lg border-gray-400 flex items-center gap-1 px-3 py-1"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
      </svg>
      <span>close</span>
    </button>
  )}
</div>

      {data ? (
        !showall ? (
          <div className="grid w-[75%] gap-2 grid-cols-[2fr_1fr]">
            <div>
              {data.Images?.length > 0 && (
                <img
                  className="aspect-square object-cover rounded-l-3xl w-full h-full"
                  src={data.Images[0]}
                  alt="img"
                />
              )}
            </div>
            <div className="grid">
              {data.Images?.length > 0 && (
                <img
                  className="aspect-square object-cover rounded-tr-3xl w-full h-full"
                  src={data.Images[1]}
                  alt="img"
                />
              )}
              <div className="overflow-hidden">
                {data.Images?.length > 0 && (
                  <img
                    className="aspect-square rounded-br-[2.5rem] object-cover relative top-2 w-full h-full"
                    src={data.Images[2]}
                    alt="img"
                  />
                )}
              </div>
            </div>
          </div>
        ) : (
            <Carousel className="w-[75%]  self-center mx-auto" autoPlay  interval={3000} showThumbs={false}  showArrows={true}>
{
    data.Images.map((img,index)=>{
       return <div style={{ position: "relative"}}>


         <img   src={img}
        alt="Banner 1" className='img-banner'  />


        </div>   
    })
}


          </Carousel>
        )
      ) : (
        <div className="flex flex-col items-center">
          <img
            className="w-52"
            src="https://raw.githubusercontent.com/spagnuolocarmine/spagnuolocarmine/main/sail.gif"
            alt=""
          />
          <h5 className="text-center">loading....</h5>
        </div>
      )}
  
{   !showall &&  <button
        onClick={handleClick}
        className="absolute font-medium bottom-2 right-[26%] flex items-center gap-2 px-1 bg-white rounded-2xl shadow-md shadow-gray-500 py-2 whitespace-nowrap overflow-hidden"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
          />
        </svg>
        <span className="hidden lg:inline">Show more photos</span>
      </button>}
    </div>
  );
  
}

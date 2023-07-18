import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { baseApi } from "../../../store/Api";
import { parseISO } from 'date-fns';

function Confirmation() {

  const navigate=useNavigate()
  const handleClick=()=>{
    navigate('/account/bookings')
  }

  const location = useLocation();
  const data = location.state?.data;//passed data from booking page
  const checkInDate=new Date(data.checkInDate)
  const checkOutDate=new Date(data.checkOutDate)
  const booked = location.state?.bookedData;//booked data from payment

  return (
    <div className=" container">
      <div className="bg-gray-200 mt-28 mb-10 ">
        <div className="flex justify-center">
          <img
            className="w-40 mt-4 mb-4"
            src="https://www.freepnglogos.com/uploads/thank-you-png/thank-you-png-testimonials-calm-order-professional-home-organizing-29.png"
            alt=""
          />
        </div>
        <div className="flex justify-center mb-5 ">
          <span className="mr-3"><img className="w-12" src="https://cdn.pixabay.com/photo/2021/08/07/22/32/verified-6529513_1280.png" alt="" /></span>
          <h1> Booking Confirmed</h1>
        </div>
        <div className="mb-5 ms-5">
          <h3>Booking Details</h3>
          <h4 className="mt-5">Booking Id : <span className="text-lg">{booked.bookingId}</span></h4>
        </div>

        <div className="flex flex-wrap mt-4 bg-white pt-3 pb-3 justify-around">
  <div className="flex flex-col items-center sm:flex-row sm:items-center">
    <img className="w-28 h-28 mr-5 rounded" src={`${baseApi}files/${data.cruiseImg[0]}`} alt="dfdf" />
    <span className="font-medium text-lg">{data.cruiseName}</span>
  </div>
  <div className="flex flex-col items-center  font-medium mt-2 sm:mt-0">
    Check-In:
    <span className="mr-1 mb-3 text-xl font-medium"></span>
    {checkInDate.toDateString()}
  </div>
  <div className="flex flex-col items-center font-medium mt-2 sm:mt-0">
    Check-Out:
    <span className="mr-1 mb-3 text-xl font-medium"></span>
    {checkOutDate.toDateString()}
  </div>
  <div className="flex flex-col items-center  font-medium mt-2 sm:mt-0">
    Guest:
    <span className="mr-1 mb-3 text-xl font-medium"></span>
    {data.guest}
  </div>
  <div className="flex flex-col items-center font-medium mt-2 sm:mt-0">
    Total:
    <span className="mr-1 mb-3 text-xl font-medium"></span>
    ₹ {data.totalAmount}.00
  </div>
</div>


      </div>
      <div className="flex justify-center mb-5">
        <button onClick={handleClick} className="bg-[#011742] w-52 h-12 text-lg rounded-3xl hover:bg-blue-900 text-white">Your Bookings</button>

      </div>
    </div>
  );
}

export default Confirmation;

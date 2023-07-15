import React from "react";
import { useLocation } from "react-router-dom";
import { baseApi } from "../../../store/Api";

function Confirmation() {
  const location = useLocation();
  const data = location.state?.data;
  const booked = location.state?.bookedData;
  console.log(data, "dddddddddddddddddd",booked);

  return (
    <div className="mt-24 container">
      <div className="bg-gray-200 mt-48 mb-10 ">
        <div className="flex justify-center">
          <img
            className="w-56 h-44"
            src="https://png.pngtree.com/png-vector/20230307/ourmid/pngtree-five-stars-flat-icons-design-template-vector-png-image_6636529.png"
            alt=""
          />
        </div>
        <div className="flex justify-center mb-5 ">
          <h1>Booking Confirmed</h1>
        </div>
        <div className="mb-5 ms-5">
          <h3>Booking Details</h3>
          <h4 className="mt-5">Booking Id : <span className="text-lg">{booked.bookingId}</span></h4>
        </div>
        <div className="flex mt-4 bg-cyan-100 pt-3  pb-3 justify-around">
          <div className="flex  items-center "> <img className="w-28 h-28 mr-5 rounded " src={`${baseApi}files/${data.cruiseImg[0]}`} alt="dfdf" /><span className="font-medium text-lg">{data.cruiseName}</span></div>
          <div className="flex  items-center font-medium ">Check-In :<span className="mr-1 text-xl  font-medium"> </span> {data.checkInDate}</div>
          <div className="flex  items-center font-medium ">Check-In :<span className="mr-1 text-xl font-medium"> </span>{data.checkOutDate}</div>
          <div className="flex  items-center font-medium ">Guest :<span className="mr-1 text-xl font-medium"> </span>{data.guest}</div>
          <div className="flex  items-center font-medium ">Total :<span className="mr-1 text-xl font-medium"> </span>₹ {data.totalAmount}.00</div>
        </div>
      </div>
    </div>
  );
}

export default Confirmation;

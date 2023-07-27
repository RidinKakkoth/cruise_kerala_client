import React, { useEffect, useState, lazy, Suspense } from "react";
import {  useNavigate, useParams } from "react-router-dom";
import "./CruiseSingle.css";

import AccessTimeIcon from "@mui/icons-material/AccessTime";
import TransferWithinAStationIcon from "@mui/icons-material/TransferWithinAStation";
import BedroomParentIcon from "@mui/icons-material/BedroomParent";

import  DatePicker  from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css'
import { parseISO, startOfDay, isSameDay } from 'date-fns';

import "@mobiscroll/react/dist/css/mobiscroll.min.css";
import { Stepper } from "@mobiscroll/react";

import { baseApi } from  '../../../config/Api';

import "react-responsive-carousel/lib/styles/carousel.min.css";

import axios from "axios";
import Facilities from "./Facilities";
import { Rating } from "@mui/material";
import Loading from "../../Shared/Loading";
import dateConvert from "../../../utils/DateFormat";
import { bookedDatesData } from "../../../config/UserEndpoints";


const DetailViewGallery = lazy(() => import("./DetailViewGallery"));

function CruiseSingle() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    if (!id) {return;}

    axios.get(`${baseApi}single-view/${id}`).then((res) => {
      setLoading(false)
      setData(res.data.cruiseData);

    });
  }, [id]);
  const [data, setData] = useState([]);
  const [extraGuest, setExtraGuest] = useState(0);
  const [inDateError, setInDateError] = useState(false);
  const [outDateError, setOutDateError] = useState(false);
  const [tax, setTax] = useState(0);
  const [fee, setFee] = useState(0);



const [checkInDate, setCheckInDate] = useState(() => {
  const storedDateString = localStorage.getItem('checkInDate');
  const storedDateObj = storedDateString ? new Date(JSON.parse(storedDateString)) : null
  return storedDateObj;
});

const [checkOutDate, setCheckOutDate] = useState(() => {
  const storedDateString = localStorage.getItem('checkOutDate');
  const storedDateObj = storedDateString ? new Date(JSON.parse(storedDateString)) : null
  return storedDateObj;
});




  const [guest, setGuest] = useState(() => {
    const noOfGuest = localStorage.getItem("guest");
    return noOfGuest ? JSON.parse(noOfGuest) : 0;
  });
  const [numOfNights, setNumOfNights] = useState(() => {
    const nights = localStorage.getItem("nights");
    return nights ? JSON.parse(nights) : 0;
  });
  const [totalAmount, setTotalAmount] = useState(() => {
    const total = localStorage.getItem("total");
    return total ? JSON.parse(total) : 0;
  });

  const today = new Date();
const sixMonthCheckOutDate = new Date(today.getFullYear(), today.getMonth() + 6, today.getDate());

const [maxCheckOutDate, setMaxCheckOutDate] = useState(null);
const [bookedDates, setBookedDates] = useState([]);

useEffect(()=>{
    async function invoke(){
      const data=await bookedDatesData(id)
      if(data){
        setBookedDates(data)
      }
    }
    invoke()
},[id])

const disabledDates = [];


bookedDates.forEach((dates, index) => {
  const startDate = startOfDay(parseISO(dates.checkIn));
  const endDate = startOfDay(parseISO(dates.checkOut));

  let currentDate = startDate;
  while (currentDate <= endDate) {

      disabledDates.push(new Date(currentDate));

    currentDate = new Date(currentDate.setDate(currentDate.getDate() + 1));
  }
});





  useEffect(() => {
    localStorage.setItem("checkInDate", JSON.stringify(checkInDate));
    localStorage.setItem("checkOutDate", JSON.stringify(checkOutDate));
    localStorage.setItem("guest", JSON.stringify(guest));
    localStorage.setItem("nights", JSON.stringify(numOfNights));
    localStorage.setItem("total", JSON.stringify(totalAmount));
  }, [checkInDate,checkOutDate,guest,numOfNights,totalAmount]);


  const obj = {
    cruiseId:data._id,
    checkInDate,
    checkOutDate,
    numOfNights,
    guest,
    totalAmount,
    tax,
    fee,
    cruiseName: data.name,
    cruiseImg: data.Images,
    cruisePlace: data.boarding,
    baseRate: data.baseRate,
    extraGuest,
  };

  function calculateAverageRating(reviews) {
    const ratingsArray = reviews?.map((value) => value.ratings);
    const averageRating = ratingsArray?.reduce((acc, rating) => acc + rating, 0) / (ratingsArray?.length || 1);
    return averageRating;
  }

  const handleBook = () => {
    if (!checkInDate) setInDateError(true);

    if (!checkOutDate) setOutDateError(true);

    checkInDate &&
      checkOutDate &&
      navigate("/checkout", { state: { data: obj } });
  };

  const handleCheckInDateChange = (event) => {
    const selectedDate = event;
    const nextDisabledDay = disabledDates.find((date) => date > selectedDate);
  
    setCheckInDate(selectedDate);
    setCheckOutDate(null);
    setInDateError(false);
  
    if (nextDisabledDay) {
      setMaxCheckOutDate(nextDisabledDay);
    }else{

      setMaxCheckOutDate(sixMonthCheckOutDate);
    }
  };
  

  const handleCheckOutDateChange = (event) => {
    const selectedDate = event;
    const isDisabled = disabledDates.some((date) => {
      return date >= checkInDate && date <= selectedDate;
    });
  
    if (isDisabled) {
      setOutDateError(true);
    } else {
      setCheckOutDate(selectedDate);
      calculateNumOfNights(checkInDate, selectedDate);
      setOutDateError(false);
    }
  };
  

  const handleGuest = (e) => {
    const added = e.target.value;
    setGuest(added);
    if (added > data.rooms * 2) {
      setExtraGuest(added - data.rooms * 2);
    } else {
      setExtraGuest(0);
    }
  };



  const calculateNumOfNights = (checkIn, checkOut) => {
    if (checkIn && checkOut) {
      const startDate = new Date(checkIn);
      const endDate = new Date(checkOut);

      const differenceInTime = endDate.getTime() - startDate.getTime();

      const numOfNights = Math.ceil(differenceInTime / (1000 * 3600 * 24));

      setNumOfNights(numOfNights);
    }
  };



  useEffect(() => {
    const pricePerNight = data.baseRate;
    const extraRate = data.extraRate;
  
    if (numOfNights > 0 && extraGuest >= 0) {
     const totalNoTax= pricePerNight * numOfNights + extraGuest * numOfNights * extraRate
     setTax(totalNoTax/10)
     setFee(totalNoTax/10)
    const updatedTotal=totalNoTax+(totalNoTax/10)*2

      setTotalAmount(updatedTotal
        // pricePerNight * numOfNights + extraGuest * numOfNights * extraRate
      );
    }
  }, [numOfNights, extraGuest, data.baseRate, data.extraRate]);
  



  return (
    <div className="single-view-main container">

{!loading?(    
  <> 
  <h3 className="cruise-head">{data.name}</h3>
      <div style={{ display: "flex" }}>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
    </svg>
        <p className="ms-2" style={{ fontWeight: "500", marginBottom: 20 }}>
          {data.boarding},{data.district}
        </p>
      </div>


<Suspense fallback={<div>Loading...</div>}>
            <DetailViewGallery data={data} />
          </Suspense>

      <hr />
      <div className="chck-grid-single mb-2 sm:mb-5" style={{ gap: 100 }}>
        <div className="chck-grid-single__details">
          <div style={{ marginTop: "10px", marginBottom: "20px" }}>
            <h5 style={{ marginTop: "10px" }}>About</h5>
            {data.description}
          </div>
          <h5 style={{ marginTop: "50px", marginBottom: "20px" }}>Details</h5>
          <p className="chck-grid-single__label">
            <BedroomParentIcon className="chck-grid-single__icon" />
            Number of Rooms :
            <span className="chck-grid-single__value"> {data.rooms}</span>
          </p>
          <p className="chck-grid-single__label">
            <TransferWithinAStationIcon className="chck-grid-single__icon" />
            Max-Number of Guests :
            <span className="chck-grid-single__value"> {data.maxGuest}</span>
          </p>
          <p className="chck-grid-single__label">
            <AccessTimeIcon className="chck-grid-single__icon" />
            Check-In time:{" "}
            <span className="chck-grid-single__value">12 PM</span>
          </p>
          <p className="chck-grid-single__label">
            <AccessTimeIcon className="chck-grid-single__icon" />
            Check-Out time:{" "}
            <span className="chck-grid-single__value">12 PM</span>
          </p>
          <p className="mt-5 ms-5">* Base rate is applicable only for 2 guest per room</p>
          <p className="mt-2 ms-5">* For extra guest ₹ 1000 per head payable</p>
        </div>
        <div
          className="bg-white shadow p-4 rounded-2xl"
          style={{ borderRadius: "20px" }}
        >
          <div id="head-price" className=" text-center">
            Price: ₹{data.baseRate}/ per day
          </div>

          <div className="border rounded-2xl mt-4 mb-4">
            <div style={{ display: "flex" }}>
              <div className="py-3 px-4">
                <label>Check in:</label>
 
                
                <DatePicker
  className={`rounded border custom-border-thick font-semibold mt-3 h-8 `}
  selected={checkInDate}
  onChange={handleCheckInDateChange}
  dateFormat="dd/MM/yyyy"
  minDate={new Date()}
  excludeDates={disabledDates}
/>
{inDateError&& <span className="text-red-600">Choose checkin date</span>}


              </div>
              <div
                className="py-3 px-4"
                style={{ borderLeft: "2px solid #dee2e6" }}
              >
                <label>Check out:</label>


                <DatePicker className="rounded border font-semibold  mt-3 h-8" selected={checkOutDate} 
                onChange={handleCheckOutDateChange}
                dateFormat="dd/MM/yyyy"

                minDate={checkInDate ? new Date(checkInDate.getTime() + 86400000) : null}
                maxDate={maxCheckOutDate?maxCheckOutDate:sixMonthCheckOutDate}
                excludeDates={disabledDates}
                disabled={!checkInDate}
                 />
                 {outDateError&& <span className="text-red-600">Choose checkout date</span>}

              </div>
            </div>

            <div
              className="py-3 px-4 "
              style={{
                borderTop: "2px solid #dee2e6",
                paddingLeft: "1rem",
                paddingRight: "1rem",
              }}
            >
              <Stepper
                label="Guest"
                description="Extra guests"
                min={1}
                onChange={handleGuest}
                value={guest}
                defaultValue={1}
                max={data.maxGuest}
              />
            </div>
          </div>
          <div>
            <p className="mb-3">
              <span style={{ fontWeight: "600" }}>Number of Nights : </span>
              {numOfNights}
            </p>
            <p className="mb-3">
              <span style={{ fontWeight: "600" }}>Number of Guests : </span>
              {guest}
            </p>
            <p className="mb-3">
              <span style={{ fontWeight: "600" }}>Cruise Fee :  ₹</span>
             { fee}{" "}
            </p>
            <p className="mb-3">
              <span style={{ fontWeight: "600" }}>Tax :  ₹</span>
              {tax}{" "}
            </p>
          </div>
          <div>
            <p>
              <span style={{ fontWeight: "600" }}>Total Amount: ₹ </span>{" "}
              {totalAmount}{" "}
            </p>
          </div>
          <button className="primary mt-4" onClick={handleBook}>
            Reserve Your Cruise
          </button>
        </div>
      </div>
 
      <h4 className="border-t py-3" >What this place offers</h4>
     

      <Facilities data={data}/> 
{/* {      
  data?.review.length > 0 ? data.review.map((review) => review.userId.name) : []
} */}

      <h4 className="border-t-2 mt-3 py-3 ">Customer Reviews  <Rating className="ms-3 items-center me-2" name="read-only" value={calculateAverageRating(data.review)} readOnly /><span className="text-lg">({data.review.length})</span> </h4>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {data.review?.map((review, index) => (
            
            <div 
              key={review._id}
              className="bg-white shadow  p-4 rounded-lg"
            >
              <div className="text-lg flex justify-between font-semibold mb-3"><div className="flex gap-2"><img className="w-8 h-8 rounded-full" src={review.userId.image} alt="" /> {review.userId.name}</div>
              <Rating name="read-only" value={review.ratings} readOnly /></div>
              <div className="flex justify-between  text-gray-700"><div>{review.feedback}</div> <span className="text-xs">{dateConvert(review.created)}</span></div>
            </div>
          ))}
        </div>

      </>
      ):(<div className="items-center h-screen">
        <Loading/>
      </div>
    )}


    </div>
  );
}

export default CruiseSingle;

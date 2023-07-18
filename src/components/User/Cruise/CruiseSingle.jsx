import React, { useEffect, useState, lazy, Suspense } from "react";
import {  useNavigate, useParams } from "react-router-dom";
import "./CruiseSingle.css";

import AccessTimeIcon from "@mui/icons-material/AccessTime";
import TransferWithinAStationIcon from "@mui/icons-material/TransferWithinAStation";
import BedroomParentIcon from "@mui/icons-material/BedroomParent";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import PetsIcon from "@mui/icons-material/Pets";
import CasinoIcon from "@mui/icons-material/Casino";
import CelebrationIcon from "@mui/icons-material/Celebration";
import PhishingIcon from "@mui/icons-material/Phishing";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import WifiIcon from "@mui/icons-material/Wifi";
import PersonalVideoIcon from "@mui/icons-material/PersonalVideo";
import  DatePicker  from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css'
import { parseISO, startOfDay, isSameDay } from 'date-fns';

import "@mobiscroll/react/dist/css/mobiscroll.min.css";
import { Stepper } from "@mobiscroll/react";

import { baseApi } from "../../../store/Api";

import "react-responsive-carousel/lib/styles/carousel.min.css";

import axios from "axios";


const DetailViewGallery = lazy(() => import("./DetailViewGallery"));


const greenTick = () => <CheckIcon style={{ color: "green" }} />;
const redTick = () => <ClearIcon style={{ color: "red" }} />;

function CruiseSingle() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    if (!id) {return;}

    axios.get(`${baseApi}single-view/${id}`).then((res) => {
      setLoading(false)
      setData(res.data.cruiseData);
      
    //  localStorage.clear();
    });
  }, [id]);
  const [data, setData] = useState([]);
  const [extraGuest, setExtraGuest] = useState(0);
  const [inDateError, setInDateError] = useState(false);
  const [outDateError, setOutDateError] = useState(false);


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
  axios.get(`${baseApi}booked-dates?id=${id}`,{withCredentials:true}).then((res)=>{
      setBookedDates(res.data)
     
  }).catch((err)=>console.log(err))
},[id])

const disabledDates = [];


bookedDates.forEach((dates, index) => {
  const startDate = startOfDay(parseISO(dates.checkIn));
  const endDate = startOfDay(parseISO(dates.checkOut));
  console.log(startDate,"ssssssstttttt",endDate);

  let currentDate = startDate;
  while (currentDate <= endDate) {
    // if (isSameDay(currentDate, startDate)) {
      disabledDates.push(new Date(currentDate));

    // }
    currentDate = new Date(currentDate.setDate(currentDate.getDate() + 1));
  }
});

console.log(disabledDates);



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
    cruiseName: data.name,
    cruiseImg: data.Images,
    cruisePlace: data.boarding,
    baseRate: data.baseRate,
    extraGuest,
  };



  const handleBook = () => {
    if (!checkInDate) setInDateError(true);

    if (!checkOutDate) setOutDateError(true);
console.log(checkInDate,"hb1",checkOutDate);
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
      setTotalAmount(
        pricePerNight * numOfNights + extraGuest * numOfNights * extraRate
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
      <div className="chck-grid-single" style={{ gap: 100 }}>
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
            Price: ₹{data.baseRate}/ per night
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
      <hr />
      <h4>What this place offers</h4>
      <br />
      {data.Facilities && data.Facilities.length > 0 ? (
        <div className="chck-grid-single">
          <div className="chck-grid-single__facility">
            <p>
              <AcUnitIcon className="chck-grid-single__facility-icon" /> AC:{" "}
              {data.Facilities[0].AC ? greenTick() : redTick()}
            </p>
            <p>
              <PersonalVideoIcon className="chck-grid-single__facility-icon" />{" "}
              TV: {data.Facilities[0].AC ? greenTick() : redTick()}
            </p>
            <p>
              <WifiIcon className="chck-grid-single__facility-icon" /> Wi-Fi:{" "}
              {data.Facilities[0].AC ? greenTick() : redTick()}
            </p>
            <p>
              <PhishingIcon className="chck-grid-single__facility-icon" />{" "}
              Fishing: {data.Facilities[0].AC ? greenTick() : redTick()}
            </p>
          </div>
          <div className="chck-grid-single__facility">
            <p>
              <FastfoodIcon className="chck-grid-single__facility-icon" /> Food:{" "}
              {data.Facilities[0].AC ? greenTick() : redTick()}
            </p>
            <p>
              <PetsIcon className="chck-grid-single__facility-icon" /> Pets:{" "}
              {data.Facilities[0].AC ? greenTick() : redTick()}
            </p>
            <p>
              <CelebrationIcon className="chck-grid-single__facility-icon" />{" "}
              Party Hall: {data.Facilities[0].AC ? greenTick() : redTick()}
            </p>
            <p>
              <CasinoIcon className="chck-grid-single__facility-icon" /> Games:{" "}
              {data.Facilities[0].AC ? greenTick() : redTick()}
            </p>
          </div>
        </div>
      ) : null}
      </>
      ):(<div className="flex flex-col items-center">
      <img className="w-52" src="https://raw.githubusercontent.com/spagnuolocarmine/spagnuolocarmine/main/sail.gif" alt="" />
      <h5 className="text-center">loading....</h5>
    </div>
    )}


    </div>
  );
}

export default CruiseSingle;

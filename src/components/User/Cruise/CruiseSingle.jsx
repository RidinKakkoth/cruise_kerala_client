import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import "./CruiseSingle.css";

import GridViewIcon from "@mui/icons-material/GridView";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LocationOnIcon from "@mui/icons-material/LocationOn";
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

import "@mobiscroll/react/dist/css/mobiscroll.min.css";
import { Stepper, toast } from "@mobiscroll/react";

import { baseApi } from "../../../store/Api";

import "react-responsive-carousel/lib/styles/carousel.min.css";

import { Button } from "@mui/material";
import axios from "axios";

const greenTick = () => <CheckIcon style={{ color: "green" }} />;
const redTick = () => <ClearIcon style={{ color: "red" }} />;

function CruiseSingle() {
  const { id } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    if (!id) {return;}

    axios.get(`${baseApi}single-view/${id}`).then((res) => {
      setData(res.data.cruiseData);
      localStorage.clear();
    });
  }, [id]);
  const [data, setData] = useState([]);
  // const [numOfNights, setNumOfNights] = useState(0);
  const [extraGuest, setExtraGuest] = useState(0);
  // const [totalAmount, setTotalAmount] = useState(0);
  const [inDateError, setInDateError] = useState(false);
  const [outDateError, setOutDateError] = useState(false);

  const [checkInDate, setCheckInDate] = useState(() => {
    const checkIn = localStorage.getItem("checkInDate");
    return checkIn ? JSON.parse(checkIn) : "";
  });
  const [checkOutDate, setCheckOutDate] = useState(() => {
    const checkOut = localStorage.getItem("checkOutDate");
    return checkOut ? JSON.parse(checkOut) : "";
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
  

  useEffect(() => {
    localStorage.setItem("checkInDate", JSON.stringify(checkInDate));
    localStorage.setItem("checkOutDate", JSON.stringify(checkOutDate));
    localStorage.setItem("guest", JSON.stringify(guest));
    localStorage.setItem("nights", JSON.stringify(numOfNights));
    localStorage.setItem("total", JSON.stringify(totalAmount));
  }, [checkInDate,checkOutDate,guest,numOfNights,totalAmount]);


  const obj = {
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

    checkInDate &&
      checkOutDate &&
      navigate("/checkout", { state: { data: obj } });
  };

  const handleCheckInDateChange = (event) => {
    setCheckInDate(event.target.value);
    setCheckOutDate("");
    setInDateError(false);
    calculateNumOfNights(event.target.value, checkOutDate);
  };

  const handleCheckOutDateChange = (event) => {
    setCheckOutDate(event.target.value);
    calculateNumOfNights(checkInDate, event.target.value);
    setOutDateError(false);
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


  const getNextDayDate = (date) => {
    const nextDay = new Date(date);
    nextDay.setDate(nextDay.getDate() + 1);
    return nextDay.toISOString().split("T")[0];
  };
  const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split("T")[0];
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
  

  const [showall, setShowall] = useState(false);

  const handleClick = () => {
    setShowall(true);
  };

  if (showall) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 10,
          marginTop: "100px",
          marginBottom: "50px",
        }}
      >
        <Button
          onClick={() => {
            navigate(0);
          }}
          style={{ width: "80px", marginLeft: "410px", borderRadius: "20px" }}
          variant="outlined"
          startIcon={<ArrowBackIcon />}
        >
          Back
        </Button>
        {data.Images.map((img, index) => {
          return (
            <img
              width={700}
              style={{ alignSelf: "center" }}
              key={index}
              src={`${baseApi}files/${img}`}
              alt=""
            />
          );
        })}
      </div>
    );
  }

  return (
    <div className="single-view-main container">
      <h3 className="cruise-head">{data.name}</h3>
      <div style={{ display: "flex" }}>
        <LocationOnIcon style={{ color: "green" }} />
        <p style={{ fontWeight: "500", marginBottom: 20 }}>
          {data.boarding},{data.district}
        </p>
      </div>
      <div style={{ position: "relative" }}>
        {data.Images && data.Images.length > 0 ? (
          <div
            onClick={handleClick}
            className="img-div-single"
            style={{ display: "grid", gap: 4, cursor: "pointer" }}
          >
            <div>
              <img
                style={{
                  borderTopLeftRadius: "10px",
                  borderBottomLeftRadius: "10px",
                  height: "100%",
                }}
                id="img-single-view"
                src={`${baseApi}files/${data.Images[0]}`}
                alt="Banner 1"
              />
            </div>
            <div style={{ display: "grid", gap: 4 }}>
              <img
                id="img-single-view"
                style={{ borderTopRightRadius: "10px" }}
                src={`${baseApi}files/${data.Images[1]}`}
                alt="Banner 1"
              />
              <img
                id="img-single-view"
                src={`${baseApi}files/${data.Images[2]}`}
                alt="Banner 1"
              />
              <img
                id="img-single-view"
                style={{ borderBottomRightRadius: "10px" }}
                src={`${baseApi}files/${data.Images[3]}`}
                alt="Banner 1"
              />
              <button onClick={handleClick} className="btn-show-all">
                <GridViewIcon /> Show all photos
              </button>
            </div>
          </div>
        ) : null}
      </div>
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
                <input
                  style={
                    inDateError
                      ? { borderStyle: "none", fontWeight: "600", color: "red" }
                      : { borderStyle: "none", fontWeight: "600" }
                  }
                  value={checkInDate}
                  required
                  onChange={handleCheckInDateChange}
                  min={getTomorrowDate()}
                  type="date"
                />
              </div>
              <div
                className="py-3 px-4"
                style={{ borderLeft: "2px solid #dee2e6" }}
              >
                <label>Check out:</label>
                <input
                  style={
                    outDateError
                      ? { borderStyle: "none", fontWeight: "600", color: "red" }
                      : { borderStyle: "none", fontWeight: "600" }
                  }
                  value={checkOutDate}
                  required
                  onChange={handleCheckOutDateChange}
                  min={checkInDate ? getNextDayDate(checkInDate) : ""}
                  disabled={!checkInDate}
                  type="date"
                />
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
            Book Your Cruise
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
    </div>
  );
}

export default CruiseSingle;

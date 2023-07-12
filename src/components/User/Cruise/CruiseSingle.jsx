import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./CruiseSingle.css";

import GridViewIcon from '@mui/icons-material/GridView';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import TransferWithinAStationIcon from '@mui/icons-material/TransferWithinAStation';
import BedroomParentIcon from '@mui/icons-material/BedroomParent';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import PetsIcon from '@mui/icons-material/Pets';
import CasinoIcon from '@mui/icons-material/Casino';
import CelebrationIcon from '@mui/icons-material/Celebration';
import PhishingIcon from '@mui/icons-material/Phishing';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import WifiIcon from '@mui/icons-material/Wifi';
import PersonalVideoIcon from '@mui/icons-material/PersonalVideo';


import { baseApi } from "../../../store/Api";

import "react-responsive-carousel/lib/styles/carousel.min.css";

import { Button } from "@mui/material";

const greenTick = () => <CheckIcon style={{ color: "green" }} />;
const redTick = () => <ClearIcon style={{ color: "red" }} />;

function CruiseSingle() {
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state;

  const [showall, setShowall] = useState(false);

  const handleClick = () => {
    setShowall(true);
  };

  if (showall) {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: "50px" }}>
        <Button onClick={() => { navigate(0) }} style={{ width: "80px", marginLeft: "410px", borderRadius: "20px" }} variant="outlined" startIcon={<ArrowBackIcon />}>
          Back
        </Button>
        {data.Images.map((img, index) => {
          return <img width={700} style={{ alignSelf: "center" }} key={index} src={`${baseApi}files/${img}`} alt="" />;
        })}
      </div>
    );
  }

  return (
    <div className="single-view-main container">
      <h3 className="cruise-head">{data.name}</h3>
      <div style={{ display: "flex" }}>
        <LocationOnIcon style={{ color: "green" }} />
        <p style={{ fontWeight: "500", marginBottom: 20 }}>{data.boarding},{data.district}</p>
      </div>
      <div style={{ position: "relative" }}>
        <div onClick={handleClick} className="img-div-single" style={{ display: "grid", gap: 4, cursor: "pointer" }}>
          <div>
            <img
              style={{ borderTopLeftRadius: "10px", borderBottomLeftRadius: "10px" }}
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
              <GridViewIcon />  Show all photos
            </button>
          </div>
          
        </div>
      </div>
      <hr />
      <div className="chck-grid-single" style={{gap:100}} >
        <div className="chck-grid-single__details" >
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
            Check-In time: <span className="chck-grid-single__value">12 PM</span>
          </p>
          <p className="chck-grid-single__label">
            <AccessTimeIcon className="chck-grid-single__icon" />
            Check-Out time: <span className="chck-grid-single__value">12 PM</span>
          </p>
        </div>
        <div className="bg-white shadow p-4 rounded-2xl" style={{ borderRadius: "20px" }}>
          <div id="head-price" className=" text-center">
            Price: ₹{data.baseRate}/ per night
          </div>
          <div className="border rounded-2xl mt-4">
            <div style={{ display: "flex" }}>
              <div className="py-3 px-4">
                <label>Check in:</label>
                <input style={{borderStyle:"none",fontWeight:"600"}} type="date" />
              </div>
              <div className="py-3 px-4 " style={{ borderLeft: "2px solid #dee2e6" }}>
                <label>Check out:</label>
                <input style={{borderStyle:"none",fontWeight:"600"}} type="date" />
              </div>
            </div>
            <div className="py-3 px-4 " style={{ borderTop: "2px solid #dee2e6", paddingLeft: "1rem", paddingRight: "1rem" }}>
              <label>No of guests:</label>
              <input type="number" value="1" />
            </div>
          </div>
          <button className="primary mt-4" >Book Your Cruise</button>
        </div>

      </div>
      <hr />
      <h4>What this place offers</h4>
      <br />
      <div className="chck-grid-single">
        <div className="chck-grid-single__facility">
          <p>
            <AcUnitIcon className="chck-grid-single__facility-icon" /> AC: {data.Facilities[0].AC ? greenTick() : redTick()}
          </p>
          <p>
            <PersonalVideoIcon className="chck-grid-single__facility-icon" /> TV: {data.Facilities[0].AC ? greenTick() : redTick()}
          </p>
          <p>
            <WifiIcon className="chck-grid-single__facility-icon" /> Wi-Fi: {data.Facilities[0].AC ? greenTick() : redTick()}
          </p>
          <p>
            <PhishingIcon className="chck-grid-single__facility-icon" /> Fishing: {data.Facilities[0].AC ? greenTick() : redTick()}
          </p>
        </div>
        <div className="chck-grid-single__facility">
          <p>
            <FastfoodIcon className="chck-grid-single__facility-icon" /> Food: {data.Facilities[0].AC ? greenTick() : redTick()}
          </p>
          <p>
            <PetsIcon className="chck-grid-single__facility-icon" /> Pets: {data.Facilities[0].AC ? greenTick() : redTick()}
          </p>
          <p>
            <CelebrationIcon className="chck-grid-single__facility-icon" /> Party Hall: {data.Facilities[0].AC ? greenTick() : redTick()}
          </p>
          <p>
            <CasinoIcon className="chck-grid-single__facility-icon" /> Games: {data.Facilities[0].AC ? greenTick() : redTick()}
          </p>
        </div>
      </div>
    </div>
  );
}

export default CruiseSingle;

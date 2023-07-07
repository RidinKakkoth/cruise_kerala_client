import React, { useEffect, useState } from 'react'
import "./CruisesTable.css"
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import ToggleOffIcon from '@mui/icons-material/ToggleOff';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import VerifiedIcon from '@mui/icons-material/Verified';
import GppMaybeIcon from '@mui/icons-material/GppMaybe';
import SailingIcon from '@mui/icons-material/Sailing';
import RemoveModeratorIcon from '@mui/icons-material/RemoveModerator';


import LazyLoad from 'react-lazy-load';

import { useNavigate } from 'react-router-dom'
import { TabView, TabPanel } from 'primereact/tabview';
import axios from 'axios';
import { baseApi, partnerApi } from '../../../store/Api';
import { Button } from '@mui/material';


const GreenCheckIcon = () => {
  return <CheckIcon style={{ color:"green" }} />;
};
const RedCloseIcon = () => {
  return <CloseIcon style={{ color:"red" }} />;
};

function CruisesTable() {

  const[cruiseData,setCruiseData]=useState([])
  const[trigger,setTrigger]=useState(false)


const navigate=useNavigate()

const handleClick=()=>{
  navigate('/partner/add-cruise')
}



useEffect(()=>{
  axios.get(`${partnerApi}cruise-data`,{withCredentials:true}).then((response)=>{

    const data=response.data.cruiseData
    setCruiseData(data)

  }).catch((error)=>{
    console.log(error);
  })
},[trigger])

const handleBlock = (id) => {
  console.log(id);

  axios.patch(`${partnerApi}blockCruise?id=${id}`,{withCredentials:true}).then((res)=>{

    setTrigger(!trigger)


    }).catch((error)=>{console.log(error);})
};


  return (
    <div>
      <Button variant="contained" onClick={handleClick} style={{marginTop:"20px"}} endIcon={<SailingIcon />}>
        Add Cruise
      </Button>

          
    {cruiseData? <div className="tabview-demo">
    {
  cruiseData?.map((obj, index) => (
   
    <div key={index} className="card" id='cruise-table-card' style={{ marginBottom: "20px" }}>
      <h5 style={{ marginTop: "20px", marginLeft: "20px",fontWeight:"700",color:"#0064ff" }}>{obj.name}</h5>
      <TabView className="tabview-custom">
        <TabPanel header="CRUISE DATA" >
          <p>Name: {obj.name}</p>
          <p>Category: {obj.category}</p>
          <p>Boarding: {obj.boarding}</p>
          <p>Description: {obj.description}</p>
        </TabPanel>
        <TabPanel header="PRICE & FACILITIES" >
          <p>Rooms: {obj.rooms}</p>
          <p>Base Rate: {obj.baseRate}</p>
          <p>Add-Rate: {obj.extraRate}</p>
          <p>Max-Guest: {obj.maxGuest}</p>

           <div style={{ display: 'flex', gap: '75px' }}>
    <p>AC: {obj.Facilities[0].AC ? <GreenCheckIcon  /> : <RedCloseIcon />}</p>
    <p>Food: {obj.Facilities[0].food ? <GreenCheckIcon  /> : <RedCloseIcon />}</p>
    <p>Pets: {obj.Facilities[0].pets ? <GreenCheckIcon  /> : <RedCloseIcon />}</p>
    <p>Party Hall: {obj.Facilities[0].partyHall ? <GreenCheckIcon  /> : <RedCloseIcon />}</p>
    <p>Fishing: {obj.Facilities[0].fishing ? <GreenCheckIcon  /> : <RedCloseIcon />}</p>
    <p>Games: {obj.Facilities[0].games ? <GreenCheckIcon  /> : <RedCloseIcon />}</p>
    <p>Wi-Fi: {obj.Facilities[0].wifi ? <GreenCheckIcon  /> : <RedCloseIcon />}</p>
    <p>TV: {obj.Facilities[0].TV ? <GreenCheckIcon  /> : <RedCloseIcon />}</p>
  </div>
        </TabPanel>

        <TabPanel id="posters" header="PHOTOS" style={{ display: 'flex', gap: '20px' }}>
  <div className="cruise-map-img-container">
    {obj.Images.map((img, index) => (
      <React.Fragment key={index}>
        <div className="cruie-map-img-div">
          <LazyLoad>
<img      id="cruise-map-img"
            src={`${baseApi}files/${img}`}
            alt="cruise" />

          </LazyLoad>
        
        </div>
      </React.Fragment>
    ))}
  </div>
</TabPanel>


        <TabPanel header="SETTINGS"  >
          <p>Block Status : {obj.isBlocked? <ToggleOnIcon onClick={()=>{handleBlock(obj._id)}} checked={obj.isBlocked}  style={{color:"red",fontSize:"2rem"}} /> :<ToggleOffIcon onClick={()=>{handleBlock(obj._id)}} checked={obj.isBlocked} style={{fontSize:"2rem"}} />}</p>
          <p>
  Verification:{" "}
  {obj.isApproved === "verified" ? (
    <React.Fragment>
      <VerifiedIcon style={{ color: "green" }} />
    </React.Fragment>
  ) : obj.isApproved === "pending" ? (
    <React.Fragment>
      <GppMaybeIcon style={{ color: "yellow" }} /> 
      
    </React.Fragment>
  ) : obj.isApproved === "rejected" ? (
    <React.Fragment>
      <RemoveModeratorIcon style={{ color: "red" }} />
    </React.Fragment>
  ) : null}
</p>

        </TabPanel>
      </TabView>
    </div>


  ))
}

    </div>
    :<div style={{display:"flex",marginLeft:"30rem",justifyContent:"center",alignItems:"center"}}>
  <img style={{width:"150px",height:"150px"}} src="https://upload.wikimedia.org/wikipedia/commons/c/c7/Loading_2.gif?20170503175831" alt="" />

</div>}



    </div>
  )
}

export default CruisesTable






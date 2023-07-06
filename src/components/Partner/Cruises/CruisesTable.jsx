import React, { useEffect, useState } from 'react'
import "./CruisesTable.css"
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

import { useNavigate } from 'react-router-dom'
import { TabView, TabPanel } from 'primereact/tabview';
import axios from 'axios';
import { partnerApi } from '../../../store/Api';

const GreenCheckIcon = () => {
  return <CheckIcon style={{ color:"green" }} />;
};
const RedCloseIcon = () => {
  return <CheckIcon style={{ color:"red" }} />;
};

function CruisesTable() {

  const[cruiseData,setCruiseData]=useState([])

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
})

// const facilityNameMap = {
//   AC: 'AC',
//   food: 'Food',
//   pets: 'Pets',
//   partyHall: 'Party Hall',
//   fishing: 'Fishing',
//   games: 'Games',
//   wifi: 'Wi-Fi',
//   TV: 'TV',
// };


  return (
    <div>

    <div>
      <button onClick={handleClick}>AddCruises</button>
    </div>
    <div className="tabview-demo">
        
            
    {
  cruiseData?.map((obj, index) => (
    <div key={index} className="card" style={{ marginBottom: "20px" }}>
      <h5 style={{ marginTop: "20px", marginLeft: "20px" }}>{obj.name}</h5>
      <TabView className="tabview-custom">
        <TabPanel header="CRUISE DATA" leftIcon="pi pi-calendar">
          <p>Name: {obj.name}</p>
          <p>Category: {obj.category}</p>
          <p>Boarding: {obj.boarding}</p>
          <p>Description: {obj.description}</p>
        </TabPanel>
        <TabPanel header="PRICE & FACILITIES" rightIcon="pi pi-user">
          <p>Rooms: {obj.rooms}</p>
          <p>Base Rate: {obj.baseRate}</p>
          <p>Add-Rate: {obj.extraRate}</p>
          <p>Max-Guest: {obj.maxGuest}</p>
          {/* <div style={{ display: 'flex', gap: '75px' }}>
            {Object.entries(obj.Facilities[0]).map(([facility, value]) => (
              <p >
                {facilityNameMap[facility]}: {value ? <CheckIcon style={{color:"green"}} /> : <CloseIcon style={{color:"red"}} />}
              </p>
            ))}
          </div> */}
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
        <TabPanel header="PHOTOS" leftIcon="pi pi-search" rightIcon="pi pi-cog"></TabPanel>
        <TabPanel header="SETTINGS" leftIcon="pi pi-search" rightIcon="pi pi-cog">
          <p>Name: {obj.name}</p>
          <p>Category: {obj.category}</p>
          <p>Boarding: {obj.boarding}</p>
          <p>Description: {obj.description}</p>
        </TabPanel>
      </TabView>
    </div>
  ))
}

    </div>
    </div>
  )
}

export default CruisesTable






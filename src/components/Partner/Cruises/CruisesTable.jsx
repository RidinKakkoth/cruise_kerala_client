import React, { useEffect } from 'react'
import "./CruisesTable.css"

import { useNavigate } from 'react-router-dom'
import { TabView, TabPanel } from 'primereact/tabview';
import axios from 'axios';
import { partnerApi } from '../../../store/Api';


function CruisesTable() {

const navigate=useNavigate()

const handleClick=()=>{
  navigate('/partner/add-cruise')
}

useEffect(()=>{
  axios.get(`${partnerApi}cruise-data`,{withCredentials:true}).then((response)=>{

  }).catch((error)=>{
    console.log(error);
  })
})



  return (
    <div>

    <div>
      <button onClick={handleClick}>AddCruises</button>
    </div>
    <div className="tabview-demo">
        
            
        <div className="card">
            <h5 style={{marginTop:"20px",marginLeft:"20px"}}>Custom Headers</h5>
            <TabView className="tabview-custom">
                <TabPanel header="CRUISE DATA"  leftIcon="pi pi-calendar">
                    < p>Name:{}</p> 
                    < p>Category:{}</p> 
                    < p>Boarding:{}</p> 
                    < p>Description:{}</p> 
                </TabPanel>
                <TabPanel header="PRICE & FACILITIES" rightIcon="pi pi-user">
                    < p>Base Rate:{}</p> 
                    < p>Rooms:{}</p> 
                    < p>Add-Rate:{}</p> 
                    < p>Max-Guest:{}</p> 
                    <div style={{display:'flex',gap:"75px"}}> 
                      <p>AC:{}</p>      <p>Food:{}</p>       <p>Pets:{} </p>    <p>Party Hall:{}</p>  
                      <p>Fishing:{}</p>    <p>Games:{}</p>    <p>Wi-Fi:{}</p>   <p>TV:{}</p>  
                    </div>

                    </TabPanel>
                <TabPanel header="PHOTOS" leftIcon="pi pi-search" rightIcon="pi pi-cog">

                </TabPanel>
                <TabPanel header="SETTINGS" leftIcon="pi pi-search" rightIcon="pi pi-cog">
                    < p>Name:{}</p> 
                    < p>Category:{}</p> 
                    < p>Boarding:{}</p> 
                    < p>Description:{}</p> 
                </TabPanel>
            </TabView>
        </div>
    </div>
    </div>
  )
}

export default CruisesTable






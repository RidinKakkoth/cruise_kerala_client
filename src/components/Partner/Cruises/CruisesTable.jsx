import React, { useEffect, useState } from 'react';
import "./CruisesTable.css";
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import ToggleOffIcon from '@mui/icons-material/ToggleOff';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import VerifiedIcon from '@mui/icons-material/Verified';
import GppMaybeIcon from '@mui/icons-material/GppMaybe';
import SailingIcon from '@mui/icons-material/Sailing';
import RemoveModeratorIcon from '@mui/icons-material/RemoveModerator';
import { ToastContainer, toast } from 'react-toastify';
import LazyLoad from 'react-lazy-load';
import { useNavigate } from 'react-router-dom';
import { TabView, TabPanel } from 'primereact/tabview';
import { Button } from '@mui/material';
import Loading from '../../Shared/Loading'
import { blockCruise, getCruiseData } from '../../../config/PartnerEndpoints';


const GreenCheckIcon = () => {
  return <CheckIcon style={{ color: "green" }} />;
};

const RedCloseIcon = () => {
  return <CloseIcon style={{ color: "red" }} />;
};

function CruisesTable() {
  const [cruiseData, setCruiseData] = useState([]);
  const [trigger, setTrigger] = useState(false);
  const [loading, setLoading] = useState(true);


  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/partner/add-cruise');
    // navigate('/partner/add-cruise');
  };

  useEffect(() => {

    async function invoke(){
     const data=await getCruiseData()
     setLoading(false)
     if(data.cruiseData.length>0)
     setCruiseData(data?.cruiseData
      
      );
    }
    invoke()
   }, [trigger]);

    const handleCruiseEdit = (cruiseId) => {
      navigate(`/partner/edit-cruise?id=${cruiseId}`);
    };
   
 

   const handleBlock =async (id) => {

    const data=await blockCruise(id)
    if(data){    
      setTrigger(!trigger); 
          toast.success('Success', { position: 'top-center' });
    }
  };

  return (
    <div className=''>
            <Button
              variant="contained"
              onClick={handleClick}
              style={{ marginTop: "20px",marginBottom:"20px" }}
              endIcon={<SailingIcon />}
            >
              Add Cruise
            </Button>
           { console.log(cruiseData,"czzzzzzzzzzz")}
      {!loading ? (
        <div className="tabview-demo">
          <div className="">
            <ToastContainer autoClose={1000} />
            {cruiseData?.map((obj, index) => (
              <div key={index} className="card w-[100vw]" id="cruise-table-card" style={{ marginBottom: "20px" }}>
                <h5 style={{ marginTop: "20px", marginLeft: "20px", fontWeight: "700", color: "#0064ff" }}>{obj.name}</h5>
                <TabView className="tabview-custom ">
                  <TabPanel header="CRUISE DATA">
                    <p>Name: {obj.name}</p>
                    {console.log(obj,"ooooooooo")}
                    <p>Category: {obj.category.name}</p>
                    <p>Boarding: {obj.boarding}</p>
                    <p>Description: {obj.description}</p>
                  </TabPanel>
                  <TabPanel header="PRICE & FACILITIES">
                    <p>Rooms: {obj.rooms}</p>
                    <p>Base Rate: {obj.baseRate}</p>
                    <p>Add-Rate: {obj.extraRate}</p>
                    <p>Max-Guest: {obj.maxGuest}</p>
                    <div style={{ display: 'flex', gap: '75px' }}>
                      <p>AC: {obj.Facilities[0].AC ? <GreenCheckIcon /> : <RedCloseIcon />}</p>
                      <p>Food: {obj.Facilities[0].food ? <GreenCheckIcon /> : <RedCloseIcon />}</p>
                      <p>Pets: {obj.Facilities[0].Pets ? <GreenCheckIcon /> : <RedCloseIcon />}</p>
                      <p>Party Hall: {obj.Facilities[0].partyHall ? <GreenCheckIcon /> : <RedCloseIcon />}</p>
                      <p>Fishing: {obj.Facilities[0].fishing ? <GreenCheckIcon /> : <RedCloseIcon />}</p>
                      <p>Games: {obj.Facilities[0].games ? <GreenCheckIcon /> : <RedCloseIcon />}</p>
                      <p>Wi-Fi: {obj.Facilities[0].wifi ? <GreenCheckIcon /> : <RedCloseIcon />}</p>
                      <p>TV: {obj.Facilities[0].TV ? <GreenCheckIcon /> : <RedCloseIcon />}</p>
                    </div>
                  </TabPanel>
                  <TabPanel id="posters" className="" header="PHOTOS" style={{ display: 'flex', gap: '20px' }}>
                    <div className="cruise-map-img">
                      {obj.Images.map((img, index) => (
                        <React.Fragment key={index}>
                          <div className="cruie-map-img-div">
                            <LazyLoad>
                              <img
                                id="cruise-map-img"
                                src={img}
                                alt="cruise"
                              />
                            </LazyLoad>
                          </div>
                        </React.Fragment>
                      ))}
                    </div>
                  </TabPanel>
                  <TabPanel header="SETTINGS" className="w-[100%]">
                    <p  className='flex gap-2 mb-2'>Edit Cruise data :<span onClick={()=>{handleCruiseEdit(obj._id)}} className='cursor-pointer'><svg  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="blue" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
</svg> </span>
</p>
                    <p>Block Status: {obj.isBlocked ? <ToggleOnIcon  onClick={() => { handleBlock(obj._id) }} checked={obj.isBlocked} style={{ color: "red", fontSize: "2rem",cursor:"pointer" }} /> : <ToggleOffIcon onClick={() => { handleBlock(obj._id) }} checked={obj.isBlocked} style={{ fontSize: "2rem",cursor:"pointer" }} />}</p>
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
            ))}
          </div>
        </div>
      ) : (
        
      <div className='flex justify-center mt-56'>
         <Loading/>
      </div>

      )}
    </div>
  );
}

export default CruisesTable;

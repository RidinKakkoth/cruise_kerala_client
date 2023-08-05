// export default CruisesTable;
import React, { useEffect, useState } from 'react';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import "./CruisesTable.css";
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import ToggleOffIcon from '@mui/icons-material/ToggleOff';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import VerifiedIcon from '@mui/icons-material/Verified';
import GppMaybeIcon from '@mui/icons-material/GppMaybe';
import RemoveModeratorIcon from '@mui/icons-material/RemoveModerator';
import { ToastContainer, toast } from 'react-toastify';
import LazyLoad from 'react-lazy-load';
import { useNavigate } from 'react-router-dom';
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
  const [verified, setVerified] = useState(false);

  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/partner/add-cruise');
  };

  useEffect(() => {
    async function invoke() {
      const data = await getCruiseData();
      data?.partner?.isApproved === "verified" ? setVerified(true) : setVerified(false);
      setLoading(false);
      if (data?.cruiseData?.length > 0) {
        setCruiseData(data?.cruiseData);
      }
    }
    invoke();
  }, [trigger]);

  const handleCruiseEdit = (cruiseId) => {
    navigate(`/partner/edit-cruise?id=${cruiseId}`);
  };

  const handleBlock = async (id) => {
    const data = await blockCruise(id);
    if (data) {
      setTrigger(!trigger);
      toast.success('Success', { position: 'top-center' });
    }
  };

  return (
    <div className='bg-white'>
      {!loading ? (
        <div className="tabview-demos">
          {verified ? (
            <button
              variant="contained"
              onClick={handleClick}
              className="mt-4 mb-8 px-6 py-2 bg-blue-400 text-white hover:bg-blue-500 rounded-3xl ms-2"
          
            >
              Add Cruise
            </button>
          ) : (
            <h4 className='text-red-500 font-semibold italic mt-10'>
              Need to be verified to add your cruise
            </h4>
          )}
          <div className="bg-white p-3 ">
            <ToastContainer autoClose={1000} />
            {cruiseData?.map((obj, index) => (
              <div
                key={index}
                className="w-[100%] rounded-lg  bg-gray-100 shadow mb-8 px-2 overflow-hidden"
              >
                <h5 className="text-2xl font-semibold mb-3 p-2">
                  {obj.name}
                </h5>
                <Tabs className="tabview-customs shadow-md bg-white rounded px-3 py-2 mb-2">
                  <TabList className="flex space-x-4 border-b-2 py-2">
                    <Tab className="text-gray-500 cursor-pointer font-medium  px-2">
                      CRUISE DATA
                    </Tab>
                    <Tab className="text-gray-500 cursor-pointer font-medium px-2">
                      PRICE & FACILITIES
                    </Tab>
                    <Tab className="text-gray-500 cursor-pointer font-medium px-2">PHOTOS</Tab>
                    <Tab className="text-gray-500 cursor-pointer font-medium px-2">
                      SETTINGS
                    </Tab>
                  </TabList>

                  <TabPanel >
                    <p className='text-gray-600'><span className='text-gray-800 font-medium me-2'>Name:</span> {obj.name}</p>
                    <p className='text-gray-600'><span className='text-gray-800 font-medium me-2'>Category:</span> {obj.category.name}</p>
                    <p className='text-gray-600'><span className='text-gray-800 font-medium me-2'>Boarding:</span> {obj.boarding}</p>
                    <p className='flex-wrap text-gray-600'><span className='text-gray-800 font-medium me-2'>Description:</span> {obj.description}</p>
                  </TabPanel>

                  <TabPanel>
                    <p className='text-gray-600'><span className='text-gray-800 font-medium me-2'>Rooms:</span> {obj.rooms}</p>
                    <p className='text-gray-600'><span className='text-gray-800 font-medium me-2'>Base Rate:</span> {obj.baseRate}</p>
                    <p className='text-gray-600'><span className='text-gray-800 font-medium me-2'>Add-Rate:</span> {obj.extraRate}</p>
                    <p className='text-gray-600'><span className='text-gray-800 font-medium me-2'>Max-Guest:</span> {obj.maxGuest}</p>
                    <div className="flex space-x-4 gap-1 sm:gap-5">
                       <p className='text-gray-600'><span className='text-gray-800 font-medium me-2'>AC:</span> {obj.Facilities[0].AC ? <GreenCheckIcon /> : <RedCloseIcon />}</p>
                       <p className='text-gray-600'><span className='text-gray-800 font-medium me-2'>Food:</span> {obj.Facilities[0].food ? <GreenCheckIcon /> : <RedCloseIcon />}</p>
                       <p className='text-gray-600'><span className='text-gray-800 font-medium me-2'>Pets:</span> {obj.Facilities[0].Pets ? <GreenCheckIcon /> : <RedCloseIcon />}</p>
                       <p className='text-gray-600'><span className='text-gray-800 font-medium me-2'>Party Hall:</span> {obj.Facilities[0].partyHall ? <GreenCheckIcon /> : <RedCloseIcon />}</p>
                       <p className='text-gray-600'><span className='text-gray-800 font-medium me-2'>Fishing:</span> {obj.Facilities[0].fishing ? <GreenCheckIcon /> : <RedCloseIcon />}</p>
                       <p className='text-gray-600'><span className='text-gray-800 font-medium me-2'>Games:</span> {obj.Facilities[0].games ? <GreenCheckIcon /> : <RedCloseIcon />}</p>
                       <p className='text-gray-600'><span className='text-gray-800 font-medium me-2'>Wi-Fi:</span> {obj.Facilities[0].wifi ? <GreenCheckIcon /> : <RedCloseIcon />}</p>
                       <p className='text-gray-600'><span className='text-gray-800 font-medium me-2'>TV:</span> {obj.Facilities[0].TV ? <GreenCheckIcon /> : <RedCloseIcon />}</p>
                    </div>
                  </TabPanel>

                  <TabPanel>
                    <div className="cruise-map-img overflow-x-auto ">
                      {obj?.Images?.map((img, index) => (
                        <div key={index} className="cruie-map-img-div inline-block  pr-4">
                          <LazyLoad>
                            <img
                              id="cruise-map-img"
                              src={img}
                              alt="cruise"
                              className="w-40 h-40 object-cover"
                            />
                          </LazyLoad>
                        </div>
                      ))}
                    </div>
                  </TabPanel>

                  <TabPanel>
                    <p className='flex gap-2 mb-2'>
                      Edit Cruise data:
                      <span onClick={() => { handleCruiseEdit(obj._id) }} className='cursor-pointer'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="blue" className="w-6 h-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                        </svg>
                      </span>
                    </p>
                    {/* Rest of the SETTINGS content */}
                    <p>Block Status: {obj.isBlocked ? <ToggleOnIcon onClick={() => { handleBlock(obj._id) }} checked={obj.isBlocked} style={{ color: "red", fontSize: "2rem", cursor: "pointer" }} /> : <ToggleOffIcon onClick={() => { handleBlock(obj._id) }} checked={obj.isBlocked} style={{ fontSize: "2rem", cursor: "pointer" }} />}</p>
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
                </Tabs>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className='flex justify-center mt-56'>
          <Loading />
        </div>
      )}
    </div>
  );
}

export default CruisesTable;

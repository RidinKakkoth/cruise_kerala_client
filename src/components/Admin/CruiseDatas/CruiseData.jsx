import React, { useEffect, useState } from 'react';
import './CruiseData.css';
// import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import SimCardDownloadIcon from '@mui/icons-material/SimCardDownload';
import RemoveModeratorIcon from '@mui/icons-material/RemoveModerator';
import ToggleOffIcon from '@mui/icons-material/ToggleOff';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import VerifiedIcon from '@mui/icons-material/Verified';
import Loading from '../../Shared/Loading'
import { baseApi } from  '../../../config/Api';

import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { blockCruise, cruiseApproval, cruiseData, getPartnerProfileData } from "../../../config/AdminEndpoints";


function CruiseData({ status }) {
  const [cruiseDetails, setCruiseDetails] = useState([]);
  const[loading,setLoading]=useState(true)
  const[trigger,setTrigger]=useState(true)
  const navigate = useNavigate();

  const handleProfile =async (id) => {
 const data=  await getPartnerProfileData(id)
      if(data){
        const profileData = data.partnerData;
       navigate('/admin/partner-profile', { state: profileData });
       }
  };

  const handleRequest =async (status, id) => {
  
    Swal.fire({
      title: 'Are you sure?',
      text: 'You are approving cruise request',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {

        async function invoke(){
          const data=await cruiseApproval(status,id)
          if(data) setTrigger(!trigger);         
        }
        invoke()
      } else if (result.dismiss === Swal.DismissReason.cancel) {  
      }
    });
  };

  const handleBlock =async (id) => {

    const data=await blockCruise(id)
    if(data){    
      setTrigger(!trigger); 
          toast.success('Success', { position: 'top-center' });
    }
  };

  const handleProof = (proof) => {
    const link = document.createElement('a');
    link.href = proof.pdf
    link.download = proof;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleView=(obj)=>{
        navigate('/admin/cruises-single',{state:obj})
  }

  useEffect(() => {

   async function invoke(){
    const data=await cruiseData()
    setLoading(false)
    setCruiseDetails(data.data);
   }
   invoke()
  }, [trigger]);

  return (
    <div className="cruise-container  ">

      {/* <div className=" cruise-container"> */}
     {!loading?( <>
        <ToastContainer autoClose={1000} />
        {cruiseDetails?.map((obj, index) => {
          
          if ((status && obj.isApproved === 'verified') || (!status && obj.isApproved === 'pending')) {
            return (
              <Card
                key={index}
                sx={{
                  display: 'flex',
                  marginTop: '50px',
                  height: '200px',
                  width: '900px',
                  marginRight: '20px',
                  justifyContent: 'space-between',
                }}
              >
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <CardContent sx={{ flex: '1 0 auto' }}>
                    <Typography component="div" style={{ color: '#0064ff', fontWeight: '600' }} variant="h5">
                      {obj.name}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" style={{ marginBottom: '10px' }} component="div">
                      {obj.category.name}
                    </Typography>
                    <div style={{ display: 'flex', gap: '30px' }}>
                      <div>
                        <p id="cruise-all-p">Rate : {obj.baseRate}</p>
                        <p id="cruise-all-p">Boarding : {obj.boarding}</p>
                        <p id="cruise-all-p">Rooms : {obj.rooms}</p>
                      </div>
                      <div style={{}}>
                        <p id="cruise-all-p" onClick={() => { handleProfile(obj.partnerId) }}>
                          Partner Details: <span style={{ color: 'green', cursor: 'pointer' }}>View <AccountBoxIcon style={{ color: 'green' }} /></span>
                        </p>
                        <p id="cruise-all-p">District : {obj.district}</p>
                        <p id="cruise-all-p">Block Status : {obj.isBlocked ? (
                          <ToggleOnIcon onClick={() => { handleBlock(obj._id) }} checked={obj.isBlocked} style={{ color: 'red', fontSize: '2rem', cursor: 'pointer' }} />
                        ) : (
                          <ToggleOffIcon onClick={() => { handleBlock(obj._id) }} checked={obj.isBlocked} style={{ fontSize: '2rem', cursor: 'pointer' }} />
                        )}</p>
                      </div>
                      <div style={{ marginLeft: '25px' }}>
                        <p onClick={() => { handleProof(obj.Liscence) }} style={{ color: '#f74e0c', cursor: 'pointer' }}>
                          Licence <SimCardDownloadIcon />
                        </p>
                        {status === true ? (
                          <p id="cruise-all-p">
                            Approval :
                            <VerifiedIcon style={{ color: '#00c600', fontSize: '2rem',  marginLeft: '10px' }} />
                          </p>
                        ) : null}
                        {status === true ? (
                          ''
                        ) : (
                          <div>
                            <Button
                              onClick={() => handleRequest('verified', obj._id)}
                              style={{ marginRight: '10px', fontSize: '0.6rem', padding: '6px 12px' }}
                              variant="outlined"
                              startIcon={<VerifiedUserIcon style={{ color: 'green', fontSize: '0.8rem' }} />}
                              size="small"
                            >
                              Approve
                            </Button>
                            <Button
                              onClick={() => handleRequest('rejected', obj._id)}
                              style={{ fontSize: '0.6rem', padding: '6px 12px' }}
                              variant="outlined"
                              startIcon={<RemoveModeratorIcon style={{ color: 'red', fontSize: '0.8rem' }} />}
                              size="small"
                            >
                              Reject
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Box>
                <div className="img-c-cntnr" onClick={()=>handleView(obj)}>
                  <CardMedia
                    component="img"
                    sx={{ width: 151, height: '100%' }}
                    src={obj.Images[0]}
                    alt="Cruise"
                  />
                  <div
                    className="card-media-overlay"
                    onMouseEnter={(e) => {
                      e.target.nextSibling.style.opacity = 1;
                    }}
                    onMouseLeave={(e) => {
                      e.target.nextSibling.style.opacity = 0;
                    }}
                  ></div>
                  <div className="card-media-overlay">
                    <span className="hover-text-cd">VIEW</span>
                  </div>
                </div>
              </Card>
            );
          }
          else{
           return <div className='w-[100%] h-[100vh]  flex justify-center items-center'>
                <h3 className='text-gray-500'> no new request</h3>
            </div>
          }
          // return null //added
        })}

       </>):(
             <div className='flex justify-center h-[100vh] items-center'>
             <Loading/>
           </div>
    )}
    
    </div>
  );
}

export default CruiseData;

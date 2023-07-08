import React, { useEffect, useState } from 'react';
import './CruiseData.css';
import { useTheme } from '@mui/material/styles';
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

import axios from 'axios';
import { adminApi, baseApi, partnerApi } from '../../../store/Api';

import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

function CruiseData({ status }) {
  const [cruiseDetails, setCruiseDetails] = useState([]);
  const navigate = useNavigate();

  const handleProfile = (id) => {
    axios
      .get(`${adminApi}getPartnerProfileData?id=${id}`, { withCredentials: true })
      .then((res) => {
        const profileData = res.data.partnerData;
        navigate('/admin/partner-profile', { state: profileData });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleRequest = (result,id) => {
    axios
      .patch(`${adminApi}cruise-approval?result=${result}&id=${id}`, { withCredentials: true })
      .then((res) => {
        // const resData = res.data.status;
        navigate(0)
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleBlock = (id) => {
    console.log(id);
  
    axios.patch(`${partnerApi}blockCruise?id=${id}`,{withCredentials:true}).then((res)=>{
  
      // setTrigger(!trigger)
      navigate(0)
  
      }).catch((error)=>{console.log(error);})
  };


  const handleProof = (proof) => {
    const link = document.createElement('a');
    link.href = `${baseApi}files/${proof}`;
    link.download = proof;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  

  const theme = useTheme();

  useEffect(() => {
    axios
      .get(`${adminApi}cruise-data`, { withCredentials: true })
      .then((res) => {
        setCruiseDetails(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="cruise-container">
      {cruiseDetails.map((obj, index) => {
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
              <Typography variant="subtitle1" color="text.secondary" style={{marginBottom:"10px"}} component="div">
                {obj.category}
              </Typography>






              <div style={{display:"flex",gap:"30px"}}>

                <div>           
              <p id='cruise-all-p'>Rate : {obj.baseRate}</p>
              <p id='cruise-all-p'>Boarding : {obj.boarding}</p>
              <p id='cruise-all-p'>Rooms : {obj.rooms}</p>
                </div>

                <div style={{}}>
                  <p id='cruise-all-p' onClick={()=>{handleProfile(obj.partnerId)}} >Partner Details: <span style={{color:"green",cursor:"pointer"}}>View <AccountBoxIcon style={{color:"green"}} /></span> </p>
                  <p id='cruise-all-p'>District : {obj.district}</p>

                  <p id='cruise-all-p'>Block Status : {obj.isBlocked? <ToggleOnIcon onClick={()=>{handleBlock(obj._id)}} checked={obj.isBlocked}  style={{color:"red",fontSize:"2rem",cursor:"pointer"}} /> :<ToggleOffIcon onClick={()=>{handleBlock(obj._id)}} checked={obj.isBlocked} style={{fontSize:"2rem",cursor:"pointer"}} />}</p>



              {/* <p id='cruise-all-p'>Block Status : {obj.isBlocked}</p> */}

                </div>
                <div style={{marginLeft:"25px"}}>

                  <p onClick={()=>{handleProof(obj.Liscence)}} style={{ color: '#f74e0c', cursor: 'pointer' }}> Licence <SimCardDownloadIcon /> </p>
                  {
  status === true ? (
    <p id='cruise-all-p'>Approval : 
      <VerifiedIcon style={{ color: '#00c600', fontSize: '2rem', position: 'absolute', marginLeft: '10px' }} />
   </p>
  ) : null
}

{status === true ? (
              ''
            ) : (
              <div>
               <Button
  onClick={() => handleRequest('verified',obj._id)}
  style={{ marginRight: '10px', fontSize: '0.6rem', padding: '6px 12px' }}
  variant="outlined"
  startIcon={<VerifiedUserIcon style={{ color: 'green', fontSize: '0.8rem' }} />}
  size="small"
>
  Approve
</Button>
<Button
  onClick={() => handleRequest('rejected',obj._id)}
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

          <div className="img-c-cntnr">
  <CardMedia
    component="img"
    sx={{ width: 151, height: "100%" }}
    src={`${baseApi}files/${obj.Images[0]}`}
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


)
}

} 
)}
    </div>
  );
}

export default CruiseData;

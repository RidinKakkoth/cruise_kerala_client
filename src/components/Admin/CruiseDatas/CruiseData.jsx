import React, { useEffect, useState } from 'react';
import './CruiseData.css';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import axios from 'axios';
import { adminApi, baseApi, partnerApi } from '../../../store/Api';

function CruiseData() {
  const [cruiseDetails, setCruiseDetails] = useState([]);


  const handleProfile=(id)=>{
        axios.get(`${adminApi}getPartnerData?id=${id}`,{withCredentials:true}).then((res)=>{

        console.log(res.data,"dddddddddddddddddddddd");

        }).catch((error)=>{console.log(error);})
  }

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
  }, []); // Empty dependency array to run the effect only once on component mount

  return (
    <div className="cruise-container">
      {cruiseDetails.map((obj, index) => (
        <Card
          key={index}
          sx={{
            display: 'flex',
            marginTop: '50px',
            height: '200px',
            width: '200px',
            marginRight:"20px",
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
                <p id='cruise-all-p'>Approval : {obj.isApproved}</p>
              <p id='cruise-all-p'>Block Status : {obj.isBlocked}</p>
              <p id='cruise-all-p' onClick={()=>{handleProfile(obj.partnerId)}} style={{cursor:"pointer"}}>Partner Details: View <AccountBoxIcon style={{color:"green"}} /> </p>
                </div>
              </div>
            </CardContent>
          </Box>
          <CardMedia
            component="img"
            sx={{ width: 151 }}
            src={`${baseApi}files/${obj.Images[0]}`}
            alt="Cruise"
          />
        </Card>
      ))}
    </div>
  );
}

export default CruiseData;

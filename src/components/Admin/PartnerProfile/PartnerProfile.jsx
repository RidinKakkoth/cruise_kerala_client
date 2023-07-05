import React, { useState } from 'react';
import {Link, useLocation} from 'react-router-dom'
import Card from '@mui/material/Card';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import RemoveModeratorIcon from '@mui/icons-material/RemoveModerator';

import AttachFileIcon from '@mui/icons-material/AttachFile'

import 'primeicons/primeicons.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.css';

import './PartnerProfile.css';
import { baseApi } from '../../../store/Api';
import { Button } from '@mui/material';



const PartnerProfile = () => {
    const location=useLocation()
    const {name,email,phone,companyName,isApproved,image,proof}=location.state //takeing data from partner table when navigating 



   const handleDownload = () => {

    const link = document.createElement('a');
    link.href = `${baseApi}files/${proof}`;

    // link.setAttribute('download', proof);
    link.download = proof;
  
    

    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
  };

 
 


//=======================================================
return (
  <div className="centered-container-partner-profile">
    <Card className="profile-card-partner">

    <h3 style={{marginLeft:"100px"}}>PROFILE</h3>

      <img className='profile-pic-partner'        src={image ? `${baseApi}files/${image}` : "https://static.vecteezy.com/system/resources/previews/019/896/008/original/male-user-avatar-icon-in-flat-design-style-person-signs-illustration-png.png"}
 alt="profile pic" style={{height:"150px",width:"150px",borderRadius:"50%",objectFit: "cover"}} />
      <div className="partner-profile-card-data">
        <div className="partner-info">
          <p>Name: {name}</p>
          <p>Email: {email}</p>
          <p>Company: {companyName}</p>
          <p>Phone: {phone}</p>
          <p>Status: {isApproved}</p>
          <p >Proof: <span onClick={handleDownload} style={{color:"#f74e0c",cursor:"pointer"}}><AttachFileIcon/> {proof}</span></p>
          <Button style={{marginRight:"10px"}} variant="outlined" startIcon={<VerifiedUserIcon style={{color:"green"}} />}>
          Accept
        </Button>
        <Button variant="outlined" startIcon={<RemoveModeratorIcon style={{color:"red"}} />}>
           Reject
        </Button>
        </div>
     
      </div>
    </Card>
  </div>
);

};

export default PartnerProfile;

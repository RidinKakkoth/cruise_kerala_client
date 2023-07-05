import React, { useState } from 'react';
import {Link, useLocation} from 'react-router-dom'
import Card from '@mui/material/Card';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import RemoveModeratorIcon from '@mui/icons-material/RemoveModerator';
import VerifiedIcon from '@mui/icons-material/Verified';

import AttachFileIcon from '@mui/icons-material/AttachFile'

import 'primeicons/primeicons.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.css';

import './PartnerProfile.css';
import { adminApi, baseApi } from '../../../store/Api';
import { Button, colors } from '@mui/material';
import axios from 'axios';



const PartnerProfile = () => {
    const location=useLocation()
    const {name,email,phone,companyName,isApproved,image,proof,_id}=location.state //takeing data from partner table when navigating 

    const[status,setStatus]=useState(isApproved)

   const handleDownload = () => {

    const link = document.createElement('a');
    link.href = `${baseApi}files/${proof}`;

    // link.setAttribute('download', proof);
    link.download = proof;
    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
  };


  const handleRequest=(result)=>{
    
  axios.patch(`${adminApi}partner-approval?result=${result}&id=${_id}`,{withCredentials:true}).then((res)=>{
    
    const resData=res.data.status
    setStatus(resData)
    
  
}).catch((error)=>{console.log(error);})
  }


 
 


//=======================================================
return (
  <div className="centered-container-partner-profile">
    <Card className="profile-card-partner">

    <h3 style={{marginLeft:"100px"}}>PROFILE</h3>

    <div><   VerifiedIcon  style={{ color: '#00c600', fontSize: '2rem' ,position:"absolute",marginLeft:"170px" }}/>
    <img className='profile-pic-partner'        src={image ? `${baseApi}files/${image}` : "https://static.vecteezy.com/system/resources/previews/019/896/008/original/male-user-avatar-icon-in-flat-design-style-person-signs-illustration-png.png"}
 alt="profile pic" style={{height:"150px",width:"150px",borderRadius:"50%",objectFit: "cover"}} />
    </div> 
   
      <div className="partner-profile-card-data">
        <div className="partner-info">
          <p>Name: {name}</p>
          <p>Email: {email}</p>
          <p>Company: {companyName}</p>
          <p >Phone: {phone} </p>
          
          <p >Status: <span style={status==="verified" ? { color: "#00c600" } : {color:"orange"}}>{status}</span></p>

          <p >Proof: <span onClick={handleDownload} style={{color:"#f74e0c",cursor:"pointer"}}><AttachFileIcon/> {proof}</span></p>
{
  status==="verified"?"":  <div><Button onClick={()=>handleRequest("verified")} style={{marginRight:"10px"}} variant="outlined" startIcon={<VerifiedUserIcon style={{color:"green"}} />}>
  Accept
</Button>
<Button onClick={()=>handleRequest("rejected")} variant="outlined" startIcon={<RemoveModeratorIcon style={{color:"red"}} />}>
   Reject
</Button></div>
}
        </div>
     
      </div>
    </Card>
  </div>
);

};

export default PartnerProfile;

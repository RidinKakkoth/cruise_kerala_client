import React, { useState } from 'react';
import {  useLocation } from 'react-router-dom';
import Card from '@mui/material/Card';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import RemoveModeratorIcon from '@mui/icons-material/RemoveModerator';
import VerifiedIcon from '@mui/icons-material/Verified';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.css';
import './PartnerProfile.css';
import { adminApi, baseApi } from  '../../../config/Api';
import { Button } from '@mui/material';
import axios from 'axios';
import { partnerApproval } from '../../../config/AdminEndpoints';
import Sidebar from '../../Shared/Sidebar/Sidebar';

const PartnerProfile = () => {
  const location = useLocation();

  const { name, email, phone, companyName, isApproved, image, proof, _id } = location.state  

  const [status, setStatus] = useState(isApproved);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = `${proof}`;
    link.download = proof;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleRequest = async(result) => {
    
     const data=await partnerApproval(result,_id)
     if(data){
              const resData = data.status;
              setStatus(resData);
     }

   
  };


  return (
   <div className='flex '>
    <Sidebar userType={"admin"}   />
    <div className="centered-container-partner-profile mx-auto">
      
      <Card className="profile-card-partner rounded-3xl shadow">
        <h3 style={{ marginLeft: '100px' }}>PROFILE</h3>
        <div>
          {status === 'verified' ? (
            <VerifiedIcon style={{ color: '#00c600', fontSize: '2rem', position: 'absolute', marginLeft: '170px' }} />
          ) : (
            ''
          )}
          <img
            className="profile-pic-partner"
            src={image ? `${baseApi}files/${image}` : 'https://static.vecteezy.com/system/resources/previews/019/896/008/original/male-user-avatar-icon-in-flat-design-style-person-signs-illustration-png.png'}
            alt="profile pic"
            style={{ height: '150px', width: '150px', borderRadius: '50%', objectFit: 'cover' }}
          />
        </div>
        <div className="partner-profile-card-data">
          <div className="partner-info">
            <p>Name: {name}</p>
            <p>Email: {email}</p>
            <p>Company: {companyName}</p>
            <p>Phone: {phone}</p>
            <p>
              Status: <span style={status === 'verified' ? { color: '#00c600' } : { color: 'orange' }}>{status}</span>
            </p>
{       status==="verified"|| status==="pending"?  <p>
              Proof: <span onClick={handleDownload} style={{ color: '#f74e0c', cursor: 'pointer' }}>
                <AttachFileIcon /> View
              </span>
            </p>:""}
            {status === 'verified' ? (
              ''
            ) : 
            status==='upload proof'?<p className='text-red-500'>pending proof upload</p>
            
            
            
            :(
              <div>
                <Button
                  onClick={() => handleRequest('verified')}
                  style={{ marginRight: '10px' }}
                  variant="outlined"
                  startIcon={<VerifiedUserIcon style={{ color: 'green' }} />}
                >
                  Accept
                </Button>
                <Button
                  onClick={() => handleRequest('rejected')}
                  variant="outlined"
                  startIcon={<RemoveModeratorIcon style={{ color: 'red' }} />}
                >
                  Reject
                </Button>
              </div>
            )}
          </div>
        </div>
      </Card>
    </div>
   </div>
  );
};

export default PartnerProfile;

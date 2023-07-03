import React, { useEffect, useState } from 'react';
import {useLocation} from 'react-router-dom'
import "./Account.css"
import { partnerApi } from '../../../store/Api';
import axios from 'axios';

//material-ui-items
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import ModeIcon from '@mui/icons-material/Mode';
import VerifiedIcon from '@mui/icons-material/Verified';
import GppMaybeIcon from '@mui/icons-material/GppMaybe';
import UpdateIcon from '@mui/icons-material/Update';
import Stack from '@mui/material/Stack';





function Account() {


  useEffect(() => {

    axios.get(`${partnerApi}getPartnerData`,{withCredentials:true}).then((res)=>{
    console.log(res);
    }).catch((error)=>{
      console.log();
    })
    
    }, [])





  const location=useLocation()
  const {name,email,phone,companyName,isApproved}={}
  // location.state //takeing data from partner table when navigating 


const [editing, setEditing] = useState(false);
const [editedName, setEditedName] = useState(name);
const [editedEmail, setEditedEmail] = useState(email);
const [editedCompanyName, setEditedCompanyName] = useState(companyName);
const [editedPhone, setEditedPhone] = useState(phone);
const [editedStatus, seteditedStatus] = useState();




const handleEdit = () => {
  setEditing(true);
};

const handleSave = () => {
  // Perform save operation or update state in your application
  // For this example, we'll just log the edited values
  console.log('Edited Name:', editedName);
  console.log('Edited Email:', editedEmail);
  console.log('Edited Company Name:', editedCompanyName);
  console.log('Edited Phone:', editedPhone);
  console.log('Edited Phone:', editedStatus);

  setEditing(false);
};

const handleCancel = () => {
  setEditing(false);
 // Reset the edited values to the original values
  setEditedName(name);
  setEditedEmail(email);
  setEditedCompanyName(companyName);
  setEditedPhone(phone);
};

const handleProof=(event)=>{
  const file = event.target.files[0];
}
const handleProofSubmit=()=>{

}

return (
  <div className="centered-container">
    
    <Card className="profile-card-account">
    <h3 style={{marginLeft:"100px"}}>PROFILE</h3>
      <CardMedia
        sx={{ height: 150, width: 150,marginLeft:10,marginTop:1 }}
        image="https://static.vecteezy.com/system/resources/previews/019/896/008/original/male-user-avatar-icon-in-flat-design-style-person-signs-illustration-png.png"
        title="green iguana"
      />
      <div className="partner-profile-acc-data">
        <div className="partner-acc-info">

        <p>Name:{"          "}
          {editing ? (
            <input
            style={{marginLeft:"50px"}}
              type="text"
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
            />
          ) : (
            editedName
          )}
          </p>


          <p>
            Email:{"  "}
            {editing ? (
              <input
              style={{marginLeft:"50px"}}
                type="text"
                value={editedEmail}
                onChange={(e) => setEditedEmail(e.target.value)}
              />
            ) : (
              editedEmail
            )}
          </p>



          <p>
            Company:{"  "}
            {editing ? (
              <input
              style={{marginLeft:"20px"}}
                type="text"
                value={editedCompanyName}
                onChange={(e) => setEditedCompanyName(e.target.value)}
              />
            ) : (
              editedCompanyName
            )}
          </p>
          
          <p>
            Phone:{"  "}
            {editing ? (
              <input
              style={{marginLeft:"42px"}}
                type="text"
                value={editedPhone}
                onChange={(e) => setEditedPhone(e.target.value)}
              />
            ) : (
              editedPhone
            )}
          </p>


          <p>
            Status:{}
            {
          
              isApproved? <>
              <VerifiedIcon  style={{color:"green", marginLeft:"20px"}}/> 
              <p style={{marginTop:"10px"}}>Verified</p>
              </> 
               :<>
                <GppMaybeIcon style={{color:"red",marginLeft:"20px"}}/>
                <p style={{marginTop:"10px",color:"red"}}>Upload Proof to Verify</p> 
                <div style={{display:'flex'}}>
                 <input className='file' encType="multipart/form-data" onChange={handleProof} type="file" style={{width:"100px"}} />
                  <p style={{marginLeft:"25px",textDecoration:"underline",color:"blue"}} onClick={handleProofSubmit}>Upload</p>
                  
                </div>
                  </> 
              
            }
          </p>


        </div>
        <div className="user-actions">
          {editing ? (
               <Stack direction="row" spacing={2}>
                   <Button variant="outlined" onClick={handleSave} startIcon={<UpdateIcon />}>
                        Update
                    </Button>
                     <Button variant="contained" onClick={handleCancel} endIcon={<HighlightOffIcon />}>
                        Cancel
                      </Button>
                </Stack>
          ) : (
              <Stack direction="row" spacing={2}>
              <Button variant="outlined" onClick={handleEdit} startIcon={<ModeIcon />}>
                Edit
              </Button>
            </Stack>

          )}
        </div>
      </div>
    </Card>
  </div>
);
};

export default Account

import React, { useState } from 'react';
import {useLocation} from 'react-router-dom'
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import VerifiedIcon from '@mui/icons-material/Verified';
// import Button from '@mui/material/Button';


import 'primeicons/primeicons.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.css';



import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';

import './PartnerProfile.css';



const PartnerProfile = () => {
    const location=useLocation()
    const {name,email,phone,companyName,isApproved}=location.state //takeing data from partner table when navigating 




//=======================================================

const [displayBasic, setDisplayBasic] = useState(false);
 const [position, setPosition] = useState('center');

    const dialogFuncMap = {
        'displayBasic': setDisplayBasic,
    }
    const onClick = (name, position) => {
        dialogFuncMap[`${name}`](true);

        if (position) {
            setPosition(position);
        }
    }

    const onHide = (name) => {
        dialogFuncMap[`${name}`](false);
    }

    const renderFooter = (name) => {
        return (
            <div>
                <Button label="Reject" className="p-button-danger" onClick={() => onHide(name)} />
                <Button  label="Accept" className="p-button-success"  onClick={() => onHide(name)} autoFocus />
            </div>
        );
    }



//=======================================================
  return (
    <div className="centered-container-partner-profile">
      <Card className="profile-card-partner">
        <CardMedia
          sx={{ height: 150, width: 150,marginLeft:10,marginTop:5 }}
          image="https://static.vecteezy.com/system/resources/previews/019/896/008/original/male-user-avatar-icon-in-flat-design-style-person-signs-illustration-png.png"
          title="green iguana"
        />
        <div className="partner-profile-card-data">
          <div className="partner-info">

          <p>Name:{"  "} {name} </p>
            <p>Email:{"  "} {email}</p>
            <p>Company:{"  "} {companyName}</p>
            <p> Phone:{"  "}{phone}</p>

          </div>

          <div className="dialog-demo">
            <div className="card">
             
                <Button label="VIEW PROOF"  onClick={() => onClick('displayBasic')} />
                <Dialog header="Header" visible={displayBasic} style={{ width: '50vw',height:"50vw" }} footer={renderFooter('displayBasic')} onHide={() => onHide('displayBasic')}>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                    cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                </Dialog>
</div>
        </div>

          
        </div>
      </Card>
    </div>
  );
};

export default PartnerProfile;

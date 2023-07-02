import React from 'react';
import './AddCruises.css'
import '@mobiscroll/react/dist/css/mobiscroll.min.css';
import { Button, Input, Page, setOptions,Dropdown,Checkbox } from '@mobiscroll/react';
import AppBreadCrumbs from '../../Shared/AppBreadCrumbs';
import { ImageList } from '@mui/material';

setOptions({
    theme: 'ios',
    themeVariant: 'light'
});

function AddCruises() {
    return (
        <Page >
            <AppBreadCrumbs/>
            <div className="mbsc-grid mbsc-form-grid" id='form-add-cruise'>
                <h3 id='add-cruise-head'>ADD NEW CRUISE</h3>
                <div className="mbsc-row">
                    <div className="mbsc-col-12 mbsc-col-md-6 mbsc-col-lg-3">
                        <Input label="Cruise Name" inputStyle="box" labelStyle="floating" placeholder="Enter Cruise Name" required />
                    </div>
                    <div className="mbsc-col-12 mbsc-col-md-6 mbsc-col-lg-3">

                        <Dropdown style={{height:"55px"}}  inputStyle='box'>
                            <option >Category</option>
                             <option value="Premium">Premium</option>
                             <option value="Luxury">Luxury</option>
                            <option value="Classic">Classic</option>
                             <option value="Deluxe">Deluxe</option>
                             <option value="Honemoon Special">Honemoon Special</option>
                        </Dropdown>


                    </div>
                    <div className="mbsc-col-12 mbsc-col-lg-6">
                        <Input label="Description" inputStyle="box" labelStyle="floating" placeholder="Description" required/>
                    </div>
                </div>

                <div className="mbsc-row">
                    <div className="mbsc-col-12 mbsc-col-md-6 mbsc-col-lg-3">
                        <Input label="Boarding Point" inputStyle="box" labelStyle="floating" placeholder="Enter Boarding Point" />
                    </div>
                    <div className="mbsc-col-12 mbsc-col-md-6 mbsc-col-lg-3">
                        <Input label="Town" inputStyle="box" labelStyle="floating" placeholder="Enter Town name" />
                    </div>
                    <div className="mbsc-col-12 mbsc-col-md-6 mbsc-col-lg-3">
                        <Input label="District" inputStyle="box" labelStyle="floating" placeholder="Select your district" />
                    </div>
                    <div className="mbsc-col-12 mbsc-col-md-6 mbsc-col-lg-3">
                        <Input label="Pin" inputStyle="box" labelStyle="floating" placeholder="What is your pin code" />
                    </div>
                </div>
                <div className="mbsc-row">
                    <div className="mbsc-col-12 mbsc-col-md-6 mbsc-col-lg-3">
                        <Input type='number' label="No of Rooms" inputStyle="box" labelStyle="floating" placeholder="Enter No of Rooms" />
                    </div>
                    <div className="mbsc-col-12 mbsc-col-md-6 mbsc-col-lg-3">
                        <Input label="Base Rate per Night" inputStyle="box" labelStyle="floating" type='number' placeholder="Base Rate per Night" />
                    </div>
                    <div className="mbsc-col-12 mbsc-col-md-6 mbsc-col-lg-3">
                        <Input label="Rate per extra Guests" inputStyle="box" labelStyle="floating" type='number' placeholder="Rate per head for extra guests" />
                    </div>
                    <div className="mbsc-col-12 mbsc-col-md-6 mbsc-col-lg-3">
                        <Input label="No of Persons allowed" inputStyle="box" type='number' labelStyle="floating" placeholder="No of Persons allowed" />
                    </div>
                </div>

                <div className="mbsc-row">
                    <div className="mbsc-col-12 mbsc-col-md-6 mbsc-col-lg-3">
                    <Input inputStyle="underline" labelStyle="stacked" type="file" placeholder="Select file..." label="Upload images"></Input>                    </div>
                </div>
                <ImageList sx={{ width: 500, height: 450 }} cols={2} rowHeight={164}>
  {/* {itemData.map((item) => (
    <ImageListItem key={item.img}>
      <img
        src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
        srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
        alt={item.title}
        loading="lazy"
      />
    </ImageListItem>
  ))} */}
</ImageList>

                <div className="mbsc-row"  style={{marginBottom:"30px"}}>
                    <div  className="mbsc-col-12 mbsc-col-md-6 mbsc-col-lg-3">
                          <Checkbox  label="AC" color="primary" defaultChecked={true} />                   
                    </div>
                    <div className="mbsc-col-12 mbsc-col-md-6 mbsc-col-lg-3">
                          <Checkbox label="FOOD" color="primary" defaultChecked={true} />                   
                    </div>
                    <div className="mbsc-col-12 mbsc-col-md-6 mbsc-col-lg-3">
                          <Checkbox label="TV" color="primary" defaultChecked={true} />                   
                    </div>
                    <div className="mbsc-col-12 mbsc-col-md-6 mbsc-col-lg-3">
                         <Checkbox label="PETS ALLOWED" color="primary" defaultChecked={true} />  
                    </div>
                </div>

                <div className="mbsc-row" style={{marginBottom:"30px"}}>
                    <div className="mbsc-col-12 mbsc-col-md-6 mbsc-col-lg-3">
                            <Checkbox label="PARTY HALL" color="primary" defaultChecked={true} />                              
                    </div>
                    <div className="mbsc-col-12 mbsc-col-md-6 mbsc-col-lg-3" >
                             <Checkbox   label="FISHING" color="primary" defaultChecked={true} />                                       
                    </div>
                    <div className="mbsc-col-12 mbsc-col-md-6 mbsc-col-lg-3">
                             <Checkbox label="GAMES" color="primary" defaultChecked={true} />                                  
                    </div>
                    <div className="mbsc-col-12 mbsc-col-md-6 mbsc-col-lg-3">
                             <Checkbox label="WI-FI" color="primary" defaultChecked={true} />                   
                    </div>
                </div>

                <div className="mbsc-row">
                    <div className="mbsc-col-12 mbsc-col-md-6 mbsc-col-lg-3">
                    <Input inputStyle="underline" labelStyle="stacked" type="file" placeholder="Select file..." label="Upload Liscence doc"></Input>                    </div>
                </div>


                <div className="mbsc-row">
                    <div className="mbsc-col-12 mbsc-col-md-16 mbsc-col-lg-3" style={{display:"flex",justifyContent:"center"}}>
                        <div className="mbsc-button-group-block" id='add-cruise-submit'>
                            <Button color="success">Create account</Button>
                        </div>
                    </div>
                </div>
            </div>
        </Page>
    ); 
}

export default AddCruises

import React, { useState } from 'react';
import './AddCruises.css'
import '@mobiscroll/react/dist/css/mobiscroll.min.css';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Button, Input, Page, setOptions,Dropdown,Checkbox } from '@mobiscroll/react';
import AppBreadCrumbs from '../../Shared/AppBreadCrumbs';


setOptions({
    theme: 'ios',
    themeVariant: 'light'
});




function AddCruises() {

    const[selectedImages,setSelectedImages]=useState([])

    const handleSelectImage=(event)=>{
        const selectedFiles=event.target.files;
        const selectedFilesArray=Array.from(selectedFiles)
        const imagesArray=selectedFilesArray.map((file)=>{
            return URL.createObjectURL(file)
        })
        setSelectedImages((previousImages)=>previousImages.concat(imagesArray))
    }
    return (
        <Page >
            <AppBreadCrumbs/>
            <div className="mbsc-grid mbsc-form-grid" id='form-add-cruise'>
                <h3 id='add-cruise-head'>ADD NEW CRUISE</h3>
                <div className="mbsc-row">
                    <div className="mbsc-col-12 mbsc-col-md-6 mbsc-col-lg-3">
                        <Input required label="Cruise Name" name="Name" inputStyle="box" labelStyle="floating" placeholder="Enter Cruise Name"  />
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
                        <Input required label="Description" name="Description" inputStyle="box" labelStyle="floating" placeholder="Description" />
                    </div>
                </div>

                <div className="mbsc-row">
                    <div className="mbsc-col-12 mbsc-col-md-6 mbsc-col-lg-3">
                        <Input required label="Boarding Point" name="BoardingPoint" inputStyle="box" labelStyle="floating" placeholder="Enter Boarding Point" />
                    </div>
                    <div className="mbsc-col-12 mbsc-col-md-6 mbsc-col-lg-3">
                        <Input required label="Town" name="Town" inputStyle="box" labelStyle="floating" placeholder="Enter Town name" />
                    </div>
                    <div className="mbsc-col-12 mbsc-col-md-6 mbsc-col-lg-3">
                        <Input required label="District" name="District" inputStyle="box" labelStyle="floating" placeholder="Select your district" />
                    </div>
                    <div className="mbsc-col-12 mbsc-col-md-6 mbsc-col-lg-3">
                        <Input required label="Pin"  name="Pin" inputStyle="box" labelStyle="floating" placeholder="What is your pin code" />
                    </div>
                </div>
                <div className="mbsc-row">
                    <div className="mbsc-col-12 mbsc-col-md-6 mbsc-col-lg-3">
                        <Input required type='number' name="Rooms" label="No of Rooms" inputStyle="box" labelStyle="floating" placeholder="Enter No of Rooms" />
                    </div>
                    <div className="mbsc-col-12 mbsc-col-md-6 mbsc-col-lg-3">
                        <Input required label="Base Rate per Night" name="BasePrice" inputStyle="box" labelStyle="floating" type='number' placeholder="Base Rate per Night" />
                    </div>
                    <div className="mbsc-col-12 mbsc-col-md-6 mbsc-col-lg-3">
                        <Input required label="Rate per extra Guests" name="AddGuestPrice" inputStyle="box" labelStyle="floating" type='number' placeholder="Rate per head for extra guests" />
                    </div>
                    <div className="mbsc-col-12 mbsc-col-md-6 mbsc-col-lg-3">
                        <Input required label="No of Persons allowed" name="MaxGuest" inputStyle="box" type='number' labelStyle="floating" placeholder="No of Persons allowed" />
                    </div>
                </div>




                <div className="mbsc-row">
                    <div className="mbsc-col-12 mbsc-col-md-6 mbsc-col-lg-3">
                    <Input inputStyle="underline" required multiple labelStyle="stacked" name="Images" onChange={handleSelectImage} type="file" placeholder="Select file..." label="Upload images"></Input>                    </div>
                </div>
                <div className='images'>
                        {selectedImages&&
                        selectedImages.map((image,index)=>{
                            return(
                                <div key={image} className='image'>
                                    <img style={{padding:0,margin:0}} src={image} height="200" alt="uploads" />
                                    {/* <button onClick={()=>setSelectedImages(selectedImages.filter((e)=>e!==image))}></button> */}
                                    <DeleteForeverIcon className='del-btn' style={{color:"red",cursor:"pointer"}} onClick={()=>setSelectedImages(selectedImages.filter((e)=>e!==image))} /> 
                                    <p id='img-indx'>{index+1}</p>
                                </div>
                            )
                        })
                        }
                </div>




                <div className="mbsc-row"  style={{marginBottom:"30px",marginTop:"30px"}}>
                    <div  className="mbsc-col-12 mbsc-col-md-6 mbsc-col-lg-3">
                          <Checkbox name="Description" label="AC" color="primary" defaultChecked={true} />                   
                    </div>
                    <div className="mbsc-col-12 mbsc-col-md-6 mbsc-col-lg-3">
                          <Checkbox name="Description" label="FOOD" color="primary" defaultChecked={true} />                   
                    </div>
                    <div className="mbsc-col-12 mbsc-col-md-6 mbsc-col-lg-3">
                          <Checkbox name="Description" label="TV" color="primary" defaultChecked={true} />                   
                    </div>
                    <div className="mbsc-col-12 mbsc-col-md-6 mbsc-col-lg-3">
                         <Checkbox name="Description" label="PETS ALLOWED" color="primary" defaultChecked={true} />  
                    </div>
                </div>

                <div className="mbsc-row" style={{marginBottom:"30px"}}>
                    <div className="mbsc-col-12 mbsc-col-md-6 mbsc-col-lg-3">
                            <Checkbox name="Description" label="PARTY HALL" color="primary" defaultChecked={true} />                              
                    </div>
                    <div className="mbsc-col-12 mbsc-col-md-6 mbsc-col-lg-3" >
                             <Checkbox name="Description"  label="FISHING" color="primary" defaultChecked={true} />                                       
                    </div>
                    <div className="mbsc-col-12 mbsc-col-md-6 mbsc-col-lg-3">
                             <Checkbox name="Description" label="GAMES" color="primary" defaultChecked={true} />                                  
                    </div>
                    <div className="mbsc-col-12 mbsc-col-md-6 mbsc-col-lg-3">
                             <Checkbox name="Description" label="WI-FI" color="primary" defaultChecked={true} />                   
                    </div>
                </div>

                <div className="mbsc-row">
                    <div className="mbsc-col-12 mbsc-col-md-6 mbsc-col-lg-3">
                    <Input name="Description" inputStyle="underline" labelStyle="stacked" type="file" placeholder="Select file..." required label="Upload Liscence doc"></Input>                    </div>
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

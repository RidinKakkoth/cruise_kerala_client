import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

import './AddCruises.css'
import '@mobiscroll/react/dist/css/mobiscroll.min.css';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Button, Input, Page, setOptions,Dropdown,Checkbox } from '@mobiscroll/react';
import FastRewindIcon from '@mui/icons-material/FastRewind';
import axios from 'axios';
import { baseApi, partnerApi } from '../../../store/Api';
import { useNavigate } from 'react-router-dom';
import AddCruiseFormValidation from '../../../utils/AddCruiseFormValidation'
import { ToastContainer, toast } from 'react-toastify';

setOptions({
    theme: 'ios',
    themeVariant: 'light'
});




function AddCruises() {


    const[name,setName]=useState('')
    const[category,setCategory]=useState('')
    const[description,setDescription]=useState('')
    const[boarding,setBoarding]=useState('')
    const[town,setTown]=useState('')
    const[district,setDistrict]=useState('')
    const[pin,setPin]=useState()
    const[rooms,setRooms]=useState()
    const[baseRate,setBaseRate]=useState()
    const[extraRate,setExtraRate]=useState()
    const[maxGuest,setMaxGuest]=useState()
    const[images,setImages]=useState([])
    const[AC,setAC]=useState(true)
    const[food,setFood]=useState(true)
    const[TV,setTV]=useState(true)
    const[partyHall,setPartyHall]=useState(true)
    const[games,setGames]=useState(true)
    const[fishing,setFishing]=useState(true)
    const[wifi,setWifi]=useState(true)
    const[pets,setPets]=useState(true)
    const[license,setLicense]=useState(null)
    const[categoryData,setCategoryData]=useState([])

    const navigate=useNavigate()

    const[selectedImages,setSelectedImages]=useState([])

    const handleSelectImage=(event)=>{
        const selectedFiles=event.target.files;
        const selectedFilesArray=Array.from(selectedFiles)
        const imagesArray=selectedFilesArray.map((file)=>{
            return URL.createObjectURL(file)
        })
        setSelectedImages((previousImages)=>previousImages.concat(imagesArray))
        setImages(selectedFiles)
    }

    const handleAddCruise = (event) => {


            event.preventDefault()

           const cruiseData={name,category,description,boarding,town,district,pin,rooms,baseRate,extraRate,maxGuest,AC,food,TV,pets,partyHall,fishing,games,wifi}
           const validationError =AddCruiseFormValidation(cruiseData)

             if (validationError !== '') {
                  toast.error(validationError,{position: "top-center"});
                 return;
                    }

           const formData = new FormData();

           // Append cruiseData to the formData
           Object.entries(cruiseData).forEach(([key, value]) => {
             formData.append(key, value);
           });
         
           // Append images to the formData
           for (const image of images) {
             formData.append('images', image);
           }
         
           // Append the license file to the formData
           formData.append('license', license);
         
   axios.post(`${partnerApi}add-cruise`, formData,{
    headers: {
      "Content-Type": "multipart/form-data",
    },
    withCredentials: true,
  }).then((response) => {
    
if(response.data.success){
    Swal.fire({
        icon: 'success',
        title: 'Cruise added successfully',
        timer: 2000, 
        showConfirmButton: false
      }).then(() => {
        navigate(-1); // Navigate to cruise table
      });
}

  })
  .catch((error) => {
    console.log(error);

    Swal.fire({
      icon: 'error',
      title: 'Error adding cruise',
      timer: 2000, 
      showConfirmButton: false
    });
  });
      };


useEffect(()=>{
    axios.get(`${partnerApi}get-categories`,{withCredentials:true}).then((res)=>{
       
      setCategoryData(res.data.categories)
    }).catch((err)=>{console.log(err)})
  
},[])




    return (
        <Page >
        <ToastContainer  />
     <Button onClick={()=>{navigate(-1)}} variant="contained" endIcon={<FastRewindIcon />}>
        Back
      </Button>
   
            <div className="mbsc-grid mbsc-form-grid" id='form-add-cruise'>
                <h3 id='add-cruise-head'>ADD NEW CRUISE</h3>
                <form action=""  onSubmit={handleAddCruise} >
                <div className="mbsc-row">
                    <div className="mbsc-col-12 mbsc-col-md-6 mbsc-col-lg-3">
                        <Input required label="Cruise Name" onChange={(e)=>{setName(e.target.value)}}  inputStyle="box" labelStyle="floating" placeholder="Enter Cruise Name"  />
                    </div>
                    <div className="mbsc-col-12 mbsc-col-md-6 mbsc-col-lg-3">

                        <Dropdown style={{height:"55px"}} required  onChange={(event) => setCategory(event.target.value)}  inputStyle='box'>
                            <option value={""}>Category</option>
                           
                             {categoryData.map((value,index)=>{
                                    
                                    return  <option key={value._id} value={value._id}>{value.name}</option>
                             })
                            }
{                            console.log(category)
}
                        </Dropdown>


                    </div>
                    <div className="mbsc-col-12 mbsc-col-lg-6">
                        <Input required label="Description" onChange={(e)=>{setDescription(e.target.value)}} inputStyle="box" labelStyle="floating" placeholder="Description" />
                    </div>
                </div>

                <div className="mbsc-row">
                    <div className="mbsc-col-12 mbsc-col-md-6 mbsc-col-lg-3">
                        <Input required label="Boarding Point" onChange={(e)=>{setBoarding(e.target.value)}} inputStyle="box" labelStyle="floating" placeholder="Enter Boarding Point" />
                    </div>
                    <div className="mbsc-col-12 mbsc-col-md-6 mbsc-col-lg-3">
                        <Input required label="Town" onChange={(e)=>{setTown(e.target.value)}} inputStyle="box" labelStyle="floating" placeholder="Enter Town name" />
                    </div>
                    <div className="mbsc-col-12 mbsc-col-md-6 mbsc-col-lg-3">
                        <Input required label="District" onChange={(e)=>{setDistrict(e.target.value)}} inputStyle="box" labelStyle="floating" placeholder="Select your district" />
                    </div>
                    <div className="mbsc-col-12 mbsc-col-md-6 mbsc-col-lg-3">
                        <Input type='number' required label="Pin"  onChange={(e)=>{setPin(e.target.value)}} inputStyle="box" labelStyle="floating" placeholder="What is your pin code" />
                    </div>
                </div>
                <div className="mbsc-row">
                    <div className="mbsc-col-12 mbsc-col-md-6 mbsc-col-lg-3">
                        <Input required type='number' onChange={(e)=>{setRooms(e.target.value)}} label="No of Rooms" inputStyle="box" labelStyle="floating" placeholder="Enter No of Rooms" />
                    </div>
                    <div className="mbsc-col-12 mbsc-col-md-6 mbsc-col-lg-3">
                        <Input required label="Base Rate per Night" onChange={(e)=>{setBaseRate(e.target.value)}} inputStyle="box" labelStyle="floating" type='number' placeholder="Base Rate per Night" />
                    </div>
                    <div className="mbsc-col-12 mbsc-col-md-6 mbsc-col-lg-3">
                        <Input required label="Rate per extra Guests" onChange={(e)=>{setExtraRate(e.target.value)}} inputStyle="box" labelStyle="floating" type='number' placeholder="Rate per head for extra guests" />
                    </div>
                    <div className="mbsc-col-12 mbsc-col-md-6 mbsc-col-lg-3">
                        <Input required label="No of Persons allowed" onChange={(e)=>{setMaxGuest(e.target.value)}} inputStyle="box" type='number' labelStyle="floating" placeholder="No of Persons allowed" />
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
                                    <img style={{padding:0,margin:0}} src={image} className='w-52' height="200" alt="uploads" />
                                    <DeleteForeverIcon className='del-btn' style={{color:"red",cursor:"pointer"}} onClick={()=>setSelectedImages(selectedImages.filter((e)=>e!==image))} /> 
                                    <p id='img-indx'>{index+1}</p>
                                </div>
                            )
                        })
                        }
                </div>




                <div className="mbsc-row"  style={{marginBottom:"30px",marginTop:"30px"}}>
                    <div  className="mbsc-col-12 mbsc-col-md-6 mbsc-col-lg-3">
                          <Checkbox onChange={(e)=>{setAC(e.target.checked)}} label="AC" color="primary" defaultChecked={true} />                   
                    </div>
                    <div className="mbsc-col-12 mbsc-col-md-6 mbsc-col-lg-3">
                          <Checkbox onChange={(e)=>{setFood(e.target.checked)}} label="FOOD" color="primary" defaultChecked={true} />                   
                    </div>
                    <div className="mbsc-col-12 mbsc-col-md-6 mbsc-col-lg-3">
                          <Checkbox onChange={(e)=>{setTV(e.target.checked)}} label="TV" color="primary" defaultChecked={true} />                   
                    </div>
                    <div className="mbsc-col-12 mbsc-col-md-6 mbsc-col-lg-3">
                         <Checkbox onChange={(e)=>{setPets(e.target.checked)}} label="PETS ALLOWED" color="primary" defaultChecked={true} />  
                    </div>
                </div>

                <div className="mbsc-row" style={{marginBottom:"30px"}}>
                    <div className="mbsc-col-12 mbsc-col-md-6 mbsc-col-lg-3">
                            <Checkbox onChange={(e)=>{setPartyHall(e.target.checked)}}label="PARTY HALL" color="primary" defaultChecked={true} />                              
                    </div>
                    <div className="mbsc-col-12 mbsc-col-md-6 mbsc-col-lg-3" >
                             <Checkbox onChange={(e)=>{setFishing(e.target.checked)}} label="FISHING" color="primary" defaultChecked={true} />                                       
                    </div>
                    <div className="mbsc-col-12 mbsc-col-md-6 mbsc-col-lg-3">
                             <Checkbox onChange={(e)=>{setGames(e.target.checked)}}label="GAMES" color="primary" defaultChecked={true} />                                  
                    </div>
                    <div className="mbsc-col-12 mbsc-col-md-6 mbsc-col-lg-3">
                             <Checkbox onChange={(e)=>{setWifi(e.target.checked)}}label="WI-FI" color="primary" defaultChecked={true} />                   
                    </div>
                </div>

                <div className="mbsc-row">
                    <div className="mbsc-col-12 mbsc-col-md-6 mbsc-col-lg-3">
                    <Input inputStyle="underline" name="license" labelStyle="stacked" type="file" onChange={(e)=>{setLicense(e.target.files[0])}} placeholder="Select file..." required label="Upload License doc"></Input>                    </div>
                </div>


                <div className="mbsc-row">
                    <div className="mbsc-col-12 mbsc-col-md-16 mbsc-col-lg-3" style={{display:"flex",justifyContent:"center"}}>
                        <div className="mbsc-button-group-block" id='add-cruise-submit'>
                            <Button type='submit'  color="success">Add Cruise</Button>
                        </div>
                    </div>
                </div>
                </form>
            </div>
        </Page>
    ); 
}

export default AddCruises

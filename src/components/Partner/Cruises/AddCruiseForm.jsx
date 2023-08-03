import React, { useEffect, useState } from "react";
import { addCruise, getCategories } from "../../../config/PartnerEndpoints";
import AddCruiseFormValidation from '../../../utils/AddCruiseFormValidation'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { ToastContainer, toast } from 'react-toastify';
import { Backdrop, CircularProgress } from '@mui/material';


import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import { useNavigate } from "react-router-dom";

const AddCruiseForm = () => {
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
    const[uploading,setUploading]=useState(false)

    
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

    const handleAddCruise = async(event) => {


            event.preventDefault()

           const cruiseData={name,category,description,boarding,town,district,pin,rooms,baseRate,extraRate,maxGuest,AC,food,TV,pets,partyHall,fishing,games,wifi}
           const validationError =AddCruiseFormValidation(cruiseData)

             if (validationError !== '') {
                  toast.error(validationError,{position: "top-center"});
                 return; }

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
         
           setUploading(true)

            const data=await addCruise(formData)
            if(data?.status){
                setUploading(false)
                Swal.fire({
                            icon: 'success',
                            title: 'Cruise added successfully',
                            timer: 2000, 
                            showConfirmButton: false
                          }).then(() => {
                            navigate(-1); // Navigate to cruise table
                          });
                     }
            else{
                setUploading(false)
                    Swal.fire({
                    icon: 'error',
                    title: 'Error adding cruise',
                    timer: 2000, 
                    showConfirmButton: false
                     });
            } };


useEffect(()=>{
    async function invoke(){
        const data=await getCategories()
        if(data){
            setCategoryData(data.categories)
        }
    }
    invoke()
  
},[])




  return (
    <div className="p-4 max-w-screen-md mx-auto bg-white shadow-md rounded-md">
              <ToastContainer  />
      <form onSubmit={handleAddCruise} className="mt-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="mb-4">
            <label htmlFor="cruiseName" className="block text-sm font-medium text-gray-700">
              Cruise Name
            </label>
            <input
              type="text"
              name="cruiseName"
            //   value={formData.cruiseName}
              onChange={(e)=>{setName(e.target.value)}}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50 focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">
              Category
            </label>
            <select
              name="category"
            //   value={formData.category}
            onChange={(event) => setCategory(event.target.value)}              className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50 focus:ring-indigo-500 focus:border-indigo-500"
              required
            >
              <option value="">Select Category</option>
              {categoryData?.map((value,index)=>{
                                    
                                    return  <option key={value._id} value={value._id}>{value.name}</option>
                             })
                            }
            </select>
          </div>
          <div className="col-span-2 mb-4">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              name="description"
            //   value={formData.description}
              onChange={(e)=>{setDescription(e.target.value)}}              className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50 focus:ring-indigo-500 focus:border-indigo-500 resize-none"
              rows="4"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="boardingPlace" className="block text-sm font-medium text-gray-700">
              Boarding Place
            </label>
            <input
              type="text"
              name="boardingPlace"
            //   value={formData.boardingPlace}
            onChange={(e)=>{setBoarding(e.target.value)}}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50 focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="town" className="block text-sm font-medium text-gray-700">
              Town
            </label>
            <input
              type="text"
              name="town"
            //   value={formData.town}
            onChange={(e)=>{setTown(e.target.value)}}
                          className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50 focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="district" className="block text-sm font-medium text-gray-700">
              District
            </label>
            <input
              type="text"
              name="district"
            //   value={formData.district}
            onChange={(e)=>{setDistrict(e.target.value)}}              className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50 focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="pincode" className="block text-sm font-medium text-gray-700">
              Pincode
            </label>
            <input
              type="text"
              name="pincode"
            //   value={formData.pincode}
            onChange={(e)=>{setPin(e.target.value)}}
                          className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50 focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="numberOfRooms" className="block text-sm font-medium text-gray-700">
              Number of Rooms
            </label>
            <input
              type="number"
              name="numberOfRooms"
            //   value={formData.numberOfRooms}
            onChange={(e)=>{setRooms(e.target.value)}}
                          className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50 focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="basicRate" className="block text-sm font-medium text-gray-700">
              Basic Rate
            </label>
            <input
              type="number"
              name="basicRate"
            //   value={formData.basicRate}
            onChange={(e)=>{setBaseRate(e.target.value)}}
                          className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50 focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="rateForExtraGuest" className="block text-sm font-medium text-gray-700">
              Rate for Extra Guest
            </label>
            <input
              type="number"
              name="rateForExtraGuest"
            //   value={formData.rateForExtraGuest}
            onChange={(e)=>{setExtraRate(e.target.value)}}
                          className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50 focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="maxGuest" className="block text-sm font-medium text-gray-700">
              Max Guest
            </label>
            <input
              type="number"
              name="maxGuest"
            //   value={formData.maxGuest}
            onChange={(e)=>{setMaxGuest(e.target.value)}}
                          className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50 focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              name="tv"
              defaultChecked={true}
            //   checked={formData.tv}
            onChange={(e)=>{setTV(e.target.checked)}}
                          className="mr-2"
            />
            <label htmlFor="tv">TV</label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              name="ac"
              defaultChecked={true}
            //   checked={formData.ac}
              onChange={(e)=>{setAC(e.target.checked)}}             
               className="mr-2"
            />
            <label htmlFor="ac">AC</label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              defaultChecked={true}
              name="games"
            //   checked={formData.games}
            onChange={(e)=>{setGames(e.target.checked)}}
                          className="mr-2"
            />
            <label htmlFor="games">Games</label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              defaultChecked={true}
              name="food"
            //   checked={formData.food}
              onChange={(e)=>{setFood(e.target.checked)}}
              className="mr-2"
            />
            <label htmlFor="food">Food</label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              defaultChecked={true}
              name="fishing"
            //   checked={formData.fishing}
            onChange={(e)=>{setFishing(e.target.checked)}}              
            className="mr-2"
            />
            <label htmlFor="fishing">Fishing</label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              defaultChecked={true}
              name="partyhall"
            //   checked={formData.partyhall}
            onChange={(e)=>{setPartyHall(e.target.checked)}}              
            className="mr-2"
            />
            <label htmlFor="partyhall">Party Hall</label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              defaultChecked={true}
              name="pets"
            //   checked={formData.pets}
              onChange={(e)=>{setPets(e.target.checked)}}
                            className="mr-2"
            />
            <label htmlFor="pets">Pets</label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              name="wifi"
            //   checked={formData.wifi}
            onChange={(e)=>{setWifi(e.target.checked)}}              
            className="mr-2"
                          defaultChecked={true}
            />
            <label htmlFor="wifi">WiFi</label>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="mb-4">
            <label htmlFor="licenseFile" className="block text-sm font-medium text-gray-700">
              License File
            </label>
            <input
              type="file"
              name="license"
              onChange={(e)=>{setLicense(e.target.files[0])}}
                            className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="imageFile" className="block text-sm font-medium text-gray-700">
              Image File
            </label>
            <input
              type="file"
              name="Images"
              multiple
              onChange={handleSelectImage}             
               className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>                <div className='images '>
                        {selectedImages&&
                        selectedImages.map((image,index)=>{
                            return(
                                <div key={image} className='image '>
                                    <img style={{padding:0,margin:0}} src={image} className='w-52' height="200" alt="uploads" />
                                    <DeleteForeverIcon className='del-btn' style={{color:"red",cursor:"pointer"}} onClick={()=>setSelectedImages(selectedImages.filter((e)=>e!==image))} /> 
                                    <p id='img-indx'>{index+1}</p>
                                </div>
                            )
                        })
                        }
                </div>

        </div>

        <div className="mt-6">
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 border border-transparent rounded-md font-semibold text-white hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
          >
            Add Cruise
          </button>
        </div>
      </form>
      {uploading && (
        <Backdrop open={true}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <CircularProgress color="inherit" />
            <p style={{ marginTop: '10px', color: 'white' }}>Uploading data, please wait...</p>
          </div>
        </Backdrop>
      )}
    </div>
  );
};

export default AddCruiseForm;

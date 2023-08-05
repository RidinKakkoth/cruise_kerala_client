import React, { useEffect, useState } from "react";
import { addCruise, getCategories, getSingleCruiseData, updateCruise } from "../../../config/PartnerEndpoints";
import AddCruiseFormValidation from '../../../utils/AddCruiseFormValidation'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { ToastContainer, toast } from 'react-toastify';
import { Backdrop, CircularProgress } from '@mui/material';


import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import { useLocation, useNavigate } from "react-router-dom";

const EditCruiseForm = () => {

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get('id');
    const[name,setName]=useState("")
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
    // const[license,setLicense]=useState(null)
    const[categoryData,setCategoryData]=useState([])
    const[uploading,setUploading]=useState(false)
    const [cruiseData, setCruiseData] = useState(null);


    
    const navigate=useNavigate()

    const[selectedImages,setSelectedImages]=useState([])

    const handleSelectImage = (event) => {
      const selectedFiles = event.target.files;
      const selectedFilesArray = Array.from(selectedFiles);
      const imagesArray = selectedFilesArray?.map((file) => {
        return URL.createObjectURL(file);
      });
      setSelectedImages((previousImages) => [...previousImages, ...imagesArray]);
      setImages((prevImages) => [...prevImages, ...selectedFiles]);
    };
    
    
    const handleUpdateCruise = async(event) => {


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
         
           // Append images to the formData=============>+++++++++
          //  for (const image of images) {
          //    formData.append('images', image);
         
          //   }
            // formData.append('cruiseId', cruiseData._id);

         
           // Append the license file to the formData===================>++++++++++++++++++++
          //  formData.append('license', license);
         
           setUploading(true)

            const data=await updateCruise(formData,id)
            console.log(data,"*******************");
            if(data?.status){
                setUploading(false)
                Swal.fire({
                            icon: 'success',
                            title: 'Cruise updated successfully',
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
useEffect(() => {
  async function invoke(){
    const {data}=await getSingleCruiseData(id)
    console.log(data,"xxxxxxxxxxxxxxxxxx");
    setCruiseData(data)
   const{name,description,boarding,town,district,pin,rooms,baseRate,extraRate,maxGuest}=data
    setName(name) 
    setDescription(description)
    setBoarding(boarding)
    setTown(town)
    setDistrict(district)
    setPin(pin)
    setRooms(rooms)
    setBaseRate(baseRate)
    setExtraRate(extraRate)
    setMaxGuest(maxGuest)
    setCategory(data.category._id)
    setAC(data.Facilities[0].AC)
    setFood(data.Facilities[0].food)
    setTV(data.Facilities[0].TV)
    setPets(data.Facilities[0].Pets)
    setPartyHall(data.Facilities[0].partyHall)
    setFishing(data.Facilities[0].fishing)
    setGames(data.Facilities[0].games)
    setWifi(data.Facilities[0].wifi)
    setSelectedImages(data.Images)
    console.log(data.Facilities[0].partyHall,"[[[[[[[[[[[[[[");

  }
  invoke()
 }, [id]);




return (
  <> 
  {/* {console.log(cruiseData)} */}
  <button onClick={()=>{navigate(-1)}} className="ms-5 mt-3 flex gap-2 rounded bg-indigo-500 px-2 py-1 w-20 text-white">back <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
</svg>
</button>
  <div className="p-4 max-w-screen-md mx-auto bg-white shadow-md rounded-md mt-3 mb-3">
            <ToastContainer  />
    <form onSubmit={handleUpdateCruise} className="mt-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="mb-4">
          <label htmlFor="cruiseName" className="block text-sm font-medium text-gray-700">
            Cruise Name
          </label>
          <input
            type="text"
            name="cruiseName"
    defaultValue={name}
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
          defaultValue={category}
          onChange={(event) => setCategory(event.target.value)}              className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50 focus:ring-indigo-500 focus:border-indigo-500"
            // required
          >
            <option  defaultValue={cruiseData?.category?._id} value="">{cruiseData?.category.name}</option>
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
          defaultValue={description}
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
          defaultValue={boarding}
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
          defaultValue={town}
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
          defaultValue={district}
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
          defaultValue={pin}
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
          defaultValue={rooms}
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
          defaultValue={baseRate}
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
          defaultValue={extraRate}
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
          defaultValue={maxGuest}
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
          checked={TV}
          onChange={(e)=>{setTV(e.target.checked)}}
                        className="mr-2"
          />
          <label htmlFor="tv">TV</label>
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            name="ac"
          checked={AC}
            onChange={(e)=>{setAC(e.target.checked)}}             
             className="mr-2"
          />
          <label htmlFor="ac">AC</label>
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            name="games"
          checked={games}
          onChange={(e)=>{setGames(e.target.checked)}}
                        className="mr-2"
          />
          <label htmlFor="games">Games</label>
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            name="food"
          checked={food}
            onChange={(e)=>{setFood(e.target.checked)}}
            className="mr-2"
          />
          <label htmlFor="food">Food</label>
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            name="fishing"
          // checked={fishing}
          checked={fishing}
          onChange={(e)=>{setFishing(e.target.checked)}}              
          className="mr-2"
          />
          <label htmlFor="fishing">Fishing</label>
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            name="partyhall"
          checked={partyHall}
          onChange={(e)=>{setPartyHall(e.target.checked)}}              
          className="mr-2"
          />
          <label htmlFor="partyhall">Party Hall</label>
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            name="pets"
          checked={pets}
            onChange={(e)=>{setPets(e.target.checked)}}
                          className="mr-2"
          />
          <label htmlFor="pets">Pets</label>
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            name="wifi"
          checked={wifi}
          onChange={(e)=>{setWifi(e.target.checked)}}              
          className="mr-2"
          />
          <label htmlFor="wifi">WiFi</label>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
        {/* <div className="mb-4">
          <label htmlFor="licenseFile" className="block text-sm font-medium text-gray-700">
            License File
          </label>
          <input
            type="file"
            name="license"
            onChange={(e)=>{setLicense(e.target.files[0])}}
                          className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div> */}
        <div className="mb-4 w-[50%]">
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
        </div>                <div className='images flex gap-2'>

{selectedImages &&
  selectedImages?.map((image, index) => {
    return (
      <div key={image} className='image'>
        <img style={{ padding: 0, margin: 0 }} src={image} className='w-52' height='200' alt='uploads' />
        <DeleteForeverIcon
          className='del-btn'
          style={{ color: 'red', cursor: 'pointer' }}
          onClick={() => {
            setSelectedImages((previousImages) => previousImages.filter((_, i) => i !== index));
            setImages((prevImages) => prevImages.filter((_, i) => i !== index));
          }}
        />
        <p id='img-indx'>{index + 1}</p>
      </div>
    );
  })}


              </div>

      </div>

      <div className="mt-6 flex gap-2">
        <button
          type="submit"
          className="px-4 py-2 bg-green-500 border border-transparent rounded-md font-semibold text-white hover:bg-green-600 focus:outline-none focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
        >
          Save
        </button>
        <button
          
          className="px-4 py-2 bg-red-500 border border-transparent rounded-md font-semibold text-white hover:bg-red-600 focus:outline-none focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
        >
          Cancel
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
  </> 
);
};

export default EditCruiseForm;

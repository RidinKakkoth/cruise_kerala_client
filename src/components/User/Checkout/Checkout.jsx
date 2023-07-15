import React, { useEffect, useState } from "react";
import {  useLocation, useNavigate } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { baseApi } from "../../../store/Api";
import { useSelector } from "react-redux";
import axios from "axios";
import { useDispatch } from 'react-redux'
import { userAdd } from '../../../store/UserAuth'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';


function Checkout() {
  const [email,setEmail]=useState("")
  const[password,setPassword]=useState("")


  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state ? location.state.data : null;
const{totalAmount,guest,checkOutDate,checkInDate,cruiseId}=data

  const user = useSelector((state) => state.User);
  const isSignIn = user.userToken;


  useEffect(() => {
    if (data === null) {
      navigate("/cruises");
    }
  }, [data, navigate]);

  const handleBack = () => {
    navigate(-1);
  };

  const dispatch=useDispatch()
  
  const handleSignin=(e)=>{

    e.preventDefault()
axios.post(`${baseApi}userSignin`,{email,password},{withCredentials:true}).then((response)=>{

 const result=response.data.userLogin

 if(result.status){
  dispatch(userAdd({token:result.token,userName:result.name}))
  navigate(0)
  toast.success("Login Success",{position: "top-center"})
 }

}).catch((error)=>{toast.error(error.response.data.error,{position: "top-center"})})
  }


const initPayment=(recievedData)=>{
  const options={
    key:"rzp_test_drvVy05m61MDRI",
    amount:recievedData.amount,
    currency:recievedData.currency,
    name:"Cruise",
    image:"https://www.pngall.com/wp-content/uploads/8/Rudder-PNG-Picture.png",
    description:"test transaction",
    checkInDate,
    checkOutDate,
    guest,
    order_id:recievedData.id,
    handler:async(response)=>{
      try {
        await axios.post(`${baseApi}verify`,response,{withCredentials:true}).then((res)=>{
            const bookedData=res.data.bookedData
            localStorage.clear()
            navigate('/confirmation',{state:{data,bookedData}}) // Navigate to confirmation
          
        }).catch(err=>console.log(err))
      } catch (error) {
        console.log(error);
      }
    },
    theme:{
      color:"#3399cc",
    }
  }
  const rzp1=new window.Razorpay(options)
  rzp1.open()
}






const handlePayment=async()=>{

      try {

       axios.post(`${baseApi}orders`,{totalAmount,guest,checkOutDate,checkInDate,cruiseId},{withCredentials:true}).then((res)=>{
          

          initPayment(res.data.data)

        }).catch(err=>console.log(err))
      } catch (error) {
        console.log(error);
      }
}






  return (
    <div className="container mt-28 mb-5 bg-[#f0f0f0]">
              <ToastContainer autoClose={3000} />
      <div className="flex items-center mb-5 pt-3">
        <ArrowBackIosIcon
          onClick={handleBack}
          className="cursor-pointer hover:text-gray-500"
        />
        <h2>Request to book</h2>
      </div>
      <div className="grid grid-cols-1 ms-5  md:grid-cols-1 lg:grid-cols-2 gap-20  ">
        <div>
          <h3 className="mb-2">Your trip</h3>
          <hr />
          <h5 className="mb-3 mt-5  font-medium">Check In Date : </h5>
          <p className="font-normal mb-5">{data.checkInDate}</p>
          <h5 className="mb-3">Check Out Date : </h5>
          <p className="font-normal mb-5">{data.checkOutDate} </p>
          <h5>Guests : </h5>
          <p className="font-normal">{data.guest} </p>
        </div>

        <div>
          <div className="flex-col  items-center border rounded-4    bg-white w-[65%] ">
            <div className="grid grid-cols-[2fr_3fr]">
              <div>
                <img
                  className="mt-3 border ms-3 h-28 w-28 object-cover rounded-xl"
                  src={`${baseApi}files/${data.cruiseImg[0]}`}
                  alt="thumbnail"
                />
              </div>
              <div className="ms-1 mt-3 font-medium">
                <p className="text-lg">{data.cruiseName}</p>
                <p className="text-gray-500">{data.cruisePlace}</p>
              </div>
            </div>

            <h4 className="ms-3 mt-4 ">Price details</h4>
            <hr />

            <div className=" ">
              <div className="grid  grid-cols-2 w-[100%]">
                <div className="ms-4">
                  <p className="font-medium text-lg mb-3 ">
                    {data.baseRate} ₹ x {data.numOfNights} nights
                  </p>
                  <p className="font-medium text-lg mb-3">
                    {" "}
                    extra guest ({data.extraGuest}){" "}
                  </p>
                  <p className="font-medium text-lg mb-3">Taxes</p>
                  <hr />
                  <p className="font-medium text-lg mt-4">Total(INR)</p>

                </div>


                <div className="mx-auto">
                  <p className="font-normal text-lg mx-auto mb-3">
                    {data.baseRate * data.numOfNights}.00 ₹
                  </p>
                  <p className="font-normal text-lg mx-auto mb-3">
                    {data.extraGuest * 1000 * data.numOfNights}.00 ₹
                  </p>
                  <p className="font-normal text-lg mx-auto mb-3">0.0 ₹</p>
                  <hr />
                  <p className="font-normal text-lg mx-auto mb-4 mt-4">
                    {data.totalAmount}.00 ₹{" "}
                  </p>
                </div>
              </div>
<hr />              
              {
    isSignIn?               (
        <div className=" ">
  
            <button onClick={handlePayment}  className="border  rounded-xl w-[75%] mt-2 mb-3 ms-5 h-12 font-semibold text-white bg-[#011742] hover:bg-blue-950">Proceed to pay</button>
        </div> ):""
    
}

            </div>
            
          </div>
        </div>
      </div>

{
    isSignIn?"":(
        <div className="grid grid-cols-4 mt-4">
        <div className="col-span-4 ms-5 sm:col-span-2 md:col-span-2 lg:col-span-1 w-full sm:w-[150%] border rounded-4 bg-white mb-5">
          <h2 className="ms-4 mt-4">Log in to book</h2>
          <div className="ms-2 me-2">
            <input
              className="h-14 border rounded-t-xl  mt-3 w-full sm:w-75 pl-4"
              type="text"
              placeholder="email"
              onChange={(e) => { setEmail(e.target.value);}}
            />
            <input
              className="h-14 border rounded-b-xl  w-full sm:w-75 mb-4 pl-4"
              type="password"
              onChange={(e) => { setPassword(e.target.value);}}
              placeholder="password"
            />
        
          </div>
          <div className="flex justify-center">
            <button onClick={handleSignin} className="mb-5 mt-2 rounded border w-[30%] h-10 font-semibold text-white bg-[#011742] hover:bg-blue-950">
              Continue
            </button>
          </div>
        </div>
      </div>
    )
}

    </div>
  );
}

export default Checkout;

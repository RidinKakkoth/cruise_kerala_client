import React, { useEffect, useState } from "react";
import {  useLocation, useNavigate } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useSelector } from "react-redux";
import { useDispatch } from 'react-redux'
import { userAdd } from '../../../store/UserAuth'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {  orders, userSignin, verifyPayment } from "../../../config/UserEndpoints";
import CouponBox from './CouponModal';
import CouponShow from "./CouponShow";
import {useCookies} from 'react-cookie';

function Checkout() {
  const [email,setEmail]=useState("")
  const[password,setPassword]=useState("")
  const[discount,setDiscount]=useState(0)
  const [cookies, setCookie] = useCookies(['']);


  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state ? location.state.data : null;
  const{totalAmount,tax,fee,guest,cruiseId,percentage}=data
  const checkInDate=new Date(data.checkInDate)

  const discountAmntLocal = localStorage?.getItem('discount');

  const getOfferId = localStorage?.getItem('offerId');
  const offerId = JSON.parse(getOfferId)
  const discountAmnt=JSON.parse(discountAmntLocal)
  
  const checkOutDate=new Date(data.checkOutDate) //issues with date picker so converted

  
  const user = useSelector((state) => state.User);
  const isSignIn = user.userToken;

//================================================================================

const [showCouponModal, setShowCouponModal] = useState(false);

const openCouponShowModal = () => {

  setShowCouponModal(true);
};

const closeCouponShowModal = () => {
  setShowCouponModal(false);
};

//================================================================================


  useEffect(() => {
    if (data === null) {
      navigate("/cruises");
    }
  }, [data, navigate]);

  const handleBack = () => {
    navigate(-1);
  };

  const dispatch=useDispatch()
  
  const handleSignin=async(e)=>{

    e.preventDefault()

    const data=await userSignin(email,password)
        const result=data?.userLogin
        if(data?.status==="failed"){
         toast.error(data?.message,{position: "top-center"})
        }
          else if(result?.status){
            const ageInMinutes = 60; 

            const currentDate = new Date();
            const expirationDate = new Date(currentDate.getTime() + ageInMinutes * 60 * 1000);
            setCookie("userCookie", result.token, { path: '/', expires: expirationDate });
             dispatch(userAdd({token:result.token,userName:result.name}))
             navigate(0)
             }
  }


const initPayment=(recievedData)=>{
  
  const options={
    key:"rzp_test_drvVy05m61MDRI",
    amount:recievedData.amount,
    currency:recievedData.currency,
    name:"Cruise",
    image:"https://www.pngall.com/wp-content/uploads/8/Rudder-PNG-Picture.png",
    description:"test transaction",
    checkInDate:checkInDate,
    checkOutDate:checkOutDate,

    guest,
    order_id:recievedData.id,
    handler:async(response)=>{
      try {
        response.offerId=offerId
        const newData=await verifyPayment(response)
        if(newData){
            const bookedData=newData.bookedData
            localStorage.clear()
            navigate('/confirmation',{state:{data,bookedData}})
        }

      } catch (error) {
        console.log(error);
      }
    },
    theme:{
      color:"#011742",
    }
  }
  const rzp1=new window.Razorpay(options)
  rzp1.open()
}






const handlePayment=async()=>{

      try {

        const data=await orders(totalAmount,guest,checkOutDate,checkInDate,cruiseId,discountAmnt,tax,fee)
       
        if(data){
          initPayment(data.data)
         
        }

      } catch (error) {
        console.log(error);
      }
}
const [showCouponBox, setShowCouponBox] = useState(false);

const handleToggleCouponBox = () => {
  setShowCouponBox(!showCouponBox);
};

const handleApplyCoupon =async (status,offer) => {
  // Do something with the coupon code, e.g., call an API to validate the coupon
  console.log('Applying coupon code:', status);
  setShowCouponBox(!showCouponBox);
  if(status){
    setDiscount(offer.discount)
    localStorage.setItem("discount", JSON.stringify(offer.discount));
    localStorage.setItem("offerId", JSON.stringify(offer._id));

  }

};


const isSmallScreen = window.innerWidth < 640;
  return (
    <div className={`mt-28 mb-5 bg-[#f0f0f0] ${!isSmallScreen ? 'container mx-auto' : ''}`}>
              <ToastContainer autoClose={1000} />
      <div className="flex items-center mb-5 pt-3">
        <ArrowBackIosIcon
          onClick={handleBack}
          className="cursor-pointer hover:text-gray-500"
        />
        <h2>Request to book</h2>
      </div>
      <div className="grid  grid-cols-1 ms-5  md:grid-cols-1 lg:grid-cols-2 gap-20  ">
        <div>
          <h3 className="mb-2">Your trip</h3>
          <hr />
          <h5 className="mb-3 mt-5  font-medium">Check In Date : </h5>
          <p className="font-normal mb-5">{checkInDate.toDateString()}</p>
          <h5 className="mb-3">Check Out Date : </h5>
          <p className="font-normal mb-5">{checkOutDate.toDateString()}</p>

          <h5>Guests : </h5>
          <p className="font-normal">{data.guest} </p>





        </div>
  
        <div>
          <div className="flex-col  items-center border rounded-4    bg-white sm:w-[72%] ">
            <div className="grid grid-cols-[2fr_3fr]">
              <div>
                <img
                  className="mt-3 border ms-2 h-28 w-28 object-cover rounded-xl"
                  src={data.cruiseImg[0]}
                  alt="thumbnail"
                />
              </div>
              <div className="ms-1 mt-3 font-medium">
                <p className="text-lg ms-3  sm:ms-0">{data.cruiseName}</p>
                <p className="text-gray-500 ms-3  sm:ms-0">{data.cruisePlace}</p>
              </div>
            </div>

            <h4 className="ms-3 mt-4 ">Price details</h4>
            <hr />

            <div className=" ">
              <div className="grid  grid-cols-2 w-[100%]">
                <div className="ms-4">
                  <p className="font-medium text-base sm:text-lg mb-3 ">
                    {/* {data.baseRate} ₹ x {data.numOfNights} nights */}
                    {(data.totalAmount-tax*2)/data.numOfNights} ₹ x {data.numOfNights} day
                  </p>
                  <p className="font-medium text-base sm:text-lg mb-3">
                    {" "}
                    extra guest ({data.extraGuest}){" "}
                  </p>
                  <p className="font-medium text-base sm:text-lg mb-3">Taxes </p>
                  <p className="font-medium text-base sm:text-lg mb-3">Cruise Fee </p>
                  <hr />
                  <p className="font-medium text-base sm:text-lg mb-3">Sub-Total </p>
                  {(percentage===0||"undefined")&&<p className="font-medium text-base sm:text-lg mb-3">Discount </p>}
                  <p className="font-medium text-base sm:text-lg mt-3">Total(INR)</p>

                </div>


                <div className="mx-auto">
                  <p className="font-normal text-base sm:text-lg mx-auto mb-3">
                  {(data.totalAmount-tax*2)}.00 ₹
                    {/* {data.baseRate * data.numOfNights}.00 ₹ */}
                  </p>
                  <p className="font-normal text-base sm:text-lg mx-auto mb-3">
                    {data.extraGuest * 1000 * data.numOfNights}.00 ₹
                  </p>
                  <p className="font-normal text-base sm:text-lg mx-auto mb-3">{tax}.00 ₹</p>
                  <p className="font-normal text-base sm:text-lg mx-auto mb-3">{fee}.00 ₹</p>
                  <hr />
                  <p className="font-normal text-base sm:text-lg mx-auto mb-3 mt-3">
                    {data.totalAmount}.00 ₹{" "}
                  </p>
                 { (percentage===0||"undefined")&& <p className="font-normal text-base sm:text-lg mx-auto mb-3 text-green-400">{discountAmnt}.00 ₹</p>}
                  <p className="font-normal text-base sm:text-lg mx-auto mb-4 mt-3">
                    {data.totalAmount-discountAmnt}.00 ₹{" "}
                  </p>
                </div>

                <div>
               

{showCouponModal && <CouponShow isOpen={showCouponModal} onClose={closeCouponShowModal} />}


   
      {showCouponBox && (
        <CouponBox
          onApply={handleApplyCoupon}
          onClose={() => setShowCouponBox(false)}
        />
      )}
    </div>

              </div>
              {
    
    isSignIn&&(percentage===0||"undefined" )&& 
    <div className="flex justify-around">
     <button className="underline ms-4 font-medium" onClick={handleToggleCouponBox}>
       {showCouponBox ? '' : 'Enter a coupon'}
     </button>
     <p  className=" text-indigo-700 font-semibold cursor-pointer px-4 flex gap-2" onClick={openCouponShowModal} > <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M9 14.25l6-6m4.5-3.493V21.75l-3.75-1.5-3.75 1.5-3.75-1.5-3.75 1.5V4.757c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0c1.1.128 1.907 1.077 1.907 2.185zM9.75 9h.008v.008H9.75V9zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm4.125 4.5h.008v.008h-.008V13.5zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
</svg>

                    Coupons
               </p>
     </div>
}
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
        <div className="col-span-4  sm:col-span-2 md:col-span-2 lg:col-span-1 w-full sm:w-[150%] border rounded-4 bg-white mb-5">
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

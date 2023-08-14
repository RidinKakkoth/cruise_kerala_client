import React, { useState } from 'react'
import {Link, useNavigate} from "react-router-dom"
import './SignUp.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { partnerEmailCheck, partnerSignUp, sendOTP, verifyOTP } from '../../../config/PartnerEndpoints';
import PartnerSignupValidation from '../../../utils/PartnerSignupValidation '
import OtpModal from '../../Shared/OtpModal/OtpModal';

function SignUp() {
    const [name,setName]=useState("")
    const [email,setEmail]=useState("")
    const [phone,setPhone]=useState("")
    const [company,setCompany]=useState("")
    const[password,setPassword]=useState("")
    const[confirmPassword,setConfirmPassword]=useState("")
    const [passwordsMatch, setPasswordsMatch] = useState(true);

    const [otpModalOpen, setOtpModalOpen] = useState(false);
    const { validateForm } = PartnerSignupValidation(); // Use the custom hook

    const navigate=useNavigate()
    const handleConfirmPasswordChange = (e) => {
      setPasswordsMatch(true)
      const confirmPasswordValue = e.target.value;
      setPasswordsMatch(password === confirmPasswordValue);
      setConfirmPassword(confirmPasswordValue);
      
    };
    
    const handleSubmit=async(e)=>{
    
    e.preventDefault()

    const errors = validateForm({ name,company, email, phone, password }); // Pass form values to the validation function

      if (Object.keys(errors).length > 0) {
        // Display error messages using toast
        Object.values(errors).forEach((message) => {
          toast.error(message, { position: 'top-center' });
        });
        return;
      }
      setPasswordsMatch(password === confirmPassword);
      if (!passwordsMatch) {
        toast.error("Passwords don't match", { position: 'top-center' });
        return;
      }
      const userExist=await partnerEmailCheck(email)
      

      if(userExist.status){
        toast.error("Email already exist",{ position: 'top-center' })
      } 
      else{

        const data= await sendOTP(email)
        if(data.status){
          setOtpModalOpen(true)
        }else if(data.status===false){
          toast.error(data.message,{ position: 'top-center' })
        }
      }
    
    } 





    const handleVerifyOTP = async (otp) => {
      try {
        const verifiedData = await verifyOTP(email, otp);
  
        if (verifiedData.status) {
          toast.success('Verified..Please login', { position: 'top-center' });
          // Wait for the toast to be displayed, then call the signup function
          setTimeout(async () => {
            await partnerSignUp(email,password,phone,name,company)
              .then((data) => {
                if (data.status === 'failed') {
                  toast.error(data.message, { position: 'top-center' });
                } else {
                  navigate('/partner');
                }
              })
              .catch((error) => {
                console.log(error);
              });
          }, 3000);
        }
  
        setOtpModalOpen(false);
      } catch (error) {
        console.log(error);
      }
    };

    const handleResendOTP = async () => {
      const data = await sendOTP(email); // Call sendOTP function
      if (data.status) {
        toast.success('OTP Resent', { position: 'top-center' });
      } else if (data.status === false) {
        toast.error(data.message, { position: 'top-center' });
      }
    }


    
    
      return (
        <div class=" magicpattern-p mx-auto   ">
        <ToastContainer autoClose={2000} />

<div class="flex justify-center items-center h-[100vh]  px-6  ">

<div class="w-full xl:w-2/4 lg:w-11/12 h-3/4  flex rounded-2xl shadow">

{/* <div
class="w-full  bg-gray-400  hidden lg:block lg:w-5/12 bg-cover  rounded-l-lg "
// style="background-image: url('https://source.unsplash.com/Mv9hjnEUHR4/600x800')"
>
<img src="https://res.cloudinary.com/ddymh3cnk/image/upload/v1691746665/CruiseData/partnership-4-512_bquaos.png" className='rounded-l-lg h-[100%] object-cover' alt="" />
</div> */}
<div class="w-full bg-gray-200 hidden lg:block lg:w-5/12 rounded-l-lg">
    <div class="h-[50%] bg-cover rounded-tl-lg rounded-bl-lg">
  
        <img src="https://res.cloudinary.com/ddymh3cnk/image/upload/v1691673832/CruiseData/favicon_nxjooo.png" class="rounded-bl-lg h-full object-cover" alt="" />
    </div>
    <div class="h-[50%]">
        <img src="https://res.cloudinary.com/ddymh3cnk/image/upload/v1691746665/CruiseData/partnership-4-512_bquaos.png" class="rounded-bl-lg h-full object-cover  p-5" alt="" />
    </div>
</div>

<div class="w-full  lg:w-7/12 bg-white p-1 rounded-lg lg:rounded-l-none">
<h3 class="pt-2 text-2xl text-center">Create an Account!</h3>
<form onSubmit={handleSubmit} class="px-8 pt-3 pb-6 mb-4 bg-white rounded">
  <div class="mb-3 md:flex md:justify-between">
    <div class="mb-3 md:mr-2 md:mb-0">
      <label class="block mb-2 text-sm font-bold text-gray-700" for="firstName">
        Full Name
      </label>
      <input
        class="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
        id="FullName"
        type="text"
        onChange={(e) => {
          setName(e.target.value);
      }}
        placeholder="First Name"
      />
    </div>
    <div class="md:ml-2">
      <label class="block mb-2 text-sm font-bold text-gray-700" for="lastName">
        Phone
      </label>
      <input
        class="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
        id="lastName"
        type="number"
        onChange={(e) => {
          setPhone(e.target.value);
        }}
        placeholder="Phone number"
      />
    </div>
  </div>
  <div class="mb-3">
    <label class="block mb-2 text-sm font-bold text-gray-700" for="email">
      Email
    </label>
    <input
      class="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
      id="email"
      type="email"
      onChange={(e) => {
        setEmail(e.target.value);
      }}
      placeholder="Email"
    />
  </div>
  <div class="mb-3">
    <label class="block mb-2 text-sm font-bold text-gray-700" for="email">
      Company
    </label>
    <input
      class="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
      id="email"
      type="text"
      onChange={(e) => {
        setCompany(e.target.value);
      }}
      placeholder="Email"
    />
  </div>
  <div class="mb-3 md:flex md:justify-between">
    <div class="mb-3 md:mr-2 md:mb-0">
      <label class="block mb-2 text-sm font-bold text-gray-700" for="password">
        Password
      </label>
      <input
        class="w-full px-3 py-2  text-sm leading-tight text-gray-700 border border-red-500 rounded shadow appearance-none focus:outline-none focus:shadow-outline"
        id="password"
        onChange={(e) => {
          setPassword(e.target.value);
          setPasswordsMatch(true)
        }}
        type="password"
        
        placeholder="******************"
      />
    </div>
    <div class="md:ml-2">
      <label class="block mb-2 text-sm font-bold text-gray-700" for="c_password">
        Confirm Password
      </label>
      <input
  className={`w-full px-3 py-2 text-sm leading-tight text-gray-700 ${
    passwordsMatch ? "border outline-green-500" : "border  outline-red-600"
  } rounded shadow `}
  id="c_password"
  onChange={handleConfirmPasswordChange}
  type="password"
  placeholder="******************"
/>

    </div>
  </div>
  <div class="mb-3 text-center">
    <button
      class="w-full px-4 py-2 font-bold text-white bg-[#235d2d] rounded-full hover:bg-[#2b7137] focus:outline-none focus:shadow-outline"
      type="submit"
    >
      Register 
    </button>
  </div>
  <hr class="mb-2 border-t" />

  <div class="text-center  mt-1">
    <p
      class="cursor-pointer inline-block text-sm text-[#235d2d] align-baseline hover:text-[#2b7137]"
      onClick={()=>{navigate("/partner")}}
    >
      Already have an account? Login!
    </p>
    
  </div>

</form>
  </div>
  </div>
  <OtpModal user={email} isOpen={otpModalOpen} handleResendOTP={handleResendOTP} onRequestClose={() => setOtpModalOpen(false)} handleVerifyOTP={handleVerifyOTP} />

  </div>
  </div>
      )
}

export default SignUp

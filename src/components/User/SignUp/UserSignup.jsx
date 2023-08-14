import React, { useState } from 'react'
import { useNavigate} from "react-router-dom"
import './UserSignup.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { sendOTP, userEmailCheck, userSignUp, verifyOTP } from '../../../config/UserEndpoints';
import OtpModal from '../../Shared/OtpModal/OtpModal';
import UserSignupValidation from '../../../utils/UserSignupValidation'


function UserSignup() {
    const [name,setName]=useState("")
    const [email,setEmail]=useState("")
    const [phone,setPhone]=useState("")
    const[password,setPassword]=useState("")
    const[confirmPassword,setConfirmPassword]=useState("")
    const [passwordsMatch, setPasswordsMatch] = useState(true);
    
    const [otpModalOpen, setOtpModalOpen] = useState(false);
    const { validateForm } = UserSignupValidation(); // Use the custom hook


    
    const navigate=useNavigate()
    const handleConfirmPasswordChange = (e) => {
      setPasswordsMatch(true)
      const confirmPasswordValue = e.target.value;
      setPasswordsMatch(password === confirmPasswordValue);
      setConfirmPassword(confirmPasswordValue);
      
    };
    
    const handleSubmit = async(e) => {
      e.preventDefault();
      const errors = validateForm({ name, email, phone, password }); // Pass form values to the validation function

      if (Object.keys(errors).length > 0) {
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
     
      const userExist=await userEmailCheck(email)

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
   
    };
    const handleResendOTP = async () => {
      const data = await sendOTP(email); // Call sendOTP function
      if (data.status) {
        toast.success('OTP Resent', { position: 'top-center' });
      } else if (data.status === false) {
        toast.error(data.message, { position: 'top-center' });
      }
    }

  
    const handleVerifyOTP = async (otp) => {
      try {
        const verifiedData = await verifyOTP(email, otp);
  
        if (verifiedData.status) {
          toast.success('Verified..Please login', { position: 'top-center' });
          // Wait for the toast to be displayed, then call the signup function
          setTimeout(async () => {
            await userSignUp(email, password, phone, name)
              .then((data) => {
                if (data.status === 'failed') {
                  toast.error(data.message, { position: 'top-center' });
                } else {
                  navigate('/signin');
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


    
      return (

		
		<div class=" magicpattern mx-auto   ">
                <ToastContainer autoClose={2000} />

<div class="flex justify-center items-center h-[100vh]  px-6  ">
		
    <div class="w-full xl:w-2/4 lg:w-11/12 h-3/4  flex rounded-2xl shadow">
      
      <div
        class="w-full  bg-gray-400  hidden lg:block lg:w-5/12 bg-cover  rounded-2xl "
        // style="background-image: url('https://source.unsplash.com/Mv9hjnEUHR4/600x800')"
      >
        <img src="https://res.cloudinary.com/ddymh3cnk/image/upload/v1691731640/CruiseData/dl.beatsnoop.com-hq-502613845-IK7hRUwL1O_rsoal6.jpg" className='rounded-l-lg h-[100%]' alt="" />
      </div>
      
      <div class="w-full  lg:w-7/12 bg-white p-1 rounded-lg lg:rounded-l-none">
        <h3 class="pt-4 text-2xl text-center">Create an Account!</h3>
        <form onSubmit={handleSubmit} class="px-8 pt-6 pb-6 mb-4 bg-white rounded">
          <div class="mb-3 md:flex md:justify-between">
            <div class="mb-4 md:mr-2 md:mb-0">
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
          <div class="mb-4">
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
          <div class="mb-3 md:flex md:justify-between">
            <div class="mb-4 md:mr-2 md:mb-0">
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

            {!passwordsMatch && (
      <p className="text-red-500 flex gap-2 text-sm mt-2"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="red" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
    </svg>
    Passwords do not match</p>
    )}
            </div>
          </div>
          <div class="mb-3 text-center">
            <button
              class="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Register 
            </button>
          </div>
          <hr class="mb-2 border-t" />

          <div class="text-center  mt-3">
            <p
              class="cursor-pointer inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
              onClick={()=>{navigate("/signin")}}
            >
              Already have an account? Login!
            </p>
            
          </div>
           <div className='text-center'>
           <p
              class="cursor-pointer inline-block text-sm  text-blue-500 align-baseline hover:text-blue-800"
              onClick={()=>{navigate("/partner/signUp")}}
            >
              Become a partner? Signup!
            </p>
           </div>
        </form>
					</div>
					</div>
          <OtpModal user={email} handleResendOTP={handleResendOTP} isOpen={otpModalOpen} onRequestClose={() => setOtpModalOpen(false)} handleVerifyOTP={handleVerifyOTP} />

					</div>
					</div>

      )
}

export default UserSignup

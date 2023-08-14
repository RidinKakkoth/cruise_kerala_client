import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { partnerAdd } from '../../../store/PartnerAuth'
import './Login.css'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { partnerSignin } from '../../../config/PartnerEndpoints';
import EmailModal from '../../Shared/EmailModal/EmailModal'
import {useCookies} from 'react-cookie';


function PartnerLogin() {
const dispatch=useDispatch()
const navigate=useNavigate()

const [email,setEmail]=useState("")
const[password,setPassword]=useState("")
const [emailModalOpen, setEmailModalOpen] = useState(false);

const handleForgot=()=>{
  setEmailModalOpen(true)
}

const [cookies, setCookie] = useCookies(['']);
const handleSubmit = async (e) => {
    
  e.preventDefault()

const data=await partnerSignin(email,password)
    const result=data?.partnerLogin
    if(data.status==="failed"){
     toast.error(data.message,{position: "top-center"})
    }
      else if(result.status){
        const ageInMinutes = 60; 

        const currentDate = new Date();
        const expirationDate = new Date(currentDate.getTime() + ageInMinutes * 60 * 1000);
        setCookie("partnerCookie", result.token, { path: '/', expires: expirationDate });

         dispatch(partnerAdd({token:result.token}))
         navigate('/partner/dashboard')
         }
}


  return (
   
<section  class="border-red-500 magicpattern-partner  min-h-screen  flex items-center justify-center">
<ToastContainer autoClose={3000} />
  <div class="bg-gray-200  p-5 flex rounded-2xl  shadow-lg max-w-3xl">
    <div class="md:w-1/2 px-4">
      <h2 class="text-2xl font-bold text-[#235d2d]">Login</h2>
      <p class="text-sm mt-4 text-[#235d2d]">If you have an account, please login</p>
      <form class="mt-6" onSubmit={handleSubmit}  >
        <div>
          <label class="block text-gray-700">Email Address</label>
          <input type="email"                 onChange={(e) => {
                  setEmail(e.target.value);
                }} name="" id="" placeholder="Enter Email Address" class="w-full px-4 py-3 rounded-lg bg-white mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none" autofocus autocomplete required />
        </div>

        <div class="mt-4">
          <label class="block text-gray-700">Password</label>
          <input type="password"                 onChange={(e) => {
                  setPassword(e.target.value);
                }} name="" id="" placeholder="Enter Password" minlength="6" class="w-full px-4 py-3 rounded-lg bg-white mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none" required />
        </div>

        <div class="text-right mt-2">
          <p onClick={handleForgot} class="text-sm font-semibold  text-gray-700 hover:text-[#2b7137] cursor-pointer focus:text-blue-700">Forgot Password?</p>
        </div>

        <button type="submit" class="w-full block bg-[#235d2d] hover:bg-[#2b7137] focus:bg-blue-400 text-white font-semibold rounded-lg
              px-4 py-3 mt-6">Log In</button>
      </form>

      <div class="mt-7 grid grid-cols-3 items-center text-gray-500">
        <hr class="border-gray-500" />
        <p class="text-center text-sm">OR</p>
        <hr class="border-gray-500" />
      </div>

      

      <div class="text-sm flex justify-between items-center mt-3">
        <p>Not a partner?</p>
        <button onClick={()=>{navigate('/partner/signUp')}} class="py-2 px-5 ml-3 bg-[#235d2d] text-white border rounded-xl hover:scale-110 duration-300 border-green-800  ">Register</button>
      </div>
    </div>

    <div class="w-1/2 md:block hidden my-auto ">
      <img src="https://res.cloudinary.com/ddymh3cnk/image/upload/v1691746664/CruiseData/partnership-01-512_jnlp4a.png" class="rounded-2xl" alt="page img" />
    </div>

  </div>
  <EmailModal role={"partner"} isOpen={emailModalOpen} onRequestClose={() => setEmailModalOpen(false)} handleForgot={handleForgot}  />

</section>

  )
}

export default PartnerLogin

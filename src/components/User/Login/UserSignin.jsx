import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { userAdd } from '../../../store/UserAuth'
import './UserSignin.css'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { userSignin } from '../../../config/UserEndpoints';
import EmailModal from '../../Shared/EmailModal/EmailModal';
import {useCookies} from 'react-cookie';


function UserSignin() {
const dispatch=useDispatch()
const navigate=useNavigate()

const [cookies, setCookie] = useCookies(['']);

const [email,setEmail]=useState("")
const[password,setPassword]=useState("")
const [emailModalOpen, setEmailModalOpen] = useState(false);

const handleForgot=()=>{
    setEmailModalOpen(true)
}


const handleSubmit = async (e) => {
  e.preventDefault();

  const data = await userSignin(email, password);
  const result = data?.userLogin;
  if (data.status === "failed") {
    toast.error(data.message, { position: "top-center" });
  } else if (result.status) {

    const ageInMinutes = 60; 

    const currentDate = new Date();
    const expirationDate = new Date(currentDate.getTime() + ageInMinutes * 60 * 1000);
    setCookie("userCookie", result.token, { path: '/', expires: expirationDate });
    dispatch(userAdd({ token: result.token, userName: result.name }));
    
    navigate('/');
  }
};


  return (
    
 
    
<section  class="border-red-500 magicpatterns  min-h-screen  flex items-center justify-center">
<ToastContainer autoClose={3000} />
  <div class="bg-gray-200  p-5 flex rounded-2xl  shadow-lg max-w-3xl">
    <div class="md:w-1/2 px-4">
      <h2 class="text-2xl font-bold text-[#120f28]">Login</h2>
      <p class="text-sm mt-4 text-[#120f28]">If you have an account, please login</p>
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
          <p onClick={handleForgot} class="text-sm font-semibold  text-gray-700 hover:text-[#120f28] cursor-pointer focus:text-blue-700">Forgot Password?</p>
        </div>

        <button type="submit" class="w-full block bg-[#120f28] hover:bg-[#1d193e] focus:bg-blue-400 text-white font-semibold rounded-lg
              px-4 py-3 mt-6">Log In</button>
      </form>

      <div class="mt-7 grid grid-cols-3 items-center text-gray-500">
        <hr class="border-gray-500" />
        <p class="text-center text-sm">OR</p>
        <hr class="border-gray-500" />
      </div>

      {/* <button class="bg-white border py-2 w-full rounded-xl mt-5 flex justify-center items-center text-sm hover:scale-105 duration-300 ">
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="w-6 h-6" viewBox="0 0 48 48"><defs><path id="a" d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z"/></defs><clipPath id="b"><use xlink:href="#a" overflow="visible"/></clipPath><path clip-path="url(#b)" fill="#FBBC05" d="M0 37V11l17 13z"/><path clip-path="url(#b)" fill="#EA4335" d="M0 11l17 13 7-6.1L48 14V0H0z"/><path clip-path="url(#b)" fill="#34A853" d="M0 37l30-23 7.9 1L48 0v48H0z"/><path clip-path="url(#b)" fill="#4285F4" d="M48 48L17 24l-4-3 35-10z"/></svg>
        <span class = "ml-4">Login with Google</span>
      </button> */}

      <div class="text-sm flex justify-between items-center mt-3">
        <p>New here..</p>
        <button onClick={()=>{navigate('/signUp')}} class="py-2 px-5 ml-3 bg-[#120f28] text-white border rounded-xl hover:scale-110 duration-300 border-[#1c1840]  ">Register</button>
      </div>
    </div>

    <div class="w-1/2 md:block hidden ">
      <img src="https://res.cloudinary.com/ddymh3cnk/image/upload/v1691673871/CruiseData/sigin_o8mbr1.jpg" class="rounded-2xl" alt="page img" />
    </div>

  </div>
  <EmailModal role={"user"} isOpen={emailModalOpen} onRequestClose={() => setEmailModalOpen(false)} handleForgot={handleForgot}  />

</section>

  )
}

export default UserSignin

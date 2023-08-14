import "./Login.css";
import {useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import { adminAdd } from "../../../store/AdminAuth";
import React, { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import {useCookies} from 'react-cookie';
import 'react-toastify/dist/ReactToastify.css';
import { adminSignin } from "../../../config/AdminEndpoints";



function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch=useDispatch()
  const navigate=useNavigate()

  const [cookies, setCookie] = useCookies(['']);
  const handleSubmit = async (e) => {
    
    e.preventDefault()

const data=await adminSignin(email,password)
      const result=data?.adminLogin
      if(data?.status==="failed"){
       toast.error(data.message,{position: "top-center"})
      }
        else if(result.status){
          const ageInMinutes = 60; 

          const currentDate = new Date();
          const expirationDate = new Date(currentDate.getTime() + ageInMinutes * 60 * 1000);  
          setCookie("adminCookie", result.token, { path: '/', expires: expirationDate });

             dispatch(adminAdd({token:result.token}))
              navigate('/admin/dashboard')
           }
  }

  return (
    
<section  class="border-red-500 magicpattern-a  min-h-screen  flex items-center justify-center">
<ToastContainer autoClose={3000} />
  <div class="bg-gray-200  p-5 flex rounded-2xl  shadow-lg max-w-3xl">
    <div class="md:w-1/2 px-4">
      <h2 class="text-2xl font-bold text-[#306e8b]">Login</h2>
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

        <button type="submit" class="w-full block bg-[#306e8b] hover:bg-blue-400 focus:bg-blue-400 text-white font-semibold rounded-lg
              px-4 py-3 mt-6">Log In</button>
      </form>




    </div>

    <div class="w-1/2 md:block hidden ">
      <img src="https://res.cloudinary.com/ddymh3cnk/image/upload/v1691673832/CruiseData/favicon_nxjooo.png" class="rounded-2xl" alt="page img" />
    </div>

  </div>

</section>

  );
}

export default Login;

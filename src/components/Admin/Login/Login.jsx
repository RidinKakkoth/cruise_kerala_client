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
    <div>
      <ToastContainer autoClose={3000} />
      <div className="admin-login-body">
        <div className="admin-card">
        <img
        className='mx-auto mt-2'
            src="https://www.pngall.com/wp-content/uploads/8/Rudder-PNG-Picture.png" // Replace with the URL or path to your image
            alt=""
            style={{ width: '80px', height: '80px', marginRight: '8px' }}
          />
          <h3 className='text-center italic font-serif text-white'>Cruise</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="admin-label">Email</label>
              <input
                type="email"
                required
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label className="admin-label">Password</label>
              <input
                type="password"
                required
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                name="password"
                className="form-control"
              />
            </div>

            <div className="admin-btn-div">
              <button type="submit" className="adminlogin-btn rounded-3xl shadow">
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;

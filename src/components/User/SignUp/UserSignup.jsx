import React, { useState } from 'react'
import {Link, useNavigate} from "react-router-dom"
import axios from 'axios'
import { baseApi } from '../../../store/Api'
import './UserSignup.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function UserSignup() {
    const [name,setName]=useState("")
    const [email,setEmail]=useState("")
    const [phone,setPhone]=useState("")
    const[password,setPassword]=useState("")

    
    const navigate=useNavigate()
    
    const handleSubmit = (e) => {
      e.preventDefault();
    
      axios
        .post(`${baseApi}userSignUp`, { email, password, phone, name }, { withCredentials: true })
        .then(() => {
          toast.success("Success", {
            position: "top-center",
            onClose: () => navigate("/signin")
          });
        })
        .catch((error) => {
          if (error.response && error.response.data && error.response.data.error) {
            console.log(error.response.data.error);
            toast.error(error.response.data.error, { position: "top-center" });
          } else {
            console.log(error);
            toast.error("An error occurred", { position: "top-center" });
          }
        });
    };
    
      return (
        <div>
          <ToastContainer autoClose={2000} />
          <div className="user-login-body">
            <div className="user-card">
            <img
        className='mx-auto mt-2'
            src="https://www.pngall.com/wp-content/uploads/8/Rudder-PNG-Picture.png" // Replace with the URL or path to your image
            alt=""
            style={{ width: '80px', height: '80px', marginRight: '8px' }}
          />
          <h3 className='text-center italic font-serif text-white'>Cruise</h3>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label className="user-label">Full Name</label>
                  <input
                  
                    type="text"
                    onChange={(e) => {
                        setName(e.target.value);
                    }}
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label className="user-label">Email</label>
                  <input
                  
                    type="email"
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    className="form-control"
                  />
                </div>
    
                <div className="form-group">
                  <label className="user-label">Phone</label>
                  <input
                  
                    type="number"
                       onChange={(e) => {
                      setPhone(e.target.value);
                    }}
                    className="form-control"
                  />
                </div>


                <div className="form-group">
                  <label className="user-label">Password</label>
                  <input
                  
                    type="password"
                                  onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    className="form-control"
                  />
                </div>

    
                <div className="user-btn-div">
                <button type="submit" className="adminlogin-btn rounded-3xl shadow">
                Sign up
              </button>
                </div>
              </form>
                    
                    <div  style={{display:"flex",justifyContent:"center",fontWeight:"500"}}>
                      <p >already user?</p>
                     <Link style={{textDecoration:"none",color:"blue"}} to={'/signin'}>login</Link>
                    </div>
            </div>
          </div>
        </div>
      )
}

export default UserSignup

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
    
    const handleSubmit=(e)=>{
    
    e.preventDefault()


    axios.post(`${baseApi}userSignUp`,{email,password,phone,name},{withCredentials:true}).then((response)=>{
    
      if(response)
        // navigate('/signup')
        console.log("hhhhhhhhhhhhhhhhhhh");

    }).catch((error)=>{toast.error(error.response.data.error,{position: "top-center"})
    console.log(error.response.data.error);})
    
    } 
    
    
      return (
        <div>
          <ToastContainer autoClose={3000} />
          <div className="user-login-body">
            <div className="user-card">
              <h1 className="user-login">SIGNUP</h1>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label className="user-label">Full Name</label>
                  <input
                  required
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
                  required
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
                  required
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
                  required
                    type="password"
                                  onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    className="form-control"
                  />
                </div>

    
                <div className="user-btn-div">
                  <button type="submit" className="userlogin-btn">
                    SignUp
                  </button>
                </div>
              </form>
                    
                    <div  style={{display:"flex",justifyContent:"center",fontWeight:"500"}}>
                      <p >already user?</p>
                     <Link style={{textDecoration:"none",color:"blue"}} to={'/user'}>login</Link>
                    </div>
            </div>
          </div>
        </div>
      )
}

export default UserSignup
import React, { useState } from 'react'
import {Link, useNavigate} from "react-router-dom"
import axios from 'axios'
import { partnerApi } from '../../../store/Api'
import './SignUp.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function SignUp() {
    const [name,setName]=useState("")
    const [email,setEmail]=useState("")
    const [phone,setPhone]=useState("")
    const [company,setCompany]=useState("")
    const[password,setPassword]=useState("")
    // const[error,setError]=useState(null)
    
    const navigate=useNavigate()
    
    const handleSubmit=(e)=>{
    
    e.preventDefault()

    axios.post(`${partnerApi}partnerSignUp`,{email,password,phone,name,company},{withCredentials:true}).then((response)=>{
    
      if(response)
        navigate('/partner')

    }).catch((error)=>{toast.error(error.response.data.error,{position: "top-center"})
    console.log(error.response.data.error);})
    
    }
    
    
      return (
        <div>
          <ToastContainer autoClose={3000} />
          <div className="partner-login-body">
            <div className="partner-card">
              <h1 className="partner-login">Partner SignUp</h1>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label className="partner-label">Full Name</label>
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
                  <label className="partner-label">Email</label>
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
                  <label className="partner-label">Phone</label>
                  <input
                  required
                    type="number"
                       onChange={(e) => {
                      setPhone(e.target.value);
                    }}
                    className="partner-form-control"
                  />
                </div>

                <div className="form-group">
                  <label className="partner-label">Company Name</label>
                  <input
                  required
                    type="text"
                    
                    onChange={(e) => {
                      setCompany(e.target.value);
                    }}
                    className="partner-form-control"
                  />
                </div>

                <div className="form-group">
                  <label className="partner-label">Password</label>
                  <input
                  required
                    type="password"
                                  onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    className="partner-form-control"
                  />
                </div>

    
                <div className="partner-btn-div">
                  <button type="submit" className="partnerlogin-btn">
                    SignUp
                  </button>
                </div>
              </form>
                    
                    <div  style={{display:"flex",justifyContent:"center",fontWeight:"500"}}>
                      <p >already partner?</p>
                     <Link style={{textDecoration:"none",color:"blue"}} to={'/partner'}>login</Link>
                    </div>
            </div>
          </div>
        </div>
      )
}

export default SignUp

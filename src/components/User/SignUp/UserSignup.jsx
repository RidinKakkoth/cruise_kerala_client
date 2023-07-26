import React, { useState } from 'react'
import {Link, useNavigate} from "react-router-dom"
import './UserSignup.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { sendOTP, userSignUp, verifyOTP } from '../../../config/UserEndpoints';
import OtpModal from '../../Shared/OtpModal/OtpModal';
import UserSignupValidation from '../../../utils/UserSignupValidation'
import axios from 'axios';

function UserSignup() {
    const [name,setName]=useState("")
    const [email,setEmail]=useState("")
    const [phone,setPhone]=useState("")
    const[password,setPassword]=useState("")
    
    const [otpModalOpen, setOtpModalOpen] = useState(false);
    const { validateForm } = UserSignupValidation(); // Use the custom hook


    
    const navigate=useNavigate()
    
    const handleSubmit = async(e) => {
      e.preventDefault();
      const errors = validateForm({ name, email, phone, password }); // Pass form values to the validation function

      if (Object.keys(errors).length > 0) {
        // Display error messages using toast
        Object.values(errors).forEach((message) => {
          toast.error(message, { position: 'top-center' });
        });
        return;
      }
      setOtpModalOpen(true)
      // await axios.post("/sendOTP", { email });
      const data=await sendOTP(email)
    
      
      // const data=await userSignUp(email,password,phone,name)
      // if(data.status==="failed"){
      //   toast.error(data.message,{position: "top-center"})
      // }
      // else{
      //   navigate('/signin')
      // }
    };


  
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
        <div>
          <div className="user-login-body">
          <ToastContainer autoClose={2000} />
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
              <button  type="submit" className="adminlogin-btn rounded-3xl shadow">
                Sign up
              </button>
                </div>
              </form>
                    
                    <div  style={{display:"flex",justifyContent:"center",fontWeight:"500"}}>
                      <p >already user?</p>
                     <Link style={{textDecoration:"none",color:"blue"}} to={'/signin'}>login</Link>
                    </div>
            </div>
            <OtpModal user={email} isOpen={otpModalOpen} onRequestClose={() => setOtpModalOpen(false)} handleVerifyOTP={handleVerifyOTP} />
          </div>
      

        </div>
      )
}

export default UserSignup

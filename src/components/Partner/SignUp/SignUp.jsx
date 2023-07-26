import React, { useState } from 'react'
import {Link, useNavigate} from "react-router-dom"
import './SignUp.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { partnerSignUp, sendOTP, verifyOTP } from '../../../config/PartnerEndpoints';
import PartnerSignupValidation from '../../../utils/PartnerSignupValidation '
import OtpModal from '../../Shared/OtpModal/OtpModal';

function SignUp() {
    const [name,setName]=useState("")
    const [email,setEmail]=useState("")
    const [phone,setPhone]=useState("")
    const [company,setCompany]=useState("")
    const[password,setPassword]=useState("")

    const [otpModalOpen, setOtpModalOpen] = useState(false);
    const { validateForm } = PartnerSignupValidation(); // Use the custom hook

    const navigate=useNavigate()
    
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
      const role="partner"
      const data= await sendOTP(email,role)

      if(data.status){
        setOtpModalOpen(true)
      }else if(data.status===false){
        toast.error(data.message,{ position: 'top-center' })
      }


      // const data=await partnerSignUp(email,password,phone,name,company)
      // if(data.status==="failed"){
      //   toast.error(data.message,{position: "top-center"})
      // }
      // else{
      //   navigate('/partner')
      // }
    
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












    
    
      return (
        <div>
          <div className="partner-login-body">
          <ToastContainer autoClose={3000} />
            <div className="partner-card">
            <img
        className='mx-auto mt-2'
            src="https://www.pngall.com/wp-content/uploads/8/Rudder-PNG-Picture.png" // Replace with the URL or path to your image
            alt=""
            style={{ width: '80px', height: '80px', marginRight: '8px' }}
          />
          <h3 className='text-center italic font-serif text-white'>Cruise</h3>
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
                    className="form-control"
                  />
                </div>

                <div className="form-group">
                  <label className="partner-label">Company Name</label>
                  <input
                  // required
                    type="text"
                    
                    onChange={(e) => {
                      setCompany(e.target.value);
                    }}
                    className="form-control"
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
                    className="form-control"
                  />
                </div>

    
                <div className="partner-btn-div">
                <button type="submit" className="adminlogin-btn rounded-3xl shadow">
                Sign up
              </button>
                </div>
              </form>
                    
                    <div  style={{display:"flex",justifyContent:"center",fontWeight:"500"}}>
                      <p >already partner?</p>
                     <Link style={{textDecoration:"none",color:"blue"}} to={'/partner'}>login</Link>
                    </div>
            </div>
            <OtpModal user={email} isOpen={otpModalOpen} onRequestClose={() => setOtpModalOpen(false)} handleVerifyOTP={handleVerifyOTP} />

          </div>
        </div>
      )
}

export default SignUp

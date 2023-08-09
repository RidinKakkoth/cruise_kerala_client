
import React, {useState } from "react";
import Modal from "react-modal";
import {  resetPassword } from "../../../config/UserEndpoints";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import { resetPasswordPartner } from "../../../config/PartnerEndpoints";

Modal.setAppElement("#root"); // Set the root element to handle accessibility warnings

const ResetPasswordModal = ({role,user, isOpen, onRequestClose, handleVerifyOTP }) => {
  const [usermail,setUsermail] = useState("");
  const [password,setPassword] = useState("");
  const [cpassword,setCPassword] = useState("");
  const [error,setError] = useState("");
  const [otpModalOpen,setOtpModalOpen] = useState(false);
  const navigate=useNavigate()

  const handleSend = async (e) => {
    e.preventDefault();
    if(password===cpassword){
        setError("")
    try {
      let data;
      if(role==="user")
       data = await resetPassword(user,password);
      else if(role==="partner")
      data = await resetPasswordPartner(user,password);



      if(data.status){
            toast.success("success",{position:"top-center"})
          navigate(0)
        setOtpModalOpen(false)
        onRequestClose()
      }
    } catch (error) {
      console.error("Error while sending email authentication:", error);
    }
}
else{
setError("password not match")
}
  };
  

  return (
        <>
          <ToastContainer autoClose={2000} />
                <Modal 
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="OTP Verification"
      style={{
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        },
        content: {
          display: "flex", // Add flex display
          flexDirection: "column", // Align children in a column
          alignItems: "center", // Center items horizontally
          justifyContent: "center", // Center items vertically
          width: "450px",
          height: "300px",
          margin: "auto",
          borderRadius: "5px",
          padding: "20px",
        },
      }}
    >
      <h2 className="text- mb-3">Reset your password</h2>

      <form  className="flex flex-col text-center" >
        <div className="flex-col ">
          
            <input
            autoFocus
            placeholder="Enter your password"
            className="justify-center"  
              type="password"
              min={6}
              onChange={(e) => setPassword( e.target.value)}
              style={{
                width: "200px",
                height: "40px",
                margin: "5px",
                textAlign: "center",
                fontSize: "15px",
                borderColor:"black",
                borderWidth:"2px"
              }}
            />
            <input
            autoFocus
            placeholder="Confirm your password"
            className=""  
            min={6}
              type="password"
              onChange={(e) => setCPassword( e.target.value)}
              style={{
                width: "200px",
                height: "40px",
                margin: "5px",
                textAlign: "center",
                fontSize: "15px",
                borderColor:"black",
                borderWidth:"2px"
              }}
            />
            <p className="text-red-500">{error}</p>
        </div>
        <button className=" bg-blue-500 text-white rounded px-2 h-10 w-24 mt-4 mx-auto " onClick={handleSend}>Submit</button>
      </form>
    </Modal>
   
        </>
  );
};

export default ResetPasswordModal;

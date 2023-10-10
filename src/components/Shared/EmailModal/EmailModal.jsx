
import React, {useState } from "react";
import Modal from "react-modal";
import {  sendOTP, userEmailCheck, verifyOTP } from "../../../config/UserEndpoints";
import OtpModal from "../OtpModal/OtpModal";
import { ToastContainer, toast } from 'react-toastify';
import ResetPasswordModal from "../ResetPasswordModal/ResetPasswordModal";
import { partnerEmailCheck } from "../../../config/PartnerEndpoints";

Modal.setAppElement("#root"); // Set the root element to handle accessibility warnings

const EmailModal = ({role, isOpen, onRequestClose,  }) => {
  const [usermail,setUsermail] = useState("");
  const [otpModalOpen,setOtpModalOpen] = useState(false);
  const [passModalOpen,setPassModalOpen] = useState(false);
  const[neweRole,setNewRole]=useState("")
  const [errorMessage, setErrorMessage] = useState('');


  const isValidEmail = (email) => {
    return /^\S+@\S+\.\S+$/.test(email);
};

  const handleSend = async (e) => {
    e.preventDefault();

    if (!usermail.trim()) {
        setErrorMessage('Email is required');
    } else if (!isValidEmail(usermail)) {
        setErrorMessage('Invalid email format');
    } else {
        setNewRole(role);

        try {
            let data;
            if (role === "user") {
                data = await userEmailCheck(usermail);
            } else if (role === "partner") {
                data = await partnerEmailCheck(usermail);
            }

            if (data.status) {
                const newData = await sendOTP(usermail);
                setOtpModalOpen(true);
                onRequestClose();
            }
        } catch (error) {
            console.error("Error while sending email authentication:", error);
        }
    }
};


  // const handleSend = async (e) => {
//   if (!usermail.trim()) {
//      setErrorMessage ('Email is required');
//     } else if (!/^\S+@\S+\.\S+$/.test(usermail)) {
//      setErrorMessage ('Invalid email format');
//     }
// else{
//   setNewRole(role)
//   e.preventDefault();
//   try {
//     let data;
//     if(role==="user")
//      data = await userEmailCheck(usermail)
//      else if(role==="partner")
//      data = await partnerEmailCheck(usermail)
//       if(data.status){
//         console.log(data.status);

//         const newData= await sendOTP(usermail)
//         setOtpModalOpen(true)
//         onRequestClose()
//       }
//     } catch (error) {
//       console.error("Error while sending email authentication:", error);
//     }
// }
//   };
  
//   const handleChange=(value)=>{

//     setUsermail(value)
// }
const handleChange = (value) => {
  setUsermail(value);
  setErrorMessage('');
};



const handleVerifyOTP = async (otp) => {
    try {
 
      const verifiedData = await verifyOTP(usermail, otp);


      if (verifiedData.status) {
        toast.success('Verified..Please reset your password', { position: 'top-center' });
        setPassModalOpen(true)
        onRequestClose()
      }
    }catch(error){

    }
}

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
      <h2 className="text- mb-3">Enter email</h2>

      <form  className="flex flex-col " >
        <div style={{ display: "flex flex-col", justifyContent: "center" }}>
          
            <input
            autoFocus
            className=""  
              type="email"
              onChange={(e) => handleChange( e.target.value)}
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
        
        </div>
        {errorMessage && <p className="text-red-500 flex gap-2 text-center"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
</svg>
{errorMessage}</p>}
        <button className=" bg-blue-500 text-white rounded px-2 h-10 w-24 mt-4 mx-auto " onClick={handleSend}>Submit</button>
        
      </form>
    </Modal>
    
    <OtpModal user={usermail} isOpen={otpModalOpen} onRequestClose={() => setOtpModalOpen(false)} handleVerifyOTP={handleVerifyOTP} />
    
    <ResetPasswordModal role={neweRole} user={usermail} isOpen={passModalOpen} onRequestClose={() => setPassModalOpen(false)}   />
    
        </>
  );
};

export default EmailModal;


import React, { useRef, useState } from "react";
import Modal from "react-modal";

Modal.setAppElement("#root"); // Set the root element to handle accessibility warnings

const OtpModal = ({user, isOpen, onRequestClose, handleVerifyOTP }) => {
  const [otp, setOtp] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Call the function to verify OTP
    handleVerifyOTP(otp);
  };
  const inputRefs = useRef([]);
  const handleChange = (index, value) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp.join(""));

    // Move focus to the previous input or stay in the current input
    if (value === "") {
      // If the value is cleared, move focus to the previous input
      if (inputRefs.current[index - 1]) {
        inputRefs.current[index - 1].focus();
      }
    } else {
      // If a value is added, move focus to the next input
      if (inputRefs.current[index + 1]) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  return (
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
      <h2 className="text- mb-5">Enter OTP</h2>
      <p className="text- mb-5">OTP Sent to <span className="text-green-500">{user} </span> </p>

      
      <form  className="flex " onSubmit={handleSubmit}>
        
        {/* <input className="" type="text" value={otp} onChange={(e) => setOtp(e.target.value)} /> */}
        <div style={{ display: "flex flex-col", justifyContent: "center" }}>
          {Array.from({ length: 6 }, (_, index) => (
            <input
            className=""
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              type="text"
              value={otp[index] || ""}
              onChange={(e) => handleChange(index, e.target.value)}
              maxLength={1}
              style={{
                width: "40px",
                height: "40px",
                margin: "5px",
                textAlign: "center",
                fontSize: "20px",
                borderColor:"black",
                borderWidth:"2px"
              }}
            />
          ))}
        </div>
        <button className=" bg-blue-500 text-white rounded px-2 py-2" type="submit">Submit OTP</button>
      </form>
    </Modal>
  );
};

export default OtpModal;

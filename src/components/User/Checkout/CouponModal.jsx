import React, { useState } from 'react';
import { applyCoupon } from '../../../config/UserEndpoints';

const CouponBox = ({ onApply, onClose }) => {
  const [couponCode, setCouponCode] = useState('');
  const [error, setError] = useState('');

  const handleInputChange = (event) => {
    setCouponCode(event.target.value);
  };

  const handleApplyCoupon =async () => {
   const offerCode= couponCode.trim()
    if(offerCode===""){
      setError("enter valid coupon code")
      return 
    }
    const data=await applyCoupon(offerCode)
    if(!data.status){

      setError(data.message)
    }
    if(data.status){
      setError(data.message)

      onApply(data.status,data.offer);
    }
    setCouponCode(''); // Reset the coupon code after applying
    // onClose(); // Close the coupon box
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center">
      <div className="fixed top-0 left-0 w-full h-full bg-black opacity-50" onClick={onClose} />
      <div className="relative bg-white p-8 rounded shadow-md">
        <h5 className='text-center mb-5 text-black '>Enter Coupon</h5>
        <input
          type="text"
          value={couponCode}
          onChange={handleInputChange}
          placeholder="Enter coupon code"
          className="border px-4 py-2 rounded mr-4"
        />
        <button onClick={handleApplyCoupon} className="bg-[#011742] text-white px-4 py-2 rounded">
          Apply
        </button>
       {error&& <p className='mt-3 flex gap-2 text-red-600'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
</svg>
{error}</p>}
      </div>
    </div>
  );
};

export default CouponBox;

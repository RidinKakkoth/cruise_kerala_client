import React, { useState } from 'react';

const CouponBox = ({ onApply, onClose }) => {
  const [couponCode, setCouponCode] = useState('');

  const handleInputChange = (event) => {
    setCouponCode(event.target.value);
  };

  const handleApplyCoupon = () => {
    onApply(couponCode);
    setCouponCode(''); // Reset the coupon code after applying
    onClose(); // Close the coupon box
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
      </div>
    </div>
  );
};

export default CouponBox;

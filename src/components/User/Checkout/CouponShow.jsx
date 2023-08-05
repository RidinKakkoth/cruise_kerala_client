import React, { useEffect, useState } from 'react';
import dateConvertor from "../../../utils/DateFormat";
import { getCouponData } from '../../../config/UserEndpoints';

const CouponShow = ({ isOpen, onClose }) => {

  const[coupon,setCoupon]=useState([])

useEffect(()=>{
  async function invoke(){
      const {couponData}=await getCouponData()
      console.log(couponData,"========");
      if(couponData)setCoupon(couponData)
      else console.log("error");
  }
  invoke()
},[])


  const closeModal = () => {
    onClose();
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center">
      <div className="fixed top-0 left-0 w-full h-full bg-black opacity-50"  onClick={closeModal} />
      <div className="relative bg-white p-8 rounded shadow-md">
            {/* { coupon?.map((coupon,index)=>{ */}
{console.log(coupon[0]?._id,"vvvvvvvvvvvvvvvv")}
             <div  className="text-center">
            <h2 className="text-lg font-semibold mb-2 flex gap-2 justify-around px-3"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="red" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M9 14.25l6-6m4.5-3.493V21.75l-3.75-1.5-3.75 1.5-3.75-1.5-3.75 1.5V4.757c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0c1.1.128 1.907 1.077 1.907 2.185zM9.75 9h.008v.008H9.75V9zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm4.125 4.5h.008v.008h-.008V13.5zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
</svg>
Coupon Code</h2>
            <p className="text-gray-600 text-sm">Use this code to get a discount:</p>
            <div className="bg-white p-3 rounded-lg mt-2 ">
              <code className="font-mono text-blue-600 text-lg ">{coupon[0]?.couponCode}</code>
              <p className='mt-3'>{coupon[0]?.offer}</p>
            </div>
            <p className=" text-sm text-red-500 mt-2">Expires: {dateConvertor(coupon[0]?.validUpto)}</p>
          </div>
            {/* }) */}
          {/* } */}
      </div>
    </div>
  

  );
};

export default CouponShow;

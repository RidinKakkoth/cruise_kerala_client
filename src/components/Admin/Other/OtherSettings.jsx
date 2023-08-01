import React, { useEffect, useRef, useState } from 'react';
import Category from './Category';
import CategoryTable from './CategoryTable';
import { getCategories } from '../../../config/AdminEndpoints';
import Coupon from './Coupon';
import CouponForm from './CouponForm';

function OtherSettings() {

  const [categories, setCategories] = useState([]);
  const [showCouponForm, setShowCouponForm] = useState(false);
  const modalRef = useRef(null);

  function toggleCouponForm() {
    setShowCouponForm((prev) => !prev);
  }
  function handleOutsideClick(event) {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      // Click outside the modal, so close it
      setShowCouponForm(false);
    }
  }
  

  useEffect(() => {

    async function  invoke(){
        const data=await getCategories()
        if(data){
          setCategories(data.categories);
        }
    }

    invoke();
  }, []); 

  return (
    <div>
      <div className='' style={{ marginTop: '20px', marginLeft: '50px' }}>
        <div className='flex justify-between w-[75%]'>
          <div>
            <h5 style={{ marginBottom: '20px' }}>Categories</h5>
          </div>
          <div className='w-[75%] flex justify-end'>
            <Category /> {/* add category */}
          </div>
        </div>
  
        <div className='w-[75%]'>
          <CategoryTable categories={categories} />
        </div>
        <div className='mt-4'>

          <div className='flex justify-between mb-3  me-3'>
        <h1 className="text-xl mb-2">Coupons</h1>
        <button onClick={toggleCouponForm} className='bg-blue-400 text-white rounded px-2 flex items-center gap-2'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M9 14.25l6-6m4.5-3.493V21.75l-3.75-1.5-3.75 1.5-3.75-1.5-3.75 1.5V4.757c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0c1.1.128 1.907 1.077 1.907 2.185zM9.75 9h.008v.008H9.75V9zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm4.125 4.5h.008v.008h-.008V13.5zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
</svg>
Add coupon</button>
        </div>
          <Coupon  />
        </div>
  
        {/* Coupon Form Modal */}
        {showCouponForm && (
        <div
          className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center'
          onMouseDown={handleOutsideClick}
        >
          <div ref={modalRef} className='bg-white p-4 rounded shadow-lg'>
            <h2 className='text-xl font-bold mb-4'>Add Coupon</h2>
            <CouponForm onClose={toggleCouponForm} />
          </div>
        </div>
      )}
      </div>
    </div>
  );
  
}

export default OtherSettings;

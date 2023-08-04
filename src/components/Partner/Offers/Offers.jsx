import React, { useEffect, useRef, useState } from 'react'
import AddOfferForm from './AddOfferForm'
import OffersTable from './OffersTable'
function Offers() {

  const [showOfferForm, setShowOfferForm] = useState(false);
  const modalRef = useRef(null);

  function toggleOfferForm() {
    setShowOfferForm((prev) => !prev);
  }
  function handleOutsideClick(event) {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      // Click outside the modal, so close it
      setShowOfferForm(false);
    }
  }
  


  return (
    <div className=''>
<div className='flex justify-between mt-2'>
<h2 className='text-xl font-bold mb-4 flex justify-start ms-3  mt-3'>Offers</h2>
      <button onClick={toggleOfferForm} className='rounded-3xl bg-blue-500 px-3 text-white py-2  mb-4 flex justify-end me-3  mt-3'>Add Offer</button>
</div>
      <OffersTable/>
      {showOfferForm && (
        <div
          className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center'
          onMouseDown={handleOutsideClick}
        >
          <div ref={modalRef} className='bg-white p-4 rounded shadow-lg'>
            <AddOfferForm onClose={toggleOfferForm} />
          </div>
        </div>
      )}
    </div>
  )
}

export default Offers

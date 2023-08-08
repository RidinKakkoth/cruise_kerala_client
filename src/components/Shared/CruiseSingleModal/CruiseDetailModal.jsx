import React from 'react';

const CruiseDetailModal = ({ cruiseId, onClose }) => {
  const { name, baseRate, boarding, extraRate, maxGuest } = cruiseId;

  const greenTick=()=>{
    return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="green" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
  </svg>
  }
  const redTick=()=>{
    return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="red" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
  
  }

  return (
    <div  onClick={onClose} className="fixed inset-0 flex items-center justify-center z-50 bg-white bg-opacity-50 ">
      <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 w-full max-w-2xl">
      <div className='flex justify-end'>
      <button
          className="  text-gray-500 hover:text-gray-800"
          onClick={onClose}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
        <div className="mb-4">
          <h2 className="text-2xl font-semibold mb-3">Cruise Details:</h2>
          <p className="text-gray-600">
            <span className="font-semibold me-2">Cruise Name:</span> {name}
          </p>
          <p className="text-gray-600">
            <span className="font-semibold me-2">Boarding:</span> {boarding}
          </p>
          <p className="text-gray-600">
            <span className="font-semibold me-2">Base Rate:</span> ₹{baseRate}
          </p>
          <p className="text-gray-600">
            <span className="font-semibold me-2">Extra Rate:</span> ₹{extraRate}
          </p>
          <p className="text-gray-600">
            <span className="font-semibold me-2">Max Guests:</span> {maxGuest}
          </p>
        </div>
        <div className="mb-4">
  <h2 className="text-xl font-semibold">Facilities:</h2>
  <ul className="list-disc pl-4 mt-2">
    <div className="flex flex-wrap mb-2">
      <div className="mr-4 flex">
        AC : {cruiseId?.Facilities[0].AC ? greenTick() : redTick()}
      </div>
      <div className="mr-4 flex">
        Food : {cruiseId?.Facilities[0].food ? greenTick() : redTick()}
      </div>
      <div className="mr-4 flex">
        Party Hall : {cruiseId?.Facilities[0].partyHall ? greenTick() : redTick()}
      </div>
      <div className="mr-4 flex">
        Pets : {cruiseId?.Facilities[0].Pets ? greenTick() : redTick()}
      </div>
    </div>
    <div className="flex flex-wrap">
      <div className="mr-4 flex">
        TV : {cruiseId?.Facilities[0].TV ? greenTick() : redTick()}
      </div>
      <div className="mr-4 flex">
        Games : {cruiseId?.Facilities[0].games ? greenTick() : redTick()}
      </div>
      <div className="mr-4 flex">
        Fishing : {cruiseId?.Facilities[0].fishing ? greenTick() : redTick()}
      </div>
      <div className="mr-4 flex">
        Wi-Fi : {cruiseId?.Facilities[0].wifi ? greenTick() : redTick()}
      </div>
    </div>
  </ul>
</div>


        <div className="mb-4">
          <h3 className="text-2xl font-semibold mb-3">Images:</h3>
          <div className="grid grid-cols-4 gap-2">
            {cruiseId.Images?.map((image, index) => (
              <img
                key={index}
                src={image}
                alt="img"
                className="w-28 h-28 object-cover rounded"
              />
            ))}
          </div>
        </div>


      </div>
    </div>
  );
};

export default CruiseDetailModal;

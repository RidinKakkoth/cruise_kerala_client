import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addOffer, getCruiseData } from '../../../config/PartnerEndpoints';
import { ToastContainer, toast } from 'react-toastify';

function AddOfferForm({onClose}) {
    const [offerName, setOfferName] = useState('');
    const [cruiseId, setCruiseId] = useState('');
    const [description, setDescription] = useState('');
    const [percentage, setPercentage] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [error, setError] = useState('');
    const [cruiseData, setCruiseData] = useState(null);
    
    const navigate=useNavigate()
  
  
  const handleFormSubmit = async (e) => {
      e.preventDefault();
      
    // Trim input values and check for emptiness
    const trimmedOfferName = offerName.trim();
    const trimmedCruiseId = cruiseId.trim();
    const trimmedDescription = description.trim();
    const trimmedPercentage = percentage.trim();
    const trimmedStartDate = startDate.trim();
    const trimmedEndDate = endDate.trim();
    
    // If any value is empty, display an error
    if (!trimmedOfferName ||!trimmedCruiseId ||!trimmedDescription ||!trimmedPercentage ||!trimmedStartDate ||!trimmedEndDate) {
        
        setError("Please fill in all fields")
        return
    }
    
    const formData = {
        offerName: trimmedOfferName,
      cruiseId: trimmedCruiseId,
      description: trimmedDescription,
      percentage: trimmedPercentage,
      startDate: trimmedStartDate,
      endDate: trimmedEndDate,
    };
    
    const data = await addOffer(formData);
    
    if(data.status){
        toast.success("Successfully added",{ position: "top-center" })    
        setTimeout(() => {
            onClose()
            navigate(0)
        }, 1500);
        setOfferName('');
        setCruiseId('');
        setDescription('');
        setPercentage('');
        setStartDate('');
        setEndDate('');
    }
    else{
        toast.error(data.message, { position: "top-center" });
    }
  };
  
  useEffect(()=>{
      async function invoke(){
        const data=await getCruiseData()
        setCruiseData(data.cruiseData)
    }
    invoke()
},[])

  
  return (
    <div className="max-w-md mx-auto p-4 bg-white ">
         <ToastContainer autoClose={1000} />
      <h2 className="text-lg font-semibold mb-4">Add Offer for Cruise</h2>
      <form onSubmit={handleFormSubmit} className="space-y-3">
        <div className="flex space-x-4">
          <div className="flex-grow">
            <label htmlFor="offerName" className="font-medium mb-1">
              Offer Name
            </label>
            <input
              type="text"
              id="offerName"
              value={offerName}
              onChange={(e) => setOfferName(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div className="flex-grow">
            <label htmlFor="cruise" className="font-medium mb-1">
              Select Cruise
            </label>
            <select
              id="cruise"
            value={cruiseId}
              onChange={(e) => setCruiseId(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded"
            >
              <option value="">Select Cruise</option>
              {cruiseData?.map((cruise,index)=>{
            
               return <option key={index} value={cruise._id}>{cruise?.name}</option>
              })}
              
            </select>
          </div>
        </div>

        <div className="flex space-x-4">
          <div className="flex-grow">
            <label htmlFor="offerDescription" className="font-medium mb-1">
              Offer Description
            </label>
            <textarea
              id="offerDescription"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="w-full px-3 py-2 text-sm border rounded"
            ></textarea>
          </div>
          <div className="flex-grow">
            <label htmlFor="offerPercentage" className="font-medium mb-1">
              Offer Percentage
            </label>
            <input
              type="number"
              id="offerPercentage"
              value={percentage}
              onChange={(e) => setPercentage(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded"
            />
          </div>
        </div>

        <div className="flex space-x-4">
          <div className="flex-grow">
            <label htmlFor="startDate" className="font-medium mb-1">
              Start Date
            </label>
            <input
              type="date"
              id="startDate"
              value={startDate}
              min={new Date().toISOString().split("T")[0]}  
              onChange={(e) => setStartDate(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div className="flex-grow">
            <label htmlFor="endDate" className="font-medium mb-1">
              End Date
            </label>
            <input
              type="date"
              id="endDate"
              min={startDate}
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded"
            />
          </div>
        </div>

        <button type="submit" className="bg-blue-500 text-white px-4 py-2 mt-3 rounded hover:bg-blue-600">
          Add Offer
        </button>
      </form>
      {error&&<p className='justify-center gap-2 mt-2 flex'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="red" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
</svg>
{error}</p >}
    </div>
  );
}

export default AddOfferForm;

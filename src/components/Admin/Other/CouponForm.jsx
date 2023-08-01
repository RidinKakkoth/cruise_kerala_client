import React, { useState } from "react";
import { addCoupon } from "../../../config/AdminEndpoints";
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";


const CouponForm = ({onClose}) => {
    const[error,setError]=useState("")
    const navigate=useNavigate()
      const [formData, setFormData] = useState({
    offer: "",
    couponCode: "",
    discount: "",
    description: "",
    validFrom: "",
    validUpto: "",
    userLimit: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    // Trim the form data values to remove any leading/trailing spaces
    const trimmedFormData = Object.fromEntries(
      Object.entries(formData).map(([key, value]) => [key, value.trim()])
    );
  
    const isAnyFieldEmpty = Object.values(trimmedFormData).some(
      (value) => value === ""
    );
  
    if (isAnyFieldEmpty) {
      setError("All fields must be filled");
    } else {
      e.preventDefault();
      // Here you can handle the form submission, e.g., send the data to the server or perform any other actions.
      console.log("Form submitted:", trimmedFormData);
      const data = await addCoupon(trimmedFormData);
      if (data.status) {

        toast.success("Successfully added",{ position: "top-center" })
        setFormData({
          offer: "",
          couponCode: "",
          discount: "",
          description: "",
          validFrom: "",
          validUpto: "",
          userLimit: "",
        });

        onClose();
        setTimeout(() => {
          navigate(0)
        }, 2000);
        
      } else {
        toast.error(data.message, { position: "top-center" });
      }
    }
  };
  

  return (
      
      <form onSubmit={handleSubmit} className="mt-4 px-4 sm:px-6 md:px-8">
        <ToastContainer autoClose={1000} />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="mb-4">
          <label htmlFor="offer" className="block text-sm font-medium text-gray-700">
            Offer
          </label>
          <input
            type="text"
            name="offer"
            value={formData.offer}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50 focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="couponCode" className="block text-sm font-medium text-gray-700">
            Coupon Code
          </label>
          <input
            type="text"
            name="couponCode"
            value={formData.couponCode}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50 focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="discount" className="block text-sm font-medium text-gray-700">
            Discount
          </label>
          <input
            type="number"
            name="discount"
            value={formData.discount}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50 focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50 focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="validFrom" className="block text-sm font-medium text-gray-700">
            Valid From
          </label>
          <input
            type="date"
            name="validFrom"
            value={formData.validFrom}
            min={new Date().toISOString().split("T")[0]}         
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50 focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="validUpto" className="block text-sm font-medium text-gray-700">
            Valid Upto
          </label>
          <input
            type="date"
            name="validUpto"
            min={formData.validFrom}
            value={formData.validUpto}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50 focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="userLimit" className="block text-sm font-medium text-gray-700">
            User Limit
          </label>
          <input
            type="number"
            name="userLimit"
            value={formData.userLimit}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50 focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>

      </div>
        {error&&<p className="text-red-500 gap-2 flex"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
</svg>
{error}</p>}
      <div className="mt-6">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-400 border border-transparent rounded-md font-semibold text-white hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
        >
          Add Coupon
        </button>
      </div>
    </form>
  );
};

export default CouponForm;

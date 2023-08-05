import React, { useEffect, useState } from 'react';
import Loading from '../../Shared/Loading';
import { blockOffer, deleteOffer, getOfferData } from '../../../config/PartnerEndpoints';

function OffersTable() {
    const[loading,setLoading]=useState(false)
    const[trigger,setTrigger]=useState(true)
    const[offers,setOffers]=useState([])

    useEffect(()=>{
      async function invoke(){
          const {data}=await getOfferData()
          if(data?.length>0){
            setLoading(false)
            setOffers(data)
          }
      }
      invoke()
    },[trigger])

    const handleBlock= async (id)=>{
      const data=await blockOffer(id)
      if(data.status){
        setTrigger(!trigger)
      }
  }
  const handleDelete=async(id)=>{
  
  const data=await deleteOffer(id)
  if(data.status){
    setTrigger(!trigger)
  }
  }
  


    return (
        <div className=" h-screen w-full  mt-2  bg-gray-100">
  
  
  {!loading?   (<div className="overflow-auto rounded-lg shadow hidden md:block ">
            <table className="w-full">
              <thead className="bg-gray-50 border-b-2 border-gray-200">
                <tr>
                  <th className="w-28 p-3 text-sm font-semibold tracking-wide text-left">
                    Cruise
                  </th>
                  <th className="w-28 p-3 text-sm font-semibold tracking-wide text-left">
                    Offer
                  </th>
                  <th className="p-3 w-32 text-sm font-semibold tracking-wide text-left">
                  Description
                  </th>
                  <th className="p-3 w-14 text-sm font-semibold tracking-wide text-left">
                    Percentage
                  </th>
                  <th className="w-28 p-3 text-sm font-semibold tracking-wide text-left">
                  Start Date
                  </th>
                  <th className="w-28 p-3 text-sm font-semibold tracking-wide text-left">
                  End Date
                  </th>
                  <th className="w-20 p-3 text-sm font-semibold tracking-wide text-left">
                  Status
                  </th>
                  <th className="w-20 p-3 text-sm font-semibold tracking-wide text-left">
                  Delete
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {offers?.map((offer,index) => (
                  <tr key={index} className="bg-white">
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                      <p className=" ">
                        {offer?.cruiseId.name}
                      </p>
                    </td>
                    <td className="p-3 text-sm font-bold text-gray-700 whitespace-nowrap">
                      <p className=" ">
                        {offer?.offerName}
                      </p>
                    </td>
                    <td className="p-3  text-[#011742] text-sm whitespace-nowrap">
                      {offer?.description}
                    </td>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                      {offer?.percentage}
                    </td>

                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                      {" "}
                      {new Date(offer?.startDate).toLocaleDateString("en-US", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })}
                    </td>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                      {new Date(offer?.endDate).toLocaleDateString("en-US", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })}
                    </td>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
  
                        { offer?.isBlock
                          ? <p onClick={()=>{handleBlock(offer._id)}} className="cursor-pointer bg-red-400 w-16 text-center text-white uppercase text-xs font-medium rounded py-1">blocked</p> :
                          <p  onClick={()=>{handleBlock(offer._id)}} className="cursor-pointer bg-green-400 w-16 text-center text-white uppercase text-xs font-medium rounded py-1">Active</p>  }
                    </td>
                          <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                          <p onClick={()=>{handleDelete(offer._id)}}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="red" className="w-6 h-6 cursor-pointer">
    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
  </svg></p>
  
                          </td>
  
                  </tr>
                ))}
              </tbody>
            </table>
          </div>):<Loading/>}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
            {offers?.map((offer) => (
              <div
                key={offer._id}
                className="bg-white space-y-3 p-4 rounded-lg shadow"
              >
                <div className="flex items-center space-x-2 text-sm">
                  <div>
                    <p className="text-blue-500 font-bold "></p>
                    <p className="text-xs"></p>
                  </div>
  
                  <div className="px-2">
  
                  </div>
                </div>
                <div className="text-sm text-gray-700">
                  <div>
                    <span className="font-medium">Cruise: </span>{" "}
                    {offer?.cruuiseId?.name}
                  </div>
                  <div>
                    <span className="font-medium">Offer: </span>{" "}
                    {offer?.offerName}
                  </div>
                  <div className="mt-3">
                    <span className="font-medium">Percentage: </span>
                    {offer?.percentage}
                  </div>
                </div>
                <div className="text-sm text-gray-700">
                  {" "}
                  {new Date(offer?.validFrom).toLocaleDateString("en-US", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}{" "}
                  -{" "}
                  {new Date(offer?.validUpto).toLocaleDateString("en-US", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}
                </div>
  
              </div>
            ))}
          </div>
  
        
  
        </div>
     
    )
  }

export default OffersTable;

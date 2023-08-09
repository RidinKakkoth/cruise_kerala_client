import React, { useEffect, useState } from "react";
import PartnerChart from "./PartnerChart";
import { getBookings } from "../../../config/PartnerEndpoints";
import SalesReport from "./SalesReport"
import Loading from "../../Shared/Loading";

function Dashboard() {
  const[data,setData]=useState([])
  const [loading, setLoading] = useState(true);
 
  useEffect(()=>{
      async function invoke(){
        const {data}=await getBookings()
        setData(data)
        setLoading(false)
      }
      invoke()
  },[])

  const totalRevenue=()=>{
   return  data?.reduce((accumultaor,rate)=>{  
      return accumultaor+=rate.total
    },0)
  }
  const totalCustomers=()=>{
  const userData=[]
 data?.forEach((item)=>{
    userData.push(item.userId._id)
  })

  const distinctData=new Set(userData)
  return distinctData.size;
  }


  return (
    <div className="flex flex-col w-screen container">
     {!loading? <>
      <div className="grid bg-gray-100 py-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 rounded-md container mt-5 mb-5 w-full">
        <div className="bg-white text-center shadow-2xl  rounded-lg h-40 grid grid-cols-2 items-center  px-4">
          <div className="col-span-2 text-base text-[#011742] font-bold border-b-2 py-3">
            REVENUE
          </div>
          <div className="col-span-1 mx-auto border-r-2 px-12 ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="#011742"
              className="w-10 h-10 "
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 8.25H9m6 3H9m3 6l-3-3h1.5a3 3 0 100-6M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div className="col-span-1 font-medium text-green-600 text-xl mx-auto">₹ {totalRevenue()}</div>
        </div>

        <div className="bg-white text-center shadow-2xl  rounded-lg h-40 grid grid-cols-2 items-center px-4">
          <div className="col-span-2 text-base text-[#011742] font-bold border-b-2 py-3">
            TOTAL BOOKINGS
          </div>
          <div className="col-span-1 mx-auto border-r-2 px-12">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="#011742"
              className="w-10 h-10"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z"
              />
            </svg>
          </div>
          <div className="col-span-1 font-medium text-green-600 text-xl mx-auto">{data?.length>0?data?.length:""}</div>
        </div>

        <div className="bg-white text-center shadow-2xl  rounded-lg h-40 grid grid-cols-2 items-center px-4">
          <div className="col-span-2 text-base text-[#011742] font-bold border-b-2 py-3">
            CUSTOMERS
          </div>
          <div className="col-span-1 mx-auto border-r-2 px-12">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="#011742"
              className="w-10 h-10"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
              />
            </svg>
          </div>
          <div className="col-span-1 font-medium text-green-600 text-xl  mx-auto">{totalCustomers()}</div>
        </div>
      </div>
      <div className="w-full sm:w-[100%]">
        <PartnerChart data={data} />
      </div>
      <SalesReport loading={loading} data={data}/>
      </>:<div className="flex justify-center items-center h-[100vh]"><Loading/></div>}
    </div>
  );
}

export default Dashboard;

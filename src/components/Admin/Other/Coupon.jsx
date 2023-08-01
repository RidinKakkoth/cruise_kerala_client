import React, { useEffect, useState } from 'react'
import Loading from '../../Shared/Loading'
import { blockCoupon, getCouponData } from '../../../config/AdminEndpoints'

function Coupon() {

const[loading,setLoading]=useState(true)
const[trigger,setTrigger]=useState(true)
const[couponData,setCouponData]=useState([])

useEffect(()=>{
  async function invoke(){
      const {data}=await getCouponData()
      if(data.length>0){
        setLoading(false)
        setCouponData(data)
      }
  }
  invoke()
},[trigger])
const handleBlock= async (id)=>{
    const data=await blockCoupon(id)
    if(data.status){
      setTrigger(!trigger)
    }
}


  return (
      <div className=" h-screen me-3   bg-gray-100">


{!loading?   (<div className="overflow-auto rounded-lg shadow hidden md:block">
          <table className="w-full">
            <thead className="bg-gray-50 border-b-2 border-gray-200">
              <tr>
                <th className="w-20 p-3 text-sm font-semibold tracking-wide text-left">
                  Offer
                </th>
                <th className="w-16 p-3 text-sm font-semibold tracking-wide text-left">
                  Coupon code
                </th>
                <th className="p-3 w-16 text-sm font-semibold tracking-wide text-left">
                  Discount
                </th>
                <th className="p-3 w-24 text-sm font-semibold tracking-wide text-left">
                Description
                </th>
                <th className="w-16 p-3 text-sm font-semibold tracking-wide text-left">
                Valid From
                </th>
                <th className="w-16 p-3 text-sm font-semibold tracking-wide text-left">
                Valid Upto
                </th>
                <th className="w-16 p-3 text-sm font-semibold tracking-wide text-left">
                 User Limit
                </th>
                <th className="w-16 p-3 text-sm font-semibold tracking-wide text-left">
                Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {couponData.map((coupon) => (
                <tr key={coupon?._id} className="bg-white">
                  <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                    <p className=" ">
                      {coupon?.offer}
                    </p>
                  </td>
                  <td className="p-3 font-bold text-blue-500 text-sm whitespace-nowrap">
                    {coupon?.couponCode}
                  </td>
                  <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                    {coupon?.discount}
                  </td>
                  <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                    {coupon?.description}
                  </td>
                  <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                    {" "}
                    {new Date(coupon?.validFrom).toLocaleDateString("en-US", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })}
                  </td>
                  <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                    {new Date(coupon?.validUpto).toLocaleDateString("en-US", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })}
                  </td>
                  <td className="p-3 text-sm text-gray-700 whitespace-nowrap">{coupon?.userLimit}</td>
                  <td className="p-3 text-sm text-gray-700 whitespace-nowrap">

                      { coupon?.isBlock
                        ? <p onClick={()=>{handleBlock(coupon._id)}} className="cursor-pointer bg-red-400 w-16 text-center text-white uppercase text-xs font-medium rounded py-1">blocked</p> :
                        <p  onClick={()=>{handleBlock(coupon._id)}} className="cursor-pointer bg-green-400 w-16 text-center text-white uppercase text-xs font-medium rounded py-1">Active</p>  }
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>):<Loading/>}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
          {couponData?.map((coupon) => (
            <div
              key={coupon._id}
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
                  <span className="font-medium">Offer: </span>{" "}
                  {coupon.offer}
                </div>
                <div className="mt-3">
                  <span className="font-medium">Code: </span>
                  {coupon.couponCode}
                </div>
              </div>
              <div className="text-sm text-gray-700">
                {" "}
                {new Date(coupon.validFrom).toLocaleDateString("en-US", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}{" "}
                -{" "}
                {new Date(coupon.validUpto).toLocaleDateString("en-US", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
              </div>

              <div className="text-sm  font-medium text-black">
                Limit: {coupon.userLimit} <br />
                Discount: {coupon.discount} % <br />
              </div>
            </div>
          ))}
        </div>

      

      </div>
   
  )
}

export default Coupon

import React, { useState } from 'react'
import Loading from '../../Shared/Loading'

function Coupon() {

const[loading,setLoading]=useState()
const[data,setData]=useState([])



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
                  Percentage
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
              {data.map((booking) => (
                <tr key={booking.bookingId} className="bg-white">
                  <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                    <p className="font-bold text-blue-500 ">
                      {booking.bookingId}
                    </p>
                  </td>
                  <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                    {new Date(booking.createdAt).toLocaleDateString("en-US", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })}
                  </td>
                  <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                    {booking.userId.name}
                  </td>
                  <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                    {booking.cruiseId.name}
                  </td>
                  {/* <td className="p-3 text-sm text-gray-700 whitespace-nowrap">{booking.userId.name}</td> */}
                  <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                    <span
                      className={`p-1.5 text-xs font-medium uppercase tracking-wider ${
                        booking.status === "Booked"
                          ? "text-green-800 bg-green-200"
                          : booking.status === "Shipped"
                          ? "text-yellow-800 bg-yellow-200"
                          : "text-gray-800 bg-gray-200"
                      } rounded-lg bg-opacity-50`}
                    >
                      {booking.status}
                    </span>
                  </td>
                  {/* <td className="p-3 text-sm text-gray-700 whitespace-nowrap">{new Date(booking.checkIn).toDateString()}</td> */}
                  {/* <td className="p-3 text-sm text-gray-700 whitespace-nowrap">{new Date(booking.checkOut).toDateString()}</td> */}
                  <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                    {" "}
                    {new Date(booking.checkIn).toLocaleDateString("en-US", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })}
                  </td>
                  <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                    {new Date(booking.checkOut).toLocaleDateString("en-US", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })}
                  </td>
                  <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                    ₹ {booking.total}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>):<Loading/>}

      

      </div>
   
  )
}

export default Coupon

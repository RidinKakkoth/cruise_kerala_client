import React, { useRef, useState } from "react";
import Loading from "../../Shared/Loading";
import { DownloadTableExcel } from 'react-export-table-to-excel';
import  downloadPdf  from "../../Shared/Sales/PdfCreator"; 


function SalesReport({loading,data}) {
  const [currentPage, setCurrentPage] = useState(1);

const itemsPerPage = 10; 
const totalPages = Math.ceil(data?.length / itemsPerPage);
const startIndex = (currentPage - 1) * itemsPerPage;
const endIndex = startIndex + itemsPerPage;
const currentItems = data?.slice(startIndex, endIndex);


    const tableRef = useRef(null);
 
  return (
    <div className="">
      <div className="sm:p-5 h-screen  md:w-[100%] bg-gray-100">
     <div className="flex justify-between w-[100%]">
<div>
<h1 className="text-xl mb-3">Sales Report</h1>
</div> 
    <div className="flex ">
     <button className="rounded flex shadow gap-2 text-white me-3 bg-red-400 sm:px-2 py-1 mb-3 h-8" onClick={() => downloadPdf(data)}><svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" strokeWidth={1.5} stroke="red" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
</svg>
 Download PDF </button>
      <DownloadTableExcel
                    filename="users table"
                    sheet="users"
                    currentTableRef={tableRef.current}
                >

                   <button className="flex rounded shadow bg-green-400 text-white py-1 px-2 "><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25M9 16.5v.75m3-3v3M15 12v5.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
</svg>
 Export excel </button>

                </DownloadTableExcel>
     </div>
     </div>

{!loading?   (<div className="overflow-auto rounded-lg shadow hidden md:block">
          <table ref={tableRef} className="w-full">
            <thead className="bg-gray-50 border-b-2 border-gray-200">
              <tr>

                <th className="w-20 p-3 text-sm font-semibold tracking-wide text-left">
                  Date
                </th>
                <th className="p-3 text-sm font-semibold tracking-wide text-left">
                  Customer
                </th>
                <th className="p-3 text-sm font-semibold tracking-wide text-left">
                  Cruise
                </th>
                <th className="w-32 p-3 text-sm font-semibold tracking-wide text-left">
                  Check-in
                </th>
                <th className="w-32 p-3 text-sm font-semibold tracking-wide text-left">
                  Check-out
                </th>
                <th className="w-32 p-3 text-sm font-semibold tracking-wide text-left">
                    Cruise Fee
                </th>
                <th className="w-32 p-3 text-sm font-semibold tracking-wide text-left">
                    Tax
                </th>
                <th className="w-32 p-3 text-sm font-semibold tracking-wide text-left">
                  Total
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {currentItems?.map((booking) => (
                <tr key={booking.bookingId} className="bg-white">
                  <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                    {new Date(booking.createdAt).toLocaleDateString("en-US", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })}
                  </td>
                  <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                    {booking.userId.email}
                  </td>
                  <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                    {booking.cruiseId?.name}
                  </td>

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
                    ₹ {booking.fee}
                    </td>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                    ₹ {booking.tax}
                    </td>
                  <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                    ₹ {booking.total}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>



          <div className="flex justify-center my-3">
  {Array.from({ length: totalPages }, (_, index) => (
    <button
      key={index}
      className={`mx-3 px-3 py-2 rounded-md ${
        index + 1 === currentPage ? 'bg-[#0f0c2d] text-white' : 'bg-gray-300'
      }`}
      onClick={() => setCurrentPage(index + 1)}
    >
      {index + 1}
    </button>
  ))}
</div>



        </div>
        ):<Loading/>}


        <div className="grid w-[100%] grid-cols-1 sm:grid-cols-2  gap-4 md:hidden">
          {currentItems?.map((booking) => (
            <div
              key={booking.bookingId}
              className="bg-white space-y-3 p-4 rounded-lg shadow"
            >
              <p className="mb-2">{booking.bookingId}</p>
              <div className="flex items-center space-x-2 text-sm">
                <div>
                  <p className="text-blue-500 font-bold "></p>
                  <p className="text-xs"></p>
                </div>
                <div className="text-gray-500 ">
                  {" "}
                  {new Date(booking.createdAt).toLocaleDateString("en-US", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}
                </div>
                <div className="px-2">

                </div>
              </div>
              <div className="text-sm text-gray-700">
                <div>
                  <span className="font-medium">User: </span>{" "}
                  {booking.userId.name}
                </div>
                <div className="mt-3">
                  <span className="font-medium">Cruise: </span>
                  {booking.cruiseId?.name}
                </div>
              </div>
              <div className="text-sm text-gray-700">
                {" "}
                {new Date(booking.checkIn).toLocaleDateString("en-US", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}{" "}
                -{" "}
                {new Date(booking.checkOut).toLocaleDateString("en-US", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
              </div>

              <div className="text-sm  font-medium text-black">
                Fee: ₹ {booking.fee} <br />
                Tax: ₹ {booking.tax} <br />
                Total: ₹ {booking.total}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SalesReport;

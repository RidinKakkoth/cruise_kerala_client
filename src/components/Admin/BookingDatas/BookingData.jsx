import React, { useEffect, useState } from "react";
import Loading from "../../Shared/Loading";
import { getBookings } from "../../../config/AdminEndpoints";
import CruiseDetailModal from "../../Shared/CruiseSingleModal/CruiseDetailModal";

function BookingData() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCruiseId, setSelectedCruiseId] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // Number of items per page
  const [searchQuery, setSearchQuery] = useState("");

  const emailRegex = /\S+@\S+\.\S+/; 
  
  const filteredData = data?.filter((booking) => {
    const cruiseNameMatch = booking.cruiseId.name.toLowerCase().includes(searchQuery.toLowerCase());
    const userEmailMatch = emailRegex.test(booking.userId.email) && booking.userId.email.toLowerCase().includes(searchQuery.toLowerCase());
    return cruiseNameMatch || userEmailMatch;
  });
  
  


const indexOfLastItem = currentPage * itemsPerPage;
const indexOfFirstItem = indexOfLastItem - itemsPerPage;
const currentData = filteredData.slice(indexOfFirstItem, indexOfLastItem);

const handlePageChange = (pageNumber) => {
  setCurrentPage(pageNumber);
}

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  const handleSingle = (cruiseId) => {
    setSelectedCruiseId(cruiseId);
    toggleModal();
  };


  useEffect(()=>{
    async function invoke(){
      const data=await getBookings()      
       setData(data?.bookingData);
        setLoading(false);
    }
    invoke()
  },[])



  return (
    <div>
      <div className="p-2 h-screen mt-2 ms-4 md:w-[78vw] bg-gray-100">

        <div className="mb-4 flex justify-between mt-2">
        <h1 className="text-xl mb-2">Bookings</h1>
          <input
            className=" py-2 border rounded-2xl px-2 w-96 "
            type="text"
            placeholder="Search by email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

{!loading?   (<div className="overflow-auto rounded-lg shadow hidden md:block">
          <table className="w-full">
            <thead className="bg-gray-50 border-b-2 border-gray-200">
              <tr>
                <th className="w-20 p-3 text-sm font-semibold tracking-wide text-left">
                  Booking No
                </th>
                <th className="w-20 p-3 text-sm font-semibold tracking-wide text-left">
                  Date
                </th>
                <th className="p-3 text-sm font-semibold tracking-wide text-left">
                  User
                </th>
                <th className="p-3 text-sm font-semibold tracking-wide text-left">
                  Cruise
                </th>
                {/* <th className="p-3 text-sm font-semibold tracking-wide text-left">Customer</th> */}
                <th className="w-24 p-3 text-sm font-semibold tracking-wide text-left">
                  Status
                </th>
                <th className="w-24 p-3 text-sm font-semibold tracking-wide text-left">
                  Check-in
                </th>
                <th className="w-24 p-3 text-sm font-semibold tracking-wide text-left">
                  Check-out
                </th>
                <th className="w-32 p-3 text-sm font-semibold tracking-wide text-left">
                  Total
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {currentData?.map((booking) => (
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
                    {booking.userId.email}
                  </td>
                  <td className="p-3 text-sm text-gray-700 whitespace-nowrap"><span className='text-blue-500 flex gap-2 cursor-pointer font-medium' onClick={()=>{handleSingle(booking.cruiseId)}}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z" />
</svg>
{booking.cruiseId.name}</span></td>
                  {/* <td className="p-3 text-sm text-gray-700 whitespace-nowrap">{booking.userId.name}</td> */}
                  <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                    <span
                      className={`p-1.5 text-xs font-medium uppercase tracking-wider ${
                        booking.status === "Booked"
                          ? "text-green-800 bg-green-200"
                          : booking.status === "Cancelled"
                          ? "text-red-800 bg-yellow-200"
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
          {modalOpen && (
            <CruiseDetailModal
              cruiseId={selectedCruiseId}
              onClose={toggleModal}
            />
          )}
        </div>):<Loading/>}

        <div className="flex justify-center mt-4">
          {filteredData.length > itemsPerPage && (
            <nav>
              <ul className="pagination">
                {Array.from({ length: Math.ceil(filteredData.length / itemsPerPage) }).map((_, index) => (
                  <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                    <button className="page-link" onClick={() => handlePageChange(index + 1)}>
                      {index + 1}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
          {currentData?.map((booking) => (
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
                  <span
                    className={`p-1.5 text-xs font-medium  tracking-wider ${
                      booking.status === "Booked"
                        ? "text-green-800 bg-green-200"
                        : booking.status === "Cancelled"
                        ? "text-yellow-800 bg-yellow-200"
                        : "text-gray-800 bg-gray-200"
                    } rounded-lg bg-opacity-50`}
                  >
                    {booking.status}
                  </span>
                </div>
              </div>
              <div className="text-sm text-gray-700">
                <div>
                  <span className="font-medium">User: </span>{" "}
                  {booking.userId.name}
                </div>
                <div className="mt-3">
                  <span className="font-medium">Cruise: </span>
                  {booking.cruiseId.name}
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

              <div className="text-sm font-medium text-black">
                Total: ₹ {booking.total}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default BookingData;

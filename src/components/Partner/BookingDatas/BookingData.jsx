import React, { useEffect, useState } from 'react';
import { cancelBooking, getBookings } from '../../../config/PartnerEndpoints';
import Loading from '../../Shared/Loading';
import CruiseDetailModal from '../../Shared/CruiseSingleModal/CruiseDetailModal';

function BookingData() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCruiseId, setSelectedCruiseId] = useState(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredData = data?.filter(
    (booking) =>
      booking.userId.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.bookingId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.cruiseId.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const itemsPerPage = 10;
  const totalPages = Math.ceil(filteredData?.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredData?.slice(startIndex, endIndex);

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  const handleSingle = (cruiseId) => {
    setSelectedCruiseId(cruiseId);
    toggleModal();
  };

  const cancelBook = async (id) => {
    const data = await cancelBooking(id);
    if (data.status === 'failed') {
      console.log('error');
    } else {
      setData(data.bookingData);
    }
  };

  useEffect(() => {
    async function invoke() {
      const data = await getBookings();
      setLoading(false);
      if (data) setData(data.data);
    }
    invoke();
  }, [data]);

  return (
    <>
      {!loading ? (
        <div>
              <div className="flex ml-10 justify-between me-5 mt-3">
                <h1 className="text-xl mb-2">Bookings</h1>
                <input
                  type="text"
                  placeholder="Search by Email, Booking ID, Cruise Name"
                  className="border rounded px-2 py-1 w-96"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
          {currentItems?.length > 0 ? (
            <div className="p-5 h-screen ms-4 md:w-[80vw] bg-gray-100">

              <div className="overflow-auto rounded-lg shadow hidden md:block">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b-2 border-gray-200">
                    <tr>
                      <th className="w-20 p-3 text-sm font-semibold tracking-wide text-left">Booking No</th>
                      <th className="w-20 p-3 text-sm font-semibold tracking-wide text-left">Date</th>
                      <th className="p-3 text-sm font-semibold tracking-wide text-left">User</th>
                      <th className="p-3 text-sm font-semibold tracking-wide text-left">Cruise</th>
                      <th className="w-24 p-3 text-sm font-semibold tracking-wide text-left">Status</th>
                      <th className="w-24 p-3 text-sm font-semibold tracking-wide text-left">Check-in</th>
                      <th className="w-24 p-3 text-sm font-semibold tracking-wide text-left">Check-out</th>
                      <th className="w-32 p-3 text-sm font-semibold tracking-wide text-left">Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {currentItems?.map((booking) => (
                      <tr key={booking.bookingId} className="bg-white">
                        <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                          <p className="font-bold text-gray-700 ">{booking.bookingId}</p>
                        </td>
                        <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                          {new Date(booking.createdAt).toLocaleDateString('en-US', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric',
                          })}
                        </td>
                        <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                          {booking.userId.email}
                        </td>
                        <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                          <span className='text-blue-500 flex gap-2 cursor-pointer font-medium' onClick={() => { handleSingle(booking.cruiseId) }}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z" />
                            </svg>
                            {booking.cruiseId.name}
                          </span>
                        </td>
                        <td className="p-3 text-sm text-gray-700 whitespace-nowrap">

{
booking?.status === "Booked" && new Date(booking.checkIn) > new Date() ? (
<button onClick={() => cancelBook(booking._id)}  className="font-medium text-sm border flex justify-around gap-2 rounded-xl text-white hover:bg-red-500 py-1 shadow bg-red-400 px-1 w-20">
Cancel
</button>
) : booking?.status === "Cancelled" ? (
<p  className="font-medium border  flex justify-around text-sm gap-2 cursor-default rounded-xl text-white py-1 shadow bg-red-500 px-1 w-20">
{booking.status}
</p>
) :booking?.status === "Booked" && new Date().getTime() > new Date(booking.checkIn).getTime() ? (
<p className="font-medium justify-around border text-sm flex gap-2 rounded-xl text-white py-1 shadow bg-green-500 px-1 w-20">
{booking.status}
</p>
) : null

}
</td>
                        <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                          {new Date(booking.checkIn).toLocaleDateString('en-US', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric',
                          })}
                        </td>
                        <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                          {new Date(booking.checkOut).toLocaleDateString('en-US', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric',
                          })}
                        </td>
                        <td className="p-3 text-sm text-gray-700 whitespace-nowrap">₹ {booking.total}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {modalOpen && (
                  <CruiseDetailModal cruiseId={selectedCruiseId} onClose={toggleModal} />
                )}

                <div className="flex justify-center items-center mb-4">
                  <div className="flex space-x-2">
                    {Array.from({ length: totalPages }, (_, index) => (
                      <button 
                        key={index}
                        className={`cursor-pointer bg-[#140d30] rounded mt-2 text-white px-2 ${index + 1 === currentPage ? 'bg-[#26185f]' : ''}`}
                        onClick={() => setCurrentPage(index + 1)}
                      >
                        {index + 1}
                      </button >
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
                {currentItems?.map((booking) => (
                  <div key={booking.bookingId} className="bg-white space-y-3 p-4 rounded-lg shadow">
                    <p className="mb-2">{booking.bookingId}</p>
                    <div className="flex items-center space-x-2 text-sm">
                      <div></div>
                      <div className="text-gray-500 ">
                        {new Date(booking.createdAt).toLocaleDateString('en-US', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric',
                        })}
                      </div>
                      <div className="px-2">
                        {/* ... Status buttons ... */}
                      </div>
                    </div>
                    <div className="text-sm text-gray-700">
                      <div>
                        <span className="font-medium">User: </span> {booking.userId.name}
                      </div>
                      <div className="mt-3">
                        <span className="font-medium">Cruise: </span>
                        {booking.cruiseId.name}
                      </div>
                    </div>
                    <div className="text-sm text-gray-700">
                      {new Date(booking.checkIn).toLocaleDateString('en-US', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                      })}{' '}
                      -{' '}
                      {new Date(booking?.checkOut).toLocaleDateString('en-US', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                      })}
                    </div>
                    <div className="text-sm font-medium text-black">Total: ₹ {booking.total}</div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="w-[80vw] flex justify-center h-[100vh] items-center ">
              <p className="mx-auto text-3xl text-gray-500 font-serif font-medium">No bookings</p>
            </div>
          )}
        </div>
      ) : (
        <div className="mx-auto">
          <Loading />
        </div>
      )}
    </>
  );
}

export default BookingData;

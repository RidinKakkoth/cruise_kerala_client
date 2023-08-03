import React, { useEffect, useState } from 'react';
import { getBookings } from '../../../config/PartnerEndpoints';
import Loading from '../../Shared/Loading'


function BookingData() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      async function invoke(){
        const data=  await getBookings()
        setLoading(false)
        if(data)setData(data.data);
      }
      invoke()
  }, []);


  return (
    <> 
    {!loading?(<div>
     {data.length>0? <div className="p-5 h-screen ms-4 md:w-[80vw] bg-gray-100">
        <h1 className="text-xl mb-2">Bookings</h1>

        <div className="overflow-auto rounded-lg shadow hidden md:block">
          <table className="w-full">
            <thead className="bg-gray-50 border-b-2 border-gray-200">
              <tr>
                <th className="w-20 p-3 text-sm font-semibold tracking-wide text-left">Booking No</th>
                <th className="w-20 p-3 text-sm font-semibold tracking-wide text-left">Date</th>
                <th className="p-3 text-sm font-semibold tracking-wide text-left">Customer</th>
                <th className="p-3 text-sm font-semibold tracking-wide text-left">Cruise</th>
                <th className="w-24 p-3 text-sm font-semibold tracking-wide text-left">Status</th>
                <th className="w-24 p-3 text-sm font-semibold tracking-wide text-left">Check-in</th>
                <th className="w-24 p-3 text-sm font-semibold tracking-wide text-left">Check-out</th>
                <th className="w-32 p-3 text-sm font-semibold tracking-wide text-left">Total</th>
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
                  <td className="p-3 text-sm text-gray-700 whitespace-nowrap">{new Date(booking.createdAt).toLocaleDateString('en-US', {  day: '2-digit',month: '2-digit', year: 'numeric'  })}</td>
                  <td className="p-3 text-sm text-gray-700 whitespace-nowrap">{booking.userId.name}</td>
                  <td className="p-3 text-sm text-gray-700 whitespace-nowrap">{booking.cruiseId.name}</td>
                  {/* <td className="p-3 text-sm text-gray-700 whitespace-nowrap">{booking.userId.name}</td> */}
                  <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                    <span
                      className={`p-1.5 text-xs font-medium uppercase tracking-wider ${
                        booking.status === 'Booked'
                          ? 'text-green-800 bg-green-200'
                          : booking.status === 'Shipped'
                          ? 'text-yellow-800 bg-yellow-200'
                          : 'text-gray-800 bg-gray-200'
                      } rounded-lg bg-opacity-50`}
                    >
                      {booking.status}
                    </span>
                  </td>
                  <td className="p-3 text-sm text-gray-700 whitespace-nowrap">        {new Date(booking.checkIn).toLocaleDateString('en-US', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric'
        })}</td>
                  <td className="p-3 text-sm text-gray-700 whitespace-nowrap">{new Date(booking.checkOut).toLocaleDateString('en-US', {            day: '2-digit',
          month: '2-digit',
          year: 'numeric'  })}</td>
                  <td className="p-3 text-sm text-gray-700 whitespace-nowrap">₹ {booking.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
          {data.map((booking) => (
            <div key={booking.bookingId} className="bg-white space-y-3 p-4 rounded-lg shadow">
                <p className='mb-2'>{booking.bookingId}</p>  
              <div className="flex items-center space-x-2 text-sm">
                <div>
                  <p className="text-blue-500 font-bold ">
                    
                    
                  </p>
                  <p className='text-xs'>
                  </p>
     
                </div>
                <div className="text-gray-500 "> {new Date(booking.createdAt).toLocaleDateString('en-US', {  day: '2-digit',month: '2-digit', year: 'numeric'  })}</div>
                <div className='px-2'>
                  <span
                    className={`p-1.5 text-xs font-medium  tracking-wider ${
                      booking.status === 'Booked'
                        ? 'text-green-800 bg-green-200'
                        : booking.status === 'Cancelled'
                        ? 'text-yellow-800 bg-yellow-200'
                        : 'text-gray-800 bg-gray-200'
                    } rounded-lg bg-opacity-50`}
                  >
                    {booking.status}
                  </span>
                </div>
              </div>
              <div className="text-sm text-gray-700">
                <div><span className='font-medium'>User: </span> {booking.userId.name}</div>
                <div className='mt-3'><span className='font-medium'>Cruise: </span>{booking.cruiseId.name}</div>
              
              </div>
              <div className="text-sm text-gray-700"> {new Date(booking.checkIn).toLocaleDateString('en-US', {            day: '2-digit',
          month: '2-digit',
          year: 'numeric'  })} - {new Date(booking.checkOut).toLocaleDateString('en-US', {            day: '2-digit',
          month: '2-digit',
          year: 'numeric'  })}</div>

              <div className="text-sm font-medium text-black">Total: ₹ {booking.total}</div>
            </div>
          ))}
        </div>
      </div>:<div className='w-[80vw] flex justify-center h-[100vh] items-center ' >
      <p className='mx-auto text-3xl text-gray-500 font-serif font-medium'>No bookings</p>
      </div> }

    </div>
    ):<div className='mx-auto'>
      <Loading/>
      </div>}
      </>
  );
}

export default BookingData;

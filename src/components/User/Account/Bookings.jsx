import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../../Shared/Loading";
import { cancelBooking, getBookings } from "../../../config/UserEndpoints";
import dateConvertor from "../../../utils/DateFormat";

function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const bookingsPerPage = 5;

  useEffect(() => {
    async function invoke() {
      const data = await getBookings();
      if (data.status === "failed") {
        console.log("error");
      }
      const found = data.bookingData;
      if (found) {
        setLoading(false);
        setBookings(found);
      }
    }
    invoke();
  }, []);

  const cancelBook = async (id) => {
    const data = await cancelBooking(id);
    if (data.status === "failed") {
      console.log("error");
    } else {
      setBookings(data.bookingData);
    }
  };

  const handleBooking = (id) => {
    navigate(`/account/bookings/${id}`);
  };

  const handleSearch = (value) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const displayedBookings = bookings.filter((booking) =>
    booking.cruiseId.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastBooking = currentPage * bookingsPerPage;
  const indexOfFirstBooking = indexOfLastBooking - bookingsPerPage;
  const currentBookings = displayedBookings.slice(
    indexOfFirstBooking,
    indexOfLastBooking
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="mt-2">
      <div className="flex gap-2 justify-end items-center mb-4">
        <input
          type="text"
          placeholder="Search by cruise name"
          onChange={(e) => handleSearch(e.target.value)}
          className="px-2 py-1 border rounded-2xl focus:outline-none focus:border-blue-500"
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          />
        </svg>
      </div>

      {!loading ? (
        currentBookings.length > 0 ? (
          <div>
            {currentBookings.map((booking, index) => (
              <div
                key={index}
                className="flex flex-wrap hover:bg-gray-300 mb-4 bg-gray-200 rounded-xl"
              >
                <div
                  onClick={() => {
                    handleBooking(booking._id);
                  }}
                  className="w-52 h-36 cursor-pointer mx-auto"
                >
                  <img
                    className="rounded-xl p-1 object-cover w-52 h-36 mt-1 ms-1"
                    src={booking.cruiseId.Images[0]}
                    alt="ddd"
                  />
                </div>

                <div className="py-3 ms-3 flex-col pr-3 grow">
                  <div className="flex">
                    <h2 className="text-xl">{booking.cruiseId.name}</h2>
                    <div className="flex gap-2 ml-auto text-black items-center">
                      {booking?.status === "Booked" && new Date(booking.checkIn) > new Date() ? (
                        <button
                          onClick={() => cancelBook(booking._id)}
                          className="font-medium border flex gap-2 rounded-xl text-white hover:bg-red-500 py-2 shadow bg-red-400 px-2"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M3 3l1.664 1.664M21 21l-1.5-1.5m-5.485-1.242L12 17.25 4.5 21V8.742m.164-4.078a2.15 2.15 0 011.743-1.342 48.507 48.507 0 0111.186 0c1.1.128 1.907 1.077 1.907 2.185V19.5M4.664 4.664L19.5 19.5"
                            />
                          </svg>
                          Cancel Booking
                        </button>
                      ) : booking?.status === "Cancelled" ? (
                        <p className="font-medium border flex gap-2 cursor-default rounded-xl text-white py-2 shadow bg-red-500 px-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          {booking.status}
                        </p>
                      ) : booking?.status === "Booked" && new Date().getTime() > new Date(booking.checkIn).getTime() ? (
                        <p className="font-medium border flex gap-2 rounded-xl text-white py-2 shadow bg-green-500 px-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"
                            />
                          </svg>
                          {booking.status}
                        </p>
                      ) : null}
                    </div>
                  </div>

                  <div className="flex gap-2 items-center border-t text-gray-500 border-gray-300 mt-2 py-2">
                    <div className="flex gap-2 items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
                        />
                      </svg>
                      <span className="font-medium">
                        {dateConvertor(booking.checkIn)}
                      </span>
                    </div>
                    &rarr;
                    <div className="flex gap-2 items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
                        />
                      </svg>
                      <span className="font-medium">
                        {dateConvertor(booking.checkOut)}
                      </span>
                    </div>
                    <div className="flex gap-2 ml-auto text-black items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <span className="font-medium">
                        Booking date: {dateConvertor(booking.createdAt)}
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-5">
                    <div className="flex mt-2 gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V6.75zm-12 0h.008v.008H6V6.75z"
                        />
                      </svg>
                      <span className="font-medium">Total guest: </span>{" "}
                      {booking.guest}
                    </div>
                    <div className="flex mt-2 gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z"
                        />
                      </svg>
                      <span className="font-medium">Total price: </span>₹ {booking.total}
                    </div>
                  </div>
                </div>
              </div>
            ))}
                      <div className="flex justify-center mt-4">
            <ul className="flex">
              {displayedBookings.length > 0 &&
                Math.ceil(displayedBookings.length / bookingsPerPage) > 1 &&
                Array.from({ length: Math.ceil(displayedBookings.length / bookingsPerPage) }).map(
                  (_, index) => (
                    <li key={index}>
                      <button
                        onClick={() => paginate(index + 1)}
                        className={`${
                          currentPage === index + 1
                            ? "bg-[#011742] text-white"
                            : "bg-white text-black"
                        } px-3 py-1 mx-1 rounded-lg focus:outline-none`}
                      >
                        {index + 1}
                      </button>
                    </li>
                  )
                )}
            </ul>
          </div>
          </div>
        ) : (
          <p className="text-center text-gray-500 mt-4">No matched results found.</p>
        )
      ) : (
        <Loading />
      )}
    </div>
  );
}

export default Bookings;

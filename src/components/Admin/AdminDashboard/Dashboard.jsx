import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  cruiseData,
  getBookings,
  getNotification,
  getPartnerData,
} from "../../../config/AdminEndpoints";
import AdminChart from "./AdminChart";
import SailingIcon from "@mui/icons-material/Sailing";

function Dashboard() {
  const [count, setCount] = useState();

  const [data, setData] = useState([]);
  const [partner, setPartner] = useState([]);
  const [cruise, setCruise] = useState([]);

  useEffect(() => {
    async function invoke() {
      const { bookingData } = await getBookings();
      setData(bookingData);
    }
    invoke();
  }, []);

  useEffect(() => {
    async function invoke() {
      const partnerData = await getPartnerData();
      setPartner(partnerData?.length);
      const cruiseDetail = await cruiseData();
      setCruise(cruiseDetail.data.length);
    }
    invoke();
  }, []);

  const totalRevenue = () => {
    return data.reduce((accumultaor, rate) => {
      return (accumultaor += rate.total);
    }, 0);
  };
  const totalCustomers = () => {
    const userData = [];
    data.forEach((item) => {
      userData.push(item.userId._id);
    });

    const distinctData = new Set(userData);
    return distinctData.size;
  };

  useEffect(() => {
    async function invoke() {
      const data = await getNotification();
      setCount(data?.data?.length);
    }
    invoke();
  }, []);

  const navigate = useNavigate();
  const handleChat = () => {
    navigate("/admin/chatbox");
  };
  const handleNotification = () => {
    navigate("/admin/notification");
  };

  return (
    <div className="bg-gray-200 rounded">
      <div className="flex  justify-end mt-3 py-2 me-3">
        <button
          onClick={handleChat}
          className="bg-cyan-300 group hover:scale-105 transform transition-transform flex justify-center items-center gap-2 me-2 text-white rounded h-10 w-24 "
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
              d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"
            />
          </svg>
          chat{" "}
        </button>
        <button
          onClick={handleNotification}
          className="bg-indigo-500 group hover:scale-105 transform transition-transform px-2 text-white gap-2 rounded h-10 flex justify-center items-center"
        >
          <span className="rounded-full w-6 h-6 ms-2 text-sm text-white-600 bg-red-500">
            {count > 0 ? count : ""}
          </span>
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
              d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
            />
          </svg>
          Notification{" "}
        </button>
      </div>

      <div className="grid bg-gray-200 py-3 grid-cols-1 md:grid-cols-4 gap-10 rounded-md container mt-2 mb-5 w-full">
        <div className="bg-white text-center shadow-2xl justify-around rounded-lg h-40 grid grid-cols-2 items-center  px-4 group group hover:scale-105 transform transition-transform">
          <div className="col-span-2 text-xl  font-bold border-b-2 py-3">
            REVENUE
          </div>
          <div className="col-span-1 mx-auto   ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-12 h-12"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 8.25H9m6 3H9m3 6l-3-3h1.5a3 3 0 100-6M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div className="col-span-1 font-medium text-green-600 text-xl mx-auto">
            ₹ {totalRevenue()}
          </div>
        </div>

        <div className="bg-white text-center shadow-2xl  rounded-lg h-40 grid grid-cols-2 items-center group hover:scale-105 transform transition-transform  px-4">
          <div className="col-span-2 text-xl  font-bold border-b-2 py-3">
            CRUISES
          </div>
          <div className="col-span-1 mx-auto  px-12 ">
            <SailingIcon sx={{ width: "40px", height: "40px" }} />
          </div>
          <div className="col-span-1 font-medium text-green-600 text-xl mx-auto">
            {" "}
            {cruise}
          </div>
        </div>
        <div className="bg-white text-center shadow-2xl  rounded-lg h-40 grid grid-cols-2 items-center group hover:scale-105 transform transition-transform  px-4">
          <div className="col-span-2 text-xl  font-bold border-b-2 py-3">
            PARTNERS
          </div>
          <div className="col-span-1 mx-auto  px-12 ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-12 h-12"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
              />
            </svg>
          </div>
          <div className="col-span-1 font-medium text-green-600 text-xl mx-auto">
            {" "}
            {partner}
          </div>
        </div>

        <div className="bg-white text-center shadow-2xl  rounded-lg h-40 grid grid-cols-2 items-center group hover:scale-105 transform transition-transform px-4">
          <div className="col-span-2 text-xl  font-bold border-b-2 py-3">
            TOTAL BOOKINGS
          </div>
          <div className="col-span-1 mx-auto  px-12">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="#011742"
              className="w-12 h-12"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z"
              />
            </svg>
          </div>
          <div className="col-span-1 font-medium text-green-600 text-xl mx-auto">
            {data?.length > 0 ? data?.length : ""}
          </div>
        </div>
      </div>
      <div className="w-full sm:w-[100%]">
        <AdminChart data={data} />
      </div>
    </div>
  );
}

export default Dashboard;

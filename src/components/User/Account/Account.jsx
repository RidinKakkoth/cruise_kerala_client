import React, { useState } from "react";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { baseApi } from "../../../store/Api";
import Bookings from "./Bookings";

function Account() {
  const [userName, setUserName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  // const[image,setImage]=useState("")

  useEffect(() => {
    axios
      .get(`${baseApi}getUserData`, { withCredentials: true })
      .then((res) => {
        setUserName(res.data.userData.name);
        setEmail(res.data.userData.email);
        setPhone(res.data.userData.phone);
      })
      .catch((error) => console.log(error));
  });

  let { subpage } = useParams();

  if (subpage === undefined) {
    subpage = "profile";
  }

  function activeClass(type = null) {
    let classes = "py-2 px-6 no-underline text-black inline-flex gap-2";

    if (type === subpage) {
      classes +=
        " bg-[#011742] text-white no-underline rounded-full ";
    }
    else{
      classes +=
      " bg-gray-200 text-black no-underline rounded-full ";
    }
    return classes;
  }

  return (
    <div className="mt-24 container  ">
      <nav className="w-full flex justify-center gap-2 font-medium  ">
        <Link className={activeClass("profile")} to={"/account/profile"}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
</svg>

          My Profile
        </Link>
        <Link className={activeClass("bookings")} to={"/account/bookings"}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
</svg>

          My bookings
        </Link>
      </nav>
      {subpage === "profile" && (
        <div className="flex justify-center">
          <div className="flex-col text-center mt-5 w-[30%] ">
            <img src="" className="" alt="profile img" />
            <input
              className="mt-4 border h-10 w-64 bg-gray-200 rounded-lg pl-4"
              value={userName}
              disabled
              type="text"
            />
            <input
              className="mt-4 border h-10 w-64 bg-gray-200 rounded-lg pl-4"
              value={email}
              disabled
              type="text"
            />
            <input
              className="mt-4 border h-10 w-64 bg-gray-200 rounded-lg pl-4"
              value={phone}
              disabled
              type="text"
            />
          </div>
        </div>
      )}

      {
        subpage==="bookings"&&(
          <Bookings/>
        )
      }
    </div>
  );
}

export default Account;

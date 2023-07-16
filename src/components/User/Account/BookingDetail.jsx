import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { baseApi } from "../../../store/Api";
import DetailViewGallery from "../Cruise/DetailViewGallery";

function BookingDetail() {
  const [data, setData] = useState(null);
  const[loading,setLoading]=useState(true)
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      axios.get(`${baseApi}bookings`, { withCredentials: true }).then((res) => {
        const found = res.data.bookingData.find(({ _id }) => _id === id); //destructure _id from res and checking
        if (found) {
            setLoading(false)
          setData(found.cruiseId);
        }
      });
    }
  }, [id]);
//   if (!data) {
//     return "";
//   }

  return (
    <div className="mt-24 container ">
{   loading?(<div class="flex flex-col items-center mb-96">
      <img class="w-52" src="https://raw.githubusercontent.com/spagnuolocarmine/spagnuolocarmine/main/sail.gif" alt="" />
      <h5 class="text-center">loading....</h5>
    </div>
    )  : (<div className="mt-4 bg-gray-200 mx-8 px-8 py-8 ">
        <h1 className="text-2xl">{data.name}</h1>
        <div className="flex mt-3">
          <div className="flex gap-2 ">
            <div className="flex">
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
                  d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                />
              </svg>
            </div>
            <p className="mt-2 ms-2  block font-semibold">{data.boarding},</p>
          </div>

          <p className="mt-2 mb-3 ms-2 block font-semibold">{data.district}</p>
        </div>

        <DetailViewGallery data={data} />
      </div>)}
    </div>
  );
}

export default BookingDetail;

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { baseApi } from  '../../../config/Api';
import DetailViewGallery from "../Cruise/DetailViewGallery";
import dateConvertor from "../../../utils/DateFormat";
import Rating from "@mui/material/Rating";
import { Box, Modal, TextField, Typography } from "@mui/material";
import Loading from "../../Shared/Loading";

function BookingDetail() {
  const [data, setData] = useState(null);
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [star, setStar] = useState(0);
  const [ferror, setfError] = useState(false);
  const [serror, setsError] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [trigger, setTrigger] = useState(false);
  const [ourStar, setOurStar] = useState(0);
  const [buttonHide, setButtonHide] = useState(false);
  const { id } = useParams();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    let isFormValid = true;

    if (feedback.length < 15) {
      setfError(true);
      isFormValid = false;
    } else {
      setfError(false);
    }

    if (star < 1) {
      setsError(true);
      isFormValid = false;
    } else {
      setsError(false);
    }

    if (isFormValid) {
      let obj={star,feedback,cruiseId:data._id}
      handleClose();
      axios.post(`${baseApi}review`,obj,{withCredentials:true}).then((res)=>{setTrigger(!trigger)}).catch((err)=>console.log(err))
    }
  };
  const handleFeedbackChange = (e) => {
    const value = e.target.value;
    setFeedback(value);
    setfError(false);
  };
  const handleStarChange = (e) => {
    const value = e.target.value;
    setStar(value);
    setsError(false);
  };

  useEffect(() => {
    if (id) {
      axios.get(`${baseApi}bookings`, { withCredentials: true }).then((res) => {
        const found = res.data.bookingData.find(({ _id }) => _id === id); //destructure _id from res and checking
        if (found) {
          setLoading(false);
          setBooking(found);
          setData(found.cruiseId);
          
        }
      });
    }
  }, [id,trigger]);


  useEffect(() => {
    console.log(data,"hgssssahghg");
    if (data?.review?.length>0) {
      const foundReview = data.review?.find((element) => element.userId === booking.userId);
      setOurStar(foundReview.ratings)
      if (foundReview) {
        setButtonHide(true);
      }
    }
  }, [data, booking]);

  

  return (
    <div className="mt-24 container ">
      {loading ? (
        <div class="flex flex-col items-center mb-96">
            <Loading/>
        </div>
      ) : (
        <div className="mt-4 bg-gray-200 mx-8 px-8 py-8 ">
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
              <p className="mt-2 ms-2  block font-semibold">
                {data?.boarding},
              </p>
            </div>

            <p className="mt-2 mb-3 ms-2 block font-semibold">
              {data.district}
            </p>
          </div>

          <DetailViewGallery data={data} />
        </div>
      )}

      <div className="mt-5 container">
        <div className="flex items-center justify-between py-3">
          {" "}
          <div>
            <h3 className="ms-3">Booking Details</h3>
          </div>
{!buttonHide? 
         <div className="flex">
            <button
              onClick={handleOpen}
              className="rounded-2xl me-3 w-32 h-8 px-2 shadow text-black font-semibold border   flex items-center justify-around" >
              {" "}
              Add review
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="#f7d800"
                className="w-6 h-6"
              >
                <path
                  fillRule="evenodd"
                  d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>:          <Rating
            className="me-3"
            name="simple-controlled"
            value={ourStar}    
            readOnly  
          />}
        </div>

        <div className="py-1 ms-3  flex-col pr-3 grow">
          <div className="flex-wrap sm:flex gap-2  items-center border-t text-gray-500 border-gray-300 mt-2 py-3">
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
                {dateConvertor(booking?.checkIn)}
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
                {dateConvertor(booking?.checkOut)}
              </span>
            </div>
            <div className="flex mt-3 sm:mt-0 gap-2 ml-auto text-black items-center">
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
                Booking date: {dateConvertor(booking?.createdAt)}
              </span>
            </div>
          </div>

          <div className="flex-wrap sm:flex gap-5 mb-3">
            <div className="flex mt-2 gap-2 ">
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
                  d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
                />
              </svg>
              <span className="font-medium">Total guest: </span>{" "}
              {booking?.guest}
            </div>
            <div className="flex mt-2 gap-2 ">
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
              <span className="font-medium">Total price: </span>₹{" "}
              {booking?.total}
            </div>
            <div className="flex mt-2 ml-auto gap-2 ">
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
                  d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0118 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3l1.5 1.5 3-3.75"
                />
              </svg>

              <span className="font-medium">Booking Id: </span>
              {booking?.bookingId}
            </div>
          </div>

          <div className="flex-wrap sm:flex gap-5 mb-4">
            <div className="flex mt-2 gap-2 ">
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
                  d="M20.893 13.393l-1.135-1.135a2.252 2.252 0 01-.421-.585l-1.08-2.16a.414.414 0 00-.663-.107.827.827 0 01-.812.21l-1.273-.363a.89.89 0 00-.738 1.595l.587.39c.59.395.674 1.23.172 1.732l-.2.2c-.212.212-.33.498-.33.796v.41c0 .409-.11.809-.32 1.158l-1.315 2.191a2.11 2.11 0 01-1.81 1.025 1.055 1.055 0 01-1.055-1.055v-1.172c0-.92-.56-1.747-1.414-2.089l-.655-.261a2.25 2.25 0 01-1.383-2.46l.007-.042a2.25 2.25 0 01.29-.787l.09-.15a2.25 2.25 0 012.37-1.048l1.178.236a1.125 1.125 0 001.302-.795l.208-.73a1.125 1.125 0 00-.578-1.315l-.665-.332-.091.091a2.25 2.25 0 01-1.591.659h-.18c-.249 0-.487.1-.662.274a.931.931 0 01-1.458-1.137l1.411-2.353a2.25 2.25 0 00.286-.76m11.928 9.869A9 9 0 008.965 3.525m11.928 9.868A9 9 0 118.965 3.525"
                />
              </svg>
              <span className="font-medium">Boarding: </span> {data?.boarding}
            </div>

            <div className="flex mt-2 ml-auto gap-2 ">
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
                  d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"
                />
              </svg>

              <span className="font-medium">Payment Id: </span>
              {booking?.paymentId}
            </div>
          </div>
        </div>
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            className="font-medium py-2"
            variant="h6"
            component="h2"
          >
            Rating
          </Typography>
          <Rating
            className=""
            name="simple-controlled"
            // value={star}
            // defaultValue={0}
            onChange={handleStarChange}
          />
          {serror && <p className="text-red-500">Choose rating !!</p>}
          <TextField
            className="mt-3 w-[100%]"
            id="outlined-multiline-static"
            label="feedback"
            onChange={handleFeedbackChange}
            multiline
            rows={4}
            placeholder="Enter your feedback..."
          />
          {ferror && (
            <p className="text-red-600">Minimum five words required !!</p>
          )}
          <div className="flex justify-around py-2 mt-3">
            <button
              onClick={handleSubmit}
              className="bg-green-700 w-20 text-white rounded-2xl h-8"
            >
              submit
            </button>
            <button
              onClick={handleClose}
              className="bg-red-700 w-20 text-white rounded-2xl h-8"
            >
              cancel
            </button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export default BookingDetail;

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",

  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

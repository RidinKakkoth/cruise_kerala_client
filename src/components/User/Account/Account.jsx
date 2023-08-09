import React, { useRef, useState } from "react";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Bookings from "./Bookings";
import { ToastContainer, toast } from "react-toastify";
import { CardMedia } from "@mui/material";
import './Account.css'
import { getUserData, updateProfileData, updateProfilePic } from "../../../config/UserEndpoints";

function Account() {
  const [userName, setUserName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [profileImage, setprofileImage] = useState("");

  const [trigger, setTrigger] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [open, setOpen] = useState(false);
  const [preview, setPreview] = useState(
    "https://cdn-icons-png.flaticon.com/512/147/147142.png"
  );
  const [buttonHide, setButtonHide] = useState(true);
  const inputEditRef=useRef(null)


  useEffect(() => {
    async function invoke(){
      const data= await getUserData()
   
      if(data)
         {
          const userData = data.userData;
          const { name, email, phone, image } = userData;
          setUserName(name);
          setEmail(email);
          setPhone(phone);
          setprofileImage(image);
  
          if (image) {
            setOpen(true);
          }
        }
    }
    invoke()
  }, [trigger]);

  function handleEditClick() {
    setEditMode(true);
  }

function  handleCancelClick() {
    setTrigger(!trigger);
    setEditMode(false);
  }
  async   function handleSaveClick() {
    const updatedProfileData = {
      userName,
      email,
      phone,
    };
    const data = await updateProfileData(updatedProfileData);
    console.log(data);
    if (data.success) {
      toast.success("Updated successfully", { position: "top-center" });
      setEditMode(false);
    }
    else{
      toast.error("Updation failed", { position: "top-center" });

    }

  }
  const handleImageChange = (e) => {
    setButtonHide(false);

    const file = e.target.files[0];

    const imgUrl = URL.createObjectURL(file);

    setprofileImage(file);
    setPreview(imgUrl);
    setOpen(false);
  };
  const inputRef = useRef();
  const handleImageClick = () => {
    inputRef.current.click();
  };

  const submitPicUpload = async (e) => {
    e.preventDefault();

    setButtonHide(true);
    const formData = new FormData();
    
    formData.append('image', profileImage);

    const data = await updateProfilePic(formData);
    if (data) {
      setprofileImage(data.url);
      setOpen(true);
    }

  };
  const cancelPicUpload = () => {
    setTrigger(!trigger);
    setButtonHide(true);
    
  };

  let { subpage } = useParams();

  if (subpage === undefined) {
    subpage = "profile";
  }

  function activeClass(type = null) {
    let classes = "py-2 px-6 no-underline text-black inline-flex gap-2";

    if (type === subpage) {
      classes += " bg-[#011742] text-white no-underline rounded-full ";
    } else {
      classes += " bg-gray-200 text-black no-underline rounded-full ";
    }
    return classes;
  }

  return (
    <div className="mt-24 container  ">
      <ToastContainer autoClose={3000} />
      <nav className="w-full flex justify-center gap-2 font-medium  ">
        <Link className={activeClass("profile")} to={"/account/profile"}>
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
              d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
            />
          </svg>
          My Profile
        </Link>
        <Link className={activeClass("bookings")} to={"/account/bookings"}>
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
              d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
            />
          </svg>
          My bookings
        </Link>
      </nav>
      {subpage === "profile" && (
        <div className="flex-col justify-center">
          <div className="flex-col text-center mx-auto justify-center mt-5 w-96   ">
            <div className="flex " >
              {open ? (
                <div className="image-container justify-center left-[110px] mx-auto w-[100%] ml-16 right-16 sm:right-0 sm:ml-4 flex ">
                  <CardMedia 
                    sx={{
                      height: 150,
                      width: 150,
                     display:"flex",
                     justifyContent:"center",
                      borderRadius: "50%",
                     
                      marginTop: 1,

                      borderStyle: "double",
                      borderColor: "#00ff68",
                      borderWidth: "5px",
                    }}
                    className="image flex justify-center "
                    component="img"
                    src={profileImage}
                    // src={`${baseApi}files/${profileImage}`}
                    title="choose image"
                  />
                  <div
                    className="hover-overlay-user " onClick={handleImageClick}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.opacity = 1;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.opacity = 0;
                    }}
                  >
                    <span className="hover-text">Choose image</span>
                  </div>
                </div>
              ) : (
                <div className="image-container left-[110px]  justify-center w-[100%] ml-16 right-16 sm:right-0 sm:ml-4 flex">
                  <CardMedia
                    sx={{
                      height: 150,
                      width: 150,
                      borderRadius: "50%",
                      // marginLeft: 9,
                      // left:50,
                      marginTop: 1,
                      borderStyle: "double",
                      borderColor: "#00ff68",
                      borderWidth: "5px",
                    }}
                    className="image"
                    component="img"
                    src={preview}
                    title="choose image"
                  />
                  <div onClick={handleImageClick}
                    className="hover-overlay-user"
                    onMouseEnter={(e) => {
                      e.currentTarget.style.opacity = 1;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.opacity = 0;
                    }}
                  >
                    <span className="hover-text">Choose image</span>
                  </div>
                </div>
              )}

              <input
                type="file"
                ref={inputRef}
                name="image"
                encType="multipart/form-data"
                onChange={handleImageChange}
                alt="dp"
                style={{ width: "100px", display: "none" }}
              />
            </div>

            {buttonHide ? (
              ""
            ) : (
              <div>
                <button
                  style={{
                    width: "100px",
                    marginLeft: "10px",
                    borderRadius: "20px",
                  }}
                  className="btn btn-primary mt-3"
                  onClick={submitPicUpload}
                >
                  Upload
                </button>
                <button
                  style={{
                    width: "100px",
                    marginLeft: "10px",
                    borderRadius: "20px",
                  }}
                  className="btn btn-danger mt-3"
                  onClick={cancelPicUpload}
                >
                  Cancel
                </button>
              </div>
            )}
      {/* <===================== edit user data ========================>*/ }
            {editMode ? (
              <div className="flex-col">
                <div>
                  <input
                    className="mt-4 border  h-10 w-64  bg-gray-200 rounded-lg pl-4"
                    defaultValue={userName}
                    autoFocus
                    onChange={(e) => setUserName(e.target.value)}
                    type="text"
                  />
                  <input
                    className="mt-4 border h-10 w-64 bg-gray-200 rounded-lg pl-4"
                    defaultValue={phone}
                    
                    onChange={(e) => setPhone(e.target.value)}
                    type="text"
                  />
                  <input
                    className="mt-4 border h-10 w-64 bg-gray-200 rounded-lg pl-4"
                    defaultValue={email}
                    
                    onChange={(e) => setEmail(e.target.value)}
                    type="text"
                  />
                </div>
                <div className="">
                  <button
                    className="mt-5 mr-2 bg-[#011742] w-28  hover:bg-green-400 text-white font-bold py-2 px-4 rounded-2xl"
                    onClick={handleSaveClick}
                  >
                    Save
                  </button>
                  <button
                    className="mt-4 bg-[#011742] w-28 hover:bg-red-400 text-white font-bold py-2 px-4 rounded-2xl"
                    onClick={handleCancelClick}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <>
                <input
                  className="mt-4 border h-10 w-64 bg-gray-200 rounded-lg pl-4"
                  value={userName}
                  disabled
                  type="text"
                />
                <input
                  className="mt-4 border h-10 w-64 bg-gray-200 rounded-lg pl-4"
                  value={phone}
                  disabled
                  type="text"
                />
                <input
                  className="mt-4 border h-10 w-64 bg-gray-200 rounded-lg pl-4"
                  value={email}
                  disabled
                  type="text"
                />
                <div className="">
                  <button
                    className="mt-5 bg-[#011742] w-40 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded-2xl"
                    onClick={handleEditClick}
                  >
                    Edit
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {subpage === "bookings" && <Bookings />}
    </div>
  );
}

export default Account;



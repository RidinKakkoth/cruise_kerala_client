import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Account.css";


//material-ui-items
import CardMedia from "@mui/material/CardMedia";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import ModeIcon from "@mui/icons-material/Mode";
import VerifiedIcon from "@mui/icons-material/Verified";
import GppMaybeIcon from "@mui/icons-material/GppMaybe";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import UpdateIcon from "@mui/icons-material/Update";
import Stack from "@mui/material/Stack";
import Loading from "../../Shared/Loading";
import {
  getPartnerProfileData,
  updateProfileData,
  updateProfilePic,
  updateProof,
} from "../../../config/PartnerEndpoints";

function Account() {
  const inputRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    async function invoke() {
      const data = await getPartnerProfileData();
      const partnerDetails = data.partnerData;

      const { name, email, phone, companyName, isApproved, image } =
        partnerDetails;
      setEditedName(name);
      setEditedPhone(phone);
      setEditedCompanyName(companyName);
      setEditedEmail(email);
      seteditedStatus(isApproved);
      setPartnerData(partnerDetails);
      setprofileImage(image);
      if (image) {
        setOpen(true);
      }
    }
    invoke();
  }, []);

  const [partnerData, setPartnerData] = useState("");
  const [editing, setEditing] = useState(false);
  const [editedName, setEditedName] = useState("");
  const [editedEmail, setEditedEmail] = useState("");
  const [editedCompanyName, setEditedCompanyName] = useState("");
  const [editedPhone, setEditedPhone] = useState("");
  const [editedStatus, seteditedStatus] = useState("");
  const [profileImage, setprofileImage] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [buttonHide, setButtonHide] = useState(true);
  const [proofbuttonHide, setproofButtonHide] = useState(false);

  const [open, setOpen] = useState(false);

  const [preview, setPreview] = useState(
    "https://cdn-icons-png.flaticon.com/512/147/147142.png"
  );

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = async () => {
    const updatedProfileData = {
      name: editedName,
      email: editedEmail,
      companyName: editedCompanyName,
      phone: editedPhone,
    };

    const data = await updateProfileData(updatedProfileData);
    if (data) {
      setEditing(false);
    }
  };

  const handleCancel = () => {
    setEditing(false);
    setEditedName(editedName);
    setEditedEmail(editedEmail);
    setEditedCompanyName(editedCompanyName);
    setEditedPhone(editedPhone);
  };

  const handleProof = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };
  const handleProofSubmit =async (e) => {
    setproofButtonHide(true);
    e.preventDefault();

    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile);

      const data =await updateProof(formData);
      if (data) {
        navigate(0);
      }
      try {
        const data = updateProof(formData);
        if (data) {
          navigate(0);
        }
      } catch (error) {
        console.log(error);
      }
      // axios.post(`${partnerApi}proof-upload`,formData,{
      //   headers: {
      //     "Content-Type": "multipart/form-data",
      //   },
      //   withCredentials: true,
      // }).then((response)=>{

      //   navigate(0)
      //   console.log("success");

      // }).catch((error)=>{
      //     console.log(error);
      // })
    }
  };

  const handleImageChange = (e) => {
    setButtonHide(false);

    const file = e.target.files[0];

    const imgUrl = URL.createObjectURL(file);

    setprofileImage(file);
    setPreview(imgUrl);
    setOpen(false);
  };

  const handleImageClick = () => {
    inputRef.current.click();
  };

  const submitPicUpload = async (e) => {
    e.preventDefault();

    setButtonHide(true);
    const formData = new FormData();
    formData.append("image", profileImage);

    const data = await updateProfilePic(formData);
    if (data) {
      setprofileImage(data.url);
      setOpen(true);
    }
  };

  const cancelPicUpload = () => {
    setButtonHide(true);
  };

  return (
    <>
      {partnerData ? (
        <div
          className="mbsc-col-12 mbsc-col-lg-6 "
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "25PX",
            maxWidth: "80%",
          }}
        >
          <div className="centered-container rounded-2xl shadow w-96 flex justify-center ">
            <div className=" profile-card-partner-account py-4 ">

              {editedStatus === "verified" ? (
                <VerifiedIcon
                  style={{
                    color: "#00c600",
                    fontSize: "2rem",
                    marginTop: "50px",
                    position: "absolute",
                    marginLeft: "200px",
                  }}
                />
              ) : (
                ""
              )}

              <div className="mx-auto" onClick={handleImageClick}>
                {open ? (
                  <div className="image-container mx-auto rounded-xl ">
                    <CardMedia
                      sx={{
                        height: 150,
                        width: 150,
                        borderRadius: "50%",
                        // marginLeft: 10,
                        marginTop: 1,
                        borderStyle: "double",
                        borderColor: "#00ff68",
                        borderWidth: "5px",
                      }}
                      className="image"
                      component="img"
                      src={profileImage}
                      title="choose image"
                    />
                    <div
                      className="hover-overlay"
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
                  <div className="image-container ">
                    <CardMedia
                      sx={{
                        height: 150,
                        width: 150,
                        borderRadius: "50%",
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
                    <div
                      className="hover-overlay "
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
                <div className="flex justify-center">
                  <button
                    style={{
                      width: "100px",
                      // marginLeft: "50px",
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

              <div className="partner-profile-card-acc-data  mx-auto">
                <div className="partner-acc-info  ">
                   
                  <p className="bg-gray-200 h-10  w-[100%] rounded-xl text-black text-center flex justify-center items-center">
                   <p className="ms-3 me-2"> Name:{"          "}</p>
                    {editing ? (
                      <input 
                        className="rounded text-center h-8 ms-4 w-[60%]"
                        type="text"
                        value={editedName}
                        onChange={(e) => setEditedName(e.target.value)}
                      />
                    ) : (
                       <p >{editedName}</p>
                    )}{" "}
                  </p>
                 
                  <p className="bg-gray-200 h-10 w-[100%] rounded-xl text-black text-center flex justify-center items-center">
                    {" "}
                    <p className="ms-3 me-2"> Email:{"  "} </p>
                    {editing ? (
                      <input
                      className="rounded text-center ms-4 h-8 w-[60%]"
                        type="text"
                        value={editedEmail}
                        onChange={(e) => setEditedEmail(e.target.value)}
                      />
                    ) : (
                      editedEmail
                    )}{" "}
                  </p>

                  <p className="bg-gray-200 h-10 w-[100%] rounded-xl text-black text-center flex justify-center items-center">
                    {" "}
                    <p className="ms-3 me-2"> Company:{"  "} </p>
                    {editing ? (
                      <input
                        
                        className="rounded text-center h-8 w-[60%]"
                        type="text"
                        value={editedCompanyName}
                        onChange={(e) => setEditedCompanyName(e.target.value)}
                      />
                    ) : (
                      editedCompanyName
                    )}{" "}
                  </p>

                  <p className="bg-gray-200 h-10 w-[100%] rounded-xl text-black text-center flex justify-center items-center">
                    {" "}
                    <p className=" me-2 ms-3"> Phone:{"  "} </p>
                    {editing ? (
                      <input
                        className="rounded text-center ms-4 h-8 w-[60%]"
                        type="text"
                        value={editedPhone}
                        onChange={(e) => setEditedPhone(e.target.value)}
                      />
                    ) : (
                      editedPhone
                    )}{" "}
                  </p>

                  <p className="bg-gray-200 h-10 w-[100%] rounded-xl text-black text-center flex justify-center items-center">
                    <p className="ms-3 ">Proof Status:{" "}</p>
                    {editedStatus === "verified" ? (
                      <p className="flex " style={{ marginRight: "5px", color: "green" }}>
                        Verified
                      </p>
                    ) : editedStatus === "upload proof" ? (
                      proofbuttonHide ? (
                        ""
                      ) : (
                        <div className="flex items-center gap-2">
                          <GppMaybeIcon
                            style={{ color: "red", marginLeft: "20px" }}
                          />
                          {/* <p className="flex" style={{ marginTop: "10px", color: "red" }}>
                            Upload Proof
                          </p> */}
                          <div className="flex ">
                            <input
                              className="file"
                              encType="multipart/form-data"
                              onChange={handleProof}
                              required
                              type="file"
                              style={{ width: "200px" }}
                            />

                            <p className="flex"
                              style={{
                                marginLeft: "25px",
                                textDecoration: "underline",
                                color: "blue",
                                cursor: "pointer",
                              }}
                              onClick={handleProofSubmit}
                            >
                              Upload
                            </p>
                          </div>
                        </div>
                      )
                    ) : editedStatus === "pending" ? (
                      <div className="flex items-center gap-2">
                        <PendingActionsIcon
                          style={{ color: "orange", marginLeft: "20px" }}
                        />
                        <p className="flex ms-4 me-2" style={{ marginTop: "10px", color: "orange" }}>
                          Pending for approval
                        </p>
                      </div>
                    ) : editedStatus === "rejected" ? (
                      <div>
                        <p style={{ marginTop: "10px", color: "orange" }}>
                          Rejected
                        </p>
                        {setproofButtonHide(false)}{" "}
                      </div>
                    ) : null}
                  </p>
                </div>
                <div className="user-actions flex justify-center ">
                  {editing ? (
                    <div direction="row" className="flex gap-3" spacing={2}>
                      <button
                        variant="outlined"
                        className="bg-green-400  w-24 h-10 rounded-xl font-medium text-white"
                        onClick={handleSave}
                        
                      ><UpdateIcon />
                        Update
                      </button>
                      <button
                        className="bg-red-400 w-24 h-10 rounded-xl font-medium text-white"
                        onClick={handleCancel}
                      ><HighlightOffIcon />
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <Stack direction="row" spacing={2}>
                      <button className=" rounded-2xl bg-blue-400 text-white mx-auto w-32 h-10"
                        variant="outlined"
                        onClick={handleEdit}
                        startIcon={<ModeIcon />}
                      >
                        Edit
                      </button>
                    </Stack>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center mx-auto">
          <Loading />
        </div>
      )}
    </>
  );
}

export default Account;

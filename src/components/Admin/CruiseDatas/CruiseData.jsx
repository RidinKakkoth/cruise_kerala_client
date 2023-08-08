import React, { useEffect, useState } from 'react';
import './CruiseData.css';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import RemoveModeratorIcon from '@mui/icons-material/RemoveModerator';
import ToggleOffIcon from '@mui/icons-material/ToggleOff';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import Loading from '../../Shared/Loading'
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import Swal from 'sweetalert2';
import CruiseDetailModal from "../../Shared/CruiseSingleModal/CruiseDetailModal";
import { blockCruise, cruiseApproval, cruiseData, getPartnerProfileData } from "../../../config/AdminEndpoints";


function CruiseData({ status }) {
  const [cruiseDetails, setCruiseDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [trigger, setTrigger] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCruiseId, setSelectedCruiseId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(3); // Number of items per page
  const [searchQuery, setSearchQuery] = useState('');

  const navigate = useNavigate();

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  
  const filteredCruiseDetails = cruiseDetails?.filter(obj =>
    ((status && obj.isApproved === 'verified') || (!status && obj.isApproved === 'pending')) &&
    obj.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
 
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentCruiseDetails = filteredCruiseDetails.slice(indexOfFirstItem, indexOfLastItem);
  
  const handleProfile =async (id) => {
    const data=  await getPartnerProfileData(id)
         if(data){
           const profileData = data?.partnerData;
          navigate('/admin/partner-profile', { state: profileData });
          }
     };
     const toggleModal = () => {
       setModalOpen(!modalOpen);
     };
   
     const handleSingle = (cruiseId) => {
       setSelectedCruiseId(cruiseId);
       toggleModal();
     };
   
     const handleRequest =async (status, id) => {
     
       Swal.fire({
         title: 'Are you sure?',
         text: 'You are approving cruise request',
         icon: 'question',
         showCancelButton: true,
         confirmButtonText: 'Yes',
         cancelButtonText: 'No'
       }).then((result) => {
         if (result.isConfirmed) {
   
           async function invoke(){
             const data=await cruiseApproval(status,id)
             if(data) setTrigger(!trigger);         
           }
           invoke()
         } else if (result.dismiss === Swal.DismissReason.cancel) {  
         }
       });
     };
   
     const handleBlock =async (id) => {
   
       const data=await blockCruise(id)
       if(data){    
         setTrigger(!trigger); 
             toast.success('Success', { position: 'top-center' });
       }
     };
   
     const handleProof = (proof) => {
       const link = document.createElement('a');
       link.href = proof.pdf
       link.download = proof;
       document.body.appendChild(link);
       link.click();
       document.body.removeChild(link);
     };
   
   
     useEffect(() => {
   
      async function invoke(){
       const data=await cruiseData()
       setLoading(false)
       setCruiseDetails(data.data);
      }
      invoke()
     }, [trigger]);

  return (
    <div className="cruise-container">
      <input
      className='mt-3 ms-3 border  rounded-2xl py-1 px-2'
  type="text"
  placeholder="Search by name..."
  value={searchQuery}
  onChange={(e) => setSearchQuery(e.target.value)}
/>


      {!loading ? (
        <div>
          <ToastContainer autoClose={1000} />
          <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 lg:max-w-[80%]">

            {currentCruiseDetails?.length > 0 ? (
            
            currentCruiseDetails?.map((obj, index) => {

                return (
                  <Card
                    key={index}
                    sx={{
                      display: 'flex',
                      marginTop: '20px',
                      justifyContent: 'space-between',
                    }}
                    className='shadow rounded-2xl h-[300px] sm:h-[175px]'
                  >


                <Box  sx={{ display: 'flex', flexDirection: 'column' }}>
                  <CardContent sx={{ flex: '1 0 auto' }}>
                    <Typography className='text-black font-sans text-sm' component="div" style={{ color: '#01772', fontWeight: '500' }} variant="h5">
                      {obj.name}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" style={{ marginBottom: '10px' }} component="div">
                      {obj.category.name}
                    </Typography>

                   <div>
                   <div className=' grid-cols-3 flex flex-wrap ' style={{  gap: '30px' }}>
                      <div className= ''>
                        <p id="cruise-all-p">Rate : {obj.baseRate}</p>
                        <p id="cruise-all-p">Boarding : {obj.boarding}</p>
                        <p id="cruise-all-p">Rooms : {obj.rooms}</p>
                      </div>
                       <div className= '' style={{}}>
                        <p id="cruise-all-p" className='flex gap-2' onClick={() => { handleProfile(obj.partnerId) }}>
                          Partner Details: <span className='flex gap-2 text-indigo-600' style={{  cursor: 'pointer' }}>View <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
</svg>
</span>
                        </p>
                        <p id="cruise-all-p">District : {obj.district}</p>
                        <p id="cruise-all-p">Block : {obj.isBlocked ? (
                          <ToggleOnIcon onClick={() => { handleBlock(obj._id) }} checked={obj.isBlocked} style={{ color: 'red', fontSize: '2rem', cursor: 'pointer' }} />
                        ) : (
                          <ToggleOffIcon onClick={() => { handleBlock(obj._id) }} checked={obj.isBlocked} style={{ fontSize: '2rem', cursor: 'pointer' }} />
                        )}</p>
                      </div>
                       <div className= '' style={{ marginLeft: '25px' }}>
                        <p className='flex gap-2' onClick={() => { handleProof(obj.Liscence) }} style={{ color: '#f74e0c', cursor: 'pointer' }}>
                          Licence <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0118 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3l1.5 1.5 3-3.75" />
</svg>

                        </p>
                        {status === true ? (
                          <p className='flex gap-2' id="cruise-all-p">
                            Status :
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="green" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
</svg>

                          </p>
                        ) : null}
                        {status === true ? (
                          ''
                        ) : (
                          <div>
                            <Button
                              onClick={() => handleRequest('verified', obj._id)}
                              style={{ marginRight: '10px', fontSize: '0.6rem', padding: '6px 12px' }}
                              variant="outlined"
                              startIcon={<VerifiedUserIcon style={{ color: 'green', fontSize: '0.8rem' }} />}
                              size="small"
                            >
                              Approve
                            </Button>
                            <Button
                              onClick={() => handleRequest('rejected', obj._id)}
                              style={{ fontSize: '0.6rem', padding: '6px 12px' }}
                              variant="outlined"
                              startIcon={<RemoveModeratorIcon style={{ color: 'red', fontSize: '0.8rem' }} />}
                              size="small"
                            >
                              Reject
                            </Button>
                          </div>
                        )}
                      </div>
                   </div>

                    </div>
                  </CardContent>
                </Box>


                 <div className="img-c-cntnr   " onClick={() => handleSingle(obj)}>
                 <CardMedia
  component="img"
  sx={{ height: '200px', width: '300px', objectFit: 'cover' }} // Adjust the height and width as needed
  src={obj.Images[0]}
  alt="Cruise"
  className='object-cover   '
/>

                      <div
                        className="card-media-overlay"
                        onMouseEnter={(e) => {
                          e.target.nextSibling.style.opacity = 1;
                        }}
                        onMouseLeave={(e) => {
                          e.target.nextSibling.style.opacity = 0;
                        }}
                      ></div>
                      <div className="card-media-overlay">
                        <span className="hover-text-cd">VIEW</span>
                      </div>
                    </div>
                    {modalOpen && (
                      <CruiseDetailModal
                        cruiseId={selectedCruiseId}
                        onClose={toggleModal}
                      />
                    )}
                  </Card>
                )
              // }
              // return null;
            })
            ):
            <div className="text-center w-[80vw] flex justify-center items-center h-[80vh] text-gray-500">
           <h5> No results found.</h5>
          </div>
          
          }
          </div>
          <div className="flex justify-center mt-4">
            {cruiseDetails.length > itemsPerPage && (
              <nav>
                <ul className="pagination">
                  {Array.from({ length: Math.ceil(cruiseDetails.length / itemsPerPage) })?.map((_, index) => (
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
        </div>
      ) : (
        <div className='flex justify-center h-[100vh] items-center'>
          <Loading/>
        </div>
      )}
    </div>
  );
}

export default CruiseData;
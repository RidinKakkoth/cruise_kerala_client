// import React, { useState } from 'react';
// import {  useLocation } from 'react-router-dom';
// import Card from '@mui/material/Card';
// import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
// import RemoveModeratorIcon from '@mui/icons-material/RemoveModerator';
// import VerifiedIcon from '@mui/icons-material/Verified';
// import AttachFileIcon from '@mui/icons-material/AttachFile';
// import 'primeicons/primeicons.css';
// import 'primereact/resources/themes/saga-blue/theme.css';
// import 'primereact/resources/primereact.css';
// import './PartnerProfile.css';
// import {  baseApi } from  '../../../config/Api';
// import { Button } from '@mui/material';
import { getPartnerCruiseData, partnerApproval } from '../../../config/AdminEndpoints';
// import Sidebar from '../../Shared/Sidebar/Sidebar';

// const PartnerProfile = () => {
//   const location = useLocation();

//   const { name, email, phone, companyName, isApproved, image, proof, _id } = location.state  

//   const [status, setStatus] = useState(isApproved);

//   const handleDownload = () => {
//     const link = document.createElement('a');
//     link.href = `${proof}`;
//     link.download = proof;
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };

//   const handleRequest = async(result) => {
    
//      const data=await partnerApproval(result,_id)
//      if(data){
//               const resData = data.status;
//               setStatus(resData);
//      }

   
//   };


//   return (
//    <div className='flex '>
//     <Sidebar userType={"admin"}   />
//     <div className="centered-container-partner-profile mx-auto">
      
//       <Card className="profile-card-partner rounded-3xl shadow">
//         <h3 style={{ marginLeft: '100px' }}>PROFILE</h3>
//         <div>
//           {status === 'verified' ? (
//             <VerifiedIcon style={{ color: '#00c600', fontSize: '2rem', position: 'absolute', marginLeft: '170px' }} />
//           ) : (
//             ''
//           )}
//           <img
//             className="profile-pic-partner"
//             src={image ? `${image}` : 'https://static.vecteezy.com/system/resources/previews/019/896/008/original/male-user-avatar-icon-in-flat-design-style-person-signs-illustration-png.png'}
//             alt="profile pic"
//             style={{ height: '150px', width: '150px', borderRadius: '50%', objectFit: 'cover' }}
//           />
//         </div>
//         <div className="partner-profile-card-data">
//           <div className="partner-info">
//             <p>Name: {name}</p>
//             <p>Email: {email}</p>
//             <p>Company: {companyName}</p>
//             <p>Phone: {phone}</p>
//             <p>
//               Status: <span style={status === 'verified' ? { color: '#00c600' } : { color: 'orange' }}>{status}</span>
//             </p>
// {       status==="verified"|| status==="pending"?  <p>
//               Proof: <span onClick={handleDownload} style={{ color: '#f74e0c', cursor: 'pointer' }}>
//                 <AttachFileIcon /> View
//               </span>
//             </p>:""}
//             {status === 'verified' ? (
//               ''
//             ) : 
//             status==='upload proof'?<p className='text-red-500'>pending proof upload</p>
            
            
            
//             :(
//               <div>
//                 <Button
//                   onClick={() => handleRequest('verified')}
//                   style={{ marginRight: '10px' }}
//                   variant="outlined"
//                   startIcon={<VerifiedUserIcon style={{ color: 'green' }} />}
//                 >
//                   Accept
//                 </Button>
//                 <Button
//                   onClick={() => handleRequest('rejected')}
//                   variant="outlined"
//                   startIcon={<RemoveModeratorIcon style={{ color: 'red' }} />}
//                 >
//                   Reject
//                 </Button>
//               </div>
//             )}
//           </div>
//         </div>
//       </Card>
//     </div>
//    </div>
//   );
// };

// export default PartnerProfile;
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Card from '@mui/material/Card';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import RemoveModeratorIcon from '@mui/icons-material/RemoveModerator';
import VerifiedIcon from '@mui/icons-material/Verified';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { Button } from '@mui/material';
import Sidebar from '../../Shared/Sidebar/Sidebar';
import CruiseDetailModal from '../../Shared/CruiseSingleModal/CruiseDetailModal';

const PartnerProfile = () => {
  const location = useLocation();

  const { name, email, phone, companyName, isApproved, image, proof, _id } = location.state;

  const [status, setStatus] = useState(isApproved);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCruiseId, setSelectedCruiseId] = useState(null);

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  const handleSingle = (cruise) => {
    setSelectedCruiseId(cruise);
    toggleModal();
  };


  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = `${proof}`;
    link.download = proof;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleRequest = async (result) => {
    const data = await partnerApproval(result, _id);
    if (data) {
      const resData = data.status;
      setStatus(resData);
    }
  };
  
useEffect(()=>{
async function invoke(){
  const data =await getPartnerCruiseData( _id);
  if (data) {
    setLoading(false)
   setData(data); 
  }
}
invoke()

},[_id])



  return (
    <div className='flex  '>
      <Sidebar userType={'admin'} />
      <div className='flex flex-wrap mx-auto gap-3 my-auto bg-white px-3 py-3 rounded-xl shadow'>

      <div className='centered-container-partner-profile  min-w-[350px]  mx-auto'>
        <Card sx={{borderRadius:"15px"}} className='profile-card-partner rounded-3xl shadow-md'>
          <div className='relative'>
            {status === 'verified' && (
              <VerifiedIcon
                className='text-green-500 absolute left-52 top-0 text-2xl'
                />
                )}
            <img
              className='profile-pic-partner h-40 w-40 rounded-full object-cover mx-auto mt-6 shadow'
              src={
                image
                ? `${image}`
                : 'https://static.vecteezy.com/system/resources/previews/019/896/008/original/male-user-avatar-icon-in-flat-design-style-person-signs-illustration-png.png'
              }
              alt='profile pic'
              />
          </div>
          <div className='partner-profile-card-data p-8 '>
            <div className='partner-info'>
              <p className='text-lg font-medium mb-2'>Name: {name}</p>
              <p className='mb-2 font-medium text-gray-700'>Email: {email}</p>
              <p className='mb-2 font-medium text-gray-700'>Company: {companyName}</p>
              <p className='mb-2 font-medium text-gray-700'>Phone: {phone}</p>
              <p className='mb-2 font-medium text-gray-700'>
                Status:{' '}
                <span
                  className={
                    status === 'verified'
                    ? 'text-green-500'
                    : 'text-orange-500'
                  }
                  >
                  {status}
                </span>
              </p>
              {status === 'verified' || status === 'pending' ? (
                <p className='mb-2 font-medium text-gray-700 '> 
                Status:{' '}
                  Proof:{' '}
                  <span
                    onClick={handleDownload}
                    className='cursor-pointer text-red-500'
                    >
                    <AttachFileIcon className='inline-block' /> View
                  </span>
                </p>
              ) : null}
              {
                status === 'verified' ? (
                  ''
                  ) : 
                  
                  status === 'upload proof' ? (
                    <p className='text-red-500'>pending proof upload</p>
                    ) : (
                      <div className='mt-4 space-x-2'>
                  <Button
                    onClick={() => handleRequest('verified')}
                    className='border border-green-500 text-green-500 px-4 py-2 rounded'
                    startIcon={
                      <VerifiedUserIcon className='text-green-500' />
                    }
                    >
                    Accept
                  </Button>
                  <Button
                    onClick={() => handleRequest('rejected')}
                    className='border border-red-500 text-red-500 px-4 py-2 rounded'
                    startIcon={<RemoveModeratorIcon className='text-red-500' />}
                    >
                    Reject
                  </Button>
                </div>
              )}
            </div>
          </div>
        </Card>
      </div>
      <div className='centered-container-partner-profile bg-white shadow-md rounded-2xl    mx-auto'>
        <h4 className='mt-3 ms-4 mb-3'>Cruises</h4>
        <div className='grid grid-cols-2 '>

       {data?.map((value,index)=>{
         return <div onClick={()=>{handleSingle(value)}} className='ms-4 bg-gray-100 px-2 py-2 me-4 shadow-sm rounded-xl flex gap-2 mb-2 cursor-pointer hover:bg-gray-200 text-gray-600 font-medium ' key={index}><img className='w-20 h-20 object-cover rounded ' src={value.Images[0]} alt="" /> <span className='flex item'>{value.name}</span></div>
        })}
        </div>
      </div>
      {modalOpen && (
            <CruiseDetailModal
              cruiseId={selectedCruiseId}
              onClose={toggleModal}
            />
          )}
        </div>
    </div>
  );
};

export default PartnerProfile;

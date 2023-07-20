import React, { useEffect, useState } from 'react'
import { adminApi } from '../../../store/Api';
import axios from 'axios';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';



function UserData() {
    const [data, setData] = useState([]);
    const [block, setBlock] = useState(false);

    useEffect(() => {
      axios.get(`${adminApi}get-userData`, { withCredentials: true })
        .then((res) => {
          setData(res.data);
          console.log(res.data);
  
        })
        .catch((error) => {
          console.error('Error fetching datas:', error);
        });
    }, [block]);


    const handleBlock = (id) => {
        
        axios.get(`${adminApi}blockUser?id=${id}`, { withCredentials: true }).then((res) => {
        // axios.patch(`${adminApi}blockUser?id=${id}`, { withCredentials: true }).then((res) => {
            setBlock(!block)
        }).catch((error) => {
          console.log(error);
        });
      };
  
    return (
      <div>
        <div className="p-5 h-screen ms-4 md:w-[80vw] bg-gray-100">
          <h1 className="text-xl mb-2">User Data</h1>
  
          <div className="overflow-auto rounded-lg shadow hidden md:block">
            <table className="w-full">
              <thead className="bg-gray-50 border-b-2 border-gray-200">
                <tr>
                  <th className="w-20 p-3 text-sm font-semibold tracking-wide text-left">No</th>
                  <th className="w-20 p-3 text-sm font-semibold tracking-wide text-left">Name</th>
                  <th className="p-3 text-sm font-semibold tracking-wide text-left">Phone</th>
                  <th className="p-3 text-sm font-semibold tracking-wide text-left">Email</th>
                  {/* <th className="p-3 text-sm font-semibold tracking-wide text-left">Customer</th> */}
                  <th className="w-24 p-3 text-sm font-semibold tracking-wide text-left">Status</th>
                  <th className="w-24 p-3 text-sm font-semibold tracking-wide text-left">Block</th>

                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {data.map((data,index) => (
                  <tr key={data._id} className="bg-white">
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                      <p className="font-bold text-blue-500 ">
                        {index+1}
                      </p>
                    </td>
                    {/* <td className="p-3 text-sm text-gray-700 whitespace-nowrap">{index+1}</td> */}
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">{data.name}</td>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">{data.phone}</td>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">{data.email}</td>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
  <span
    className={`p-1.5 text-xs font-medium uppercase tracking-wider ${
      data?.isBlocked === false
        ? 'text-green-800 bg-green-200'
        : data.isBlocked
        ? 'text-red-500 bg-yellow-200'
        : 'text-gray-800 bg-gray-200'
    } rounded-lg bg-opacity-50`}
  >
    {data?.isBlocked === false ? 'Active' : 'Blocked'}
  </span>
</td>

                   
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">      <FormControlLabel  onClick={()=>{handleBlock(data._id)}} control={<Switch  />} checked={data.isBlocked}  /></td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
  
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
            {data.map((data,index) => (
              <div key={data._id} className="bg-white space-y-3 p-4 rounded-lg shadow">
                  <p className='mb-2'>{index+1}</p>  
                <div className="text-sm text-gray-700">
                  <div><span className='font-medium'>User: </span> {data.name}</div>
                  <div className='mt-3'><span className='font-medium'>Phone: </span>{data.phone}</div>
                  <div className='mt-3'><span className='font-medium'>Email: </span>{data.email}</div>
                
                </div>
                <div className="flex items-center space-x-2 text-sm">

                  <div className="text-gray-500 "> <FormControlLabel control={<Switch  />} checked={data.isBlocked} onClick={()=>{handleBlock(data._id)}} /></div>
                  <div className='px-2'>
                  <span
    className={`p-1.5 text-xs font-medium uppercase tracking-wider ${
      data?.isBlocked === false
        ? 'text-green-800 bg-green-200'
        : data.isBlocked
        ? 'text-red-500 bg-yellow-200'
        : 'text-gray-800 bg-gray-200'
    } rounded-lg bg-opacity-50`}
  >
    {data?.isBlocked === false ? 'Active' : 'Blocked'}
  </span>
                  </div>
                </div>
                <div className="text-sm text-gray-700"> </div>
  

              </div>
            ))}
          </div>
        </div>
      </div>
    );
}

export default UserData

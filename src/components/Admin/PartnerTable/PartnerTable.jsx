import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Switch from '@mui/material/Switch';
import 'bootstrap/dist/css/bootstrap.css';
import './PartnerTable.css';
import Loading from '../../Shared/Loading';
import { blockPartner, getPartnerData } from '../../../config/AdminEndpoints';

function PartnerTable({ status }) {
  const [search, setSearch] = useState('');
  const [partnerData, setPartnerData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [block, setBlock] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleBlock =async (id) => {
      const data=await blockPartner(id)
      if(data){
        setBlock(!block);
      }
  };

  const navigate = useNavigate();

  const viewClick = (obj) => {
    navigate('/admin/partner-profile', { state: obj });
  };

  const handleChange = (e) => {
    setSearch(e.target.value);

    const searchValues = e.target.value.toLowerCase().split(' ');
    const updatedData = partnerData.filter((item) => {
      const itemFields = [item.name, item.email, item.companyName, item.phone.toString()];
      const lowercasedItemFields = itemFields?.map((field) => field.toLowerCase());

      return searchValues.some((value) =>
        lowercasedItemFields.some((field) => field.includes(value))
      );
    });

    setFilterData(updatedData);
  };

  useEffect(() => {
    async function invoke(){
        const data=await getPartnerData()
        if(data){
         setPartnerData(data);
        setLoading(false);
        setFilterData(data);
        }
    }
    invoke()
  }, [block]);

  return (
    !loading ? (
      <div className="table-wrapper ">
        <div className="table mt-5">
          <div className="search2">
            <h4 className="me-auto text-black font-serif">Partner Data</h4>
            <input
              className=" rounded border border-gray-500  h-9 px-2 "
              type="text"
              placeholder="Search here"
              onChange={handleChange}
              value={search}
            />
          </div>
          <div className="overflow-auto rounded-lg shadow hidden md:block"> 
          <table className="w-full " bordered>
            <thead className="bg-gray-50 border-b-2 border-gray-200 ">
              <tr>
                {/* <th>Sl.no</th> */}
                <th className="p-3 text-sm font-semibold tracking-wide ">Name</th>
                <th className="p-3 text-sm font-semibold tracking-wide ">Company Name</th>
                <th className="p-3 text-sm font-semibold tracking-wide ">Email</th>
                <th className="p-3 text-sm font-semibold tracking-wide ">Phone</th>
                <th className="w-32 p-3 text-sm font-semibold tracking-wide ">View</th>
                <th className="w-32 p-3 text-sm font-semibold tracking-wide ">Blocked</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filterData?.map((obj, index) => {
                if ((status && obj.isApproved === 'verified') || (!status && obj.isApproved === 'pending') ||(!status && obj.isApproved === 'upload proof')) {
                  return (
                    <tr key={index} className="bg-white">

                      <td className="p-3 text-sm text-gray-700 whitespace-nowrap" >{obj.name}</td>
                      <td className="p-3 text-sm text-gray-700 whitespace-nowrap">{obj.companyName}</td>
                      <td className="p-3 text-sm text-gray-700 whitespace-nowrap">{obj.email}</td>
                      <td className="p-3 text-sm text-gray-700 whitespace-nowrap">{obj.phone}</td>
                      <td className="p-3 text-sm text-gray-700 whitespace-nowrap  flex justify-center ">

                          <p className='cursor-pointer flex ' onClick={() => viewClick(obj)}>
                          <svg    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-green-400">
  <path strokeLinecap="round" strokeLinejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z" />
</svg>
                          </p>

                      </td>
                      <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                        <Switch onChange={() => { handleBlock(obj._id) }} checked={obj.isBlocked} color="warning" />
                      </td>
                    </tr>
                  );
                }
                return null;
              })}
            </tbody>
          </table>
          </div>
        </div>
      </div>
    ) : (
        <div className='flex justify-center mx-auto'>
          <Loading/>
        </div>
    )
  );
}

export default PartnerTable;

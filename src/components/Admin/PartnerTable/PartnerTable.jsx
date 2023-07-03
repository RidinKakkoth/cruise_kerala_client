import React, { useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import Table from 'react-bootstrap/Table'
// import Button from 'react-bootstrap/Button'
// import { Switch} from '@mobiscroll/react';
import Switch from '@mui/material/Switch';
import { adminApi } from '../../../store/Api';
import 'bootstrap/dist/css/bootstrap.css';
import './PartnerTable.css'
import { IconButton } from '@mui/material';
import PreviewIcon from '@mui/icons-material/Preview';


function PartnerTable() {

    const [search, setSearch] = useState("");
    const[partnerData,setPartnerData]=useState([])
    const[filterData,setFilterData]=useState([])


    const handleStatus=()=>{

    }

    const navigate=useNavigate()

    const viewClick=(obj)=>{
          navigate("/admin/partner-profile",{state:obj})
    }

    

    const handleChange = (e) => {
        setSearch(e.target.value);

      
        const searchValues = e.target.value.toLowerCase().split(" ");
        const updatedData = partnerData.filter((item) => {
          const itemFields = [item.name, item.email, item.companyName, item.phone.toString()];
          const lowercasedItemFields = itemFields.map(field => field.toLowerCase());
      
          return searchValues.some((value) =>
            lowercasedItemFields.some(field => field.includes(value))
          );
        });
      
        setFilterData(updatedData);
      }
      


    useEffect(()=>{
        axios.get(`${adminApi}getPartnerData`,{withCredentials:true}).then((response)=>{

            setPartnerData(response.data)
            setFilterData(response.data)

        }).catch((error)=>{
            console.log(error);
        })
    },[])


  return (
    <div className="table-wrapper">


    <div className="table">
      <div className="search2">

      <h2 className='heading'>PARTNER DATA</h2>

        <input
          className="search-box-partner"
          type="text"
          placeholder="Search here"
         onChange={handleChange}
          value={search}
        />
      </div>

      <Table className="mt-3 "  bordered >
        <thead style={{ color: "black" }}>
          <tr>
            <th>Sl.no</th>
            <th>Name</th>
            <th>Company Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>View</th>
            <th>Blocked</th>
          </tr>
        </thead>
        <tbody className="values " style={{ color: "black" }}>

          {
    
    filterData.map((obj, index) => {
            return (
              <tr key={index}>
                <td style={{color:"black"}}>{index + 1}</td>
                <td>{obj.name}</td>
                <td>{obj.companyName}</td>
                <td>{obj.email}</td>
                <td>{obj.phone}</td>
                <td>

                         <IconButton onClick={()=>viewClick(obj)} style={{color:"blue"}} aria-label="delete">
                            <PreviewIcon    />
                         </IconButton>

                </td>
                <td>
                  <Switch  checked={obj.isBlocked} color="warning" />
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
          </div>
  )
}

export default PartnerTable

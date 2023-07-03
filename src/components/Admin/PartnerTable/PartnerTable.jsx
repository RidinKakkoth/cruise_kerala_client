import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import { adminApi } from '../../../store/Api';
import 'bootstrap/dist/css/bootstrap.css';
import './PartnerTable.css'


function PartnerTable() {

    const[partnerData,setPartnerData]=useState("")
    const[filterData,setFilterData]=useState([])

    useEffect(()=>{
        axios.get(`${adminApi}getPartnerData`,{withCredentials:true}).then((response)=>{

        }).catch((error)=>{
            console.log(error);
        })
    })


  return (
    <div className="table-wrapper">


    <div className="table">
      <div className="search2">

      <h2 className='heading'>USER DATA</h2>

        <input
          className=""
          type="text"
          placeholder="Search here"
        //   onChange={handleChange}
        //   value={search}
        />
      </div>

      <Table className="mt-3 "  bordered >
        <thead style={{ color: "black" }}>
          <tr>
            <th>Sl.no</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Edit</th>
            <th>Delete </th>
          </tr>
        </thead>
        <tbody className="values " style={{ color: "black" }}>

          {
    
    filterData.map((obj, index) => {
            return (
              <tr>
                <td style={{color:"black"}}>{index + 1}</td>
                <td>{obj.firstname} {obj.lastname}</td>
                <td>{obj.email}</td>
                <td>{obj.phone}</td>
                <td>
                  {/* <Button className='edit-btn'
                    onClick={() => editUser(obj._id, obj.firstname,obj.lastname, obj.email,obj.phone)}
                    variant="primary"
                  >
                    Edit
                  </Button> */}
                </td>
                <td>
                  {/* <Button className='delete-btn' onClick={() => DeleteUser(obj._id)} variant="danger">
                    Delete
                  </Button> */}
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

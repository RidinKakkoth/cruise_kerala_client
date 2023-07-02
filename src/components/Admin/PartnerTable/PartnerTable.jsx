import React, { useEffect, useState } from 'react'
import axios from 'axios'
import adminApi from '../../../store/Api'


function PartnerTable() {

    const[partnerData,setPartnerData]=useState("")
    const[filterData,setFilterData]=useState("")

    useEffect(()=>{
        axios.get(`${adminApi}getPartnerData`,{withCredentials:true}).then((response)=>{

        }).catch((error)=>{
            console.log(error);
        })
    })


  return (
    <div>
      
    </div>
  )
}

export default PartnerTable

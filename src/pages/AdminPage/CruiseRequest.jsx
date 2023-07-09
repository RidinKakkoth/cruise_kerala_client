import React from 'react'
import Sidebar from '../../components/Shared/Sidebar/Sidebar'
import CruiseData from '../../components/Admin/CruiseDatas/CruiseData'

function CruiseRequest() {
  return (
    <div style={{display:"flex"}} >
       {/* <div style ={{position:"fixed"}}>   */}
       <div >  
         <Sidebar userType="admin" />
       </div>
       {/* <div style={{marginLeft:"270px"}}> */}
       <div >
          <CruiseData status={false}/>
       </div>
    </div>
  )
}

export default CruiseRequest

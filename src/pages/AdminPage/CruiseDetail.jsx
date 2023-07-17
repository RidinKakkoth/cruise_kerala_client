import React from 'react'
import Sidebar from '../../components/Shared/Sidebar/Sidebar'
import CruiseData from '../../components/Admin/CruiseDatas/CruiseData'

function CruiseDetail() {
  return (
    <div className='w-[100%]' style={{display:"flex"}} >
      <div className='' >

      <Sidebar userType="admin"  />
      </div>
      <div className='overflow-y-auto h-[100vh] w-[100vw]'>

      <CruiseData status={true}/>
      </div>
    </div>
  )
}

export default CruiseDetail

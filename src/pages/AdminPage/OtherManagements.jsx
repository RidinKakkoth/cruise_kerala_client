import React from 'react'
import OtherSettings from '../../components/Admin/Other/OtherSettings'
import Sidebar from '../../components/Shared/Sidebar/Sidebar'

function OtherManagements() {
  return (
  <div className='w-[100%]' style={{display:"flex"}} >
  <div className='' >

  <Sidebar userType="admin"  />
  </div>
  <div className='overflow-y-auto h-[100vh] w-[100vw]'>

<OtherSettings/>
  </div>
</div>

  )
}

export default OtherManagements

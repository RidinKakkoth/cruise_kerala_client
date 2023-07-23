import React from 'react'
import NotificationList from '../../components/Admin/Notications/NotificationList'
import Sidebar from '../../components/Shared/Sidebar/Sidebar'

function Notification() {
  return (
    <div className='w-[100%]' style={{display:"flex"}} >
      <div className='' >

      <Sidebar userType="admin"  />
      </div>
      <div className='overflow-y-auto h-[100vh] w-[100vw]'>

    <NotificationList/>
      </div>
    </div>
  )
}

export default Notification

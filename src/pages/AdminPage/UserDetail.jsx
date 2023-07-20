import React from 'react'
import Sidebar from '../../components/Shared/Sidebar/Sidebar'
import UserData from '../../components/Admin/UserData/UserData'

function UserDetail() {
  return (
    <div style={{display:"flex"}} >
      <Sidebar userType={"admin"}   />
      <UserData />
    </div>
  )
}

export default UserDetail

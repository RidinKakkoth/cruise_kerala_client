import React from 'react'
import Sidebar from '../../components/Partner/Sidebar/Sidebar'
import CruisesTable from '../../components/Partner/Cruises/CruisesTable'

function Cruises() {
  return (
    <div style={{display:"flex"}} >
      <Sidebar />
      <CruisesTable/>
    </div>
  )
}

export default Cruises


import React from 'react'
import Sidebar from '../../components/Shared/Sidebar/Sidebar'
import CruisesTable from '../../components/Partner/Cruises/CruisesTable'

function Cruises() {
  return (
    <div style={{ display: "flex" }}>

      <div >
        <Sidebar userType="partner" />
      </div>

      <div className='overflow-auto h-[100vh] w-[100vw]'>
        <CruisesTable />
      </div>
    </div>
  )
}

export default Cruises

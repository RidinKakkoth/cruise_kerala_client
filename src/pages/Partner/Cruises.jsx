// import React from 'react'
// import Sidebar from '../../components/Shared/Sidebar/Sidebar'
// import CruisesTable from '../../components/Partner/Cruises/CruisesTable'

// function Cruises() {
//   return (
//     <div style={{display:"flex"}} >
//       <Sidebar userType="partner"  />
//       <CruisesTable/>
//     </div>
//   )
// }

// export default Cruises
import React from 'react'
import Sidebar from '../../components/Shared/Sidebar/Sidebar'
import CruisesTable from '../../components/Partner/Cruises/CruisesTable'

function Cruises() {
  return (
    <div style={{ display: "flex" }}>
      {/* <div style={{ position: "fixed" }}> */}
      <div >
        <Sidebar userType="partner" />
      </div>
      {/* <div style={{ marginLeft: "270px" }}> */}
      <div >
        <CruisesTable />
      </div>
    </div>
  )
}

export default Cruises

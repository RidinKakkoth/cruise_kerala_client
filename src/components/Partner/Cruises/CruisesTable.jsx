import React from 'react'
import "./CruisesTable.css"
import { useNavigate } from 'react-router-dom'

function CruisesTable() {

  const navigate=useNavigate()

const handleClick=()=>{
  navigate('/partner/add-cruise')
}

  return (
    <div>
      <button onClick={handleClick}>AddCruises</button>
    </div>
  )
}

export default CruisesTable

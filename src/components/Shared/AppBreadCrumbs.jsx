import { Breadcrumbs } from '@mui/material'
import React from 'react'
import { Link, useLocation } from 'react-router-dom'

function AppBreadCrumbs() {
  
  const location=useLocation()
  let crumbLink=""

  const crumbPath=location.pathname.split("/").filter((path)=>path!=="")
                                            .map((crumb)=>{
                                                crumbLink+=`/${crumb}`
                                                return <Link to={crumbLink} key={crumb}>
                                                    {crumb}
                                                </Link>
                                            })


    return (
        <Breadcrumbs aria-label="breadcrumb"> 
        {crumbPath}
        </Breadcrumbs>
  )
}

export default AppBreadCrumbs

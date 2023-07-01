import React, { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import './Sidebar.css';

import { SidebarData } from './SidebarData';

function Sidebar() {
  const [sidebarVisible, setSidebarVisible] = useState(true);

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  return (
    <div>

   

     
        <div className={sidebarVisible?'sidebar-partner':"sidebar-hidden"}>
          <ul className='sidebar-partner-list'>
            {/* <li className='partner-avatar'><img src="" alt="dfhjkhnd" /></li> */}
            { sidebarVisible? <li className="toggle-icon-right">  <CloseIcon onClick={toggleSidebar} />   </li>: <li className="toggle-icon-left"> <MenuIcon onClick={toggleSidebar} />  </li>
            }
            {/* <li className={sidebarVisible?"toggle-icon-right":"toggle-icon-left"}>  {setSidebarVisible?<CloseIcon onClick={toggleSidebar} />:<MenuIcon onClick={toggleSidebar} />}   </li> */}
            {SidebarData.map((value, key) => {
              return (
                <li
                  key={key}
                  className='sidebar-partner-list-row'
                  id={window.location.pathname === value.link ? "partner-row-active" : ""}
                  onClick={() => { window.location.pathname = value.link }}
                >
                  <div id='sidebar-partner-icon'>{value.icon}</div>
                  {sidebarVisible && (
                  <div id='sidebar-partner-title'>{value.title}</div>
                  )}
                </li>
              )
            })}
          </ul>
        </div>

    </div>
  )
}

export default Sidebar;

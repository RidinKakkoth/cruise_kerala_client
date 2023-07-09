import React, { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import './Sidebar.css';

import { PartnerSidebarData } from './PartnerSidebarData';
import { AdminSidebarData } from './AdminSidebarData';

function Sidebar({ userType }) { // Include userType prop in function signature

  const [sidebarVisible, setSidebarVisible] = useState(true);

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  return (
    
      <div className={sidebarVisible ? 'sidebar-partner' : 'sidebar-hidden'}>
        <ul className='sidebar-partner-list'>
          {sidebarVisible ? (
            <li className="toggle-icon-right">
              <CloseIcon style={{cursor:"pointer"}} onClick={toggleSidebar} />
            </li>
          ) : (
            <li className="toggle-icon-left">
              <MenuIcon style={{cursor:"pointer"}} onClick={toggleSidebar} />
            </li>
          )}

          {userType === 'partner' ? (
            PartnerSidebarData.map((value, key) => (
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
            ))
          ) : (
            AdminSidebarData.map((value, key) => (
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
            ))
          )}
        </ul>
      </div>

  )
}

export default Sidebar;

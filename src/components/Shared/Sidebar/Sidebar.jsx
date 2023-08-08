import React, { useEffect, useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import './Sidebar.css';

import { PartnerSidebarData } from './PartnerSidebarData';
import { AdminSidebarData } from './AdminSidebarData';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { partnerLogout } from '../../../store/PartnerAuth';
import { adminLogout } from '../../../store/AdminAuth';

function Sidebar({ userType }) { // Include userType prop in function signature

  const [sidebarVisible, setSidebarVisible] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [, , removePartnerCookie] = useCookies(['partnerCookie']);
  const [, , removeAdminCookie] = useCookies(['adminCookie']);
  
  
  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };
  const handlePartnerLogout = () => {
    removePartnerCookie('partnerCookie');
    localStorage.clear();
    dispatch(partnerLogout());
    navigate('/partner');
  }
  const handleAdminLogout = () => {
    removeAdminCookie('adminCookie');
    localStorage.clear();
    dispatch(adminLogout());
    navigate('/admin');
  }
  
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setSidebarVisible(false);
      } else {
        setSidebarVisible(true);
      }
    };

    window.addEventListener('resize', handleResize);

    // Call the handleResize function initially
    handleResize();

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

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
            PartnerSidebarData?.map((value, key) => (
              <li
              key={key}
              className='sidebar-partner-list-row'
              id={window.location.pathname === value.link ? "partner-row-active" : ""}
              onClick={() => {
                if (value.title === "Logout") {
                  handlePartnerLogout();
                } else {
                  window.location.pathname = value.link;
                }
              }}
            >
              <div id='sidebar-partner-icon'>{value.icon}</div>
              {sidebarVisible && (
                <div id='sidebar-partner-title'>{value.title}</div>
              )}
            </li>
            ))
          ) : (
            AdminSidebarData?.map((value, key) => (
              <li
                key={key}
                className='sidebar-partner-list-row'
                id={window.location.pathname === value.link ? "partner-row-active" : ""}
                onClick={() => {
                  if (value.title === "Logout") {
                    handleAdminLogout();
                  } else {
                    window.location.pathname = value.link;
                  }
                }}
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

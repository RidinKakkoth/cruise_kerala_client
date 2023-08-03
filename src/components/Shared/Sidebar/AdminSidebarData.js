import React from 'react';
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';
import SailingIcon from '@mui/icons-material/Sailing';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import DirectionsBoatIcon from '@mui/icons-material/DirectionsBoat';
import LogoutIcon from '@mui/icons-material/Logout';

export const AdminSidebarData = [
  {
    title: 'Dashboard',
    icon: <SpaceDashboardIcon />,
    link: '/admin/dashboard',
  },
  {
    title: 'Users',
    icon: <PeopleAltIcon />,
    link: '/admin/users',
  },
  {
    title: 'Bookings',
    icon: <CollectionsBookmarkIcon />,
    link: '/admin/bookings',
  },
  {
    title: 'Cruises',
    icon: <SailingIcon />,
    link: '/admin/cruises',
  },
  {
    title: 'Cruises  Requests',
    icon: <DirectionsBoatIcon />,
    link: '/admin/cruise-request',
  },
  {
    title: 'Partners',
    icon: <SupervisedUserCircleIcon />,
    link: '/admin/partners',
  },
  {
    title: 'Partner Requests',
    icon: <HowToRegIcon />,
    link: '/admin/partner-request',
  },
  {
    title: 'Other Settings',
    icon: <HowToRegIcon />,
    link: '/admin/other',
  },
  {
    title: 'Logout',
    icon: <LogoutIcon />,
    // link: '/admin/logout',
  },
];

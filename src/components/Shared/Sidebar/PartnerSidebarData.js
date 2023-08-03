import React from 'react';
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';
import SailingIcon from '@mui/icons-material/Sailing';
import DiscountIcon from '@mui/icons-material/LocalOffer';
import LogoutIcon from '@mui/icons-material/Logout';




export const PartnerSidebarData = [
  {
    title: 'Dashboard',
    icon: <SpaceDashboardIcon />,
    link: '/partner/dashboard',
  },
  {
    title: 'Account',
    icon: <ManageAccountsIcon />,
    link: '/partner/account',
  },
  {
    title: 'Bookings',
    icon: <CollectionsBookmarkIcon />,
    link: '/partner/bookings',
  },
  {
    title: 'Cruises',
    icon: <SailingIcon />,
    link: '/partner/cruises',
  },
  {
    title: 'Offers',
    icon: <DiscountIcon />,
    link: '/partner/offers',
  },
  {
    title: 'Logout',
    icon: <LogoutIcon  />,
    // link: '/partner/logout',
    // onclick:Logout,
  },
];

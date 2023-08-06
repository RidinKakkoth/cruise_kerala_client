import React, { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { userLogout } from '../../../store/UserAuth';
import { useCookies } from 'react-cookie';

const pages = [
  { name: 'Cruises', path: '/cruises' },
  // { name: 'About', path: '/about' }
];
const settings = [ { name: 'Account', path: "/account" }, { name: 'Chat', path: "/chatbox" }];

function Navbar() {


  const[isUser,setIsUser]=useState(false)
  const data = useSelector((state) => state.User);
  const userToken = useSelector((state) => state?.User?.userToken);

  console.log(data,"data");

  console.log(userToken,"UT FROM STORE xxxxxxxxxxxxx");

  const UserName = data.userName;


  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [, , removeCookie] = useCookies(['userCookie']);
  const[userCookie]=useCookies(['userCookie'])
  
  // useEffect(()=>{
  //   const invoke=()=>{
  //   const cookieToken=  userCookie?.userCookie
  //   console.log(userCookie,"USE EFFECT cccokie token");
  //     const isUserCookieExists = cookieToken=== userToken;// can check token equalas
  //     if(isUserCookieExists)
  //     setIsUser(true)
  //     else
  //     setIsUser(false)
  //   }
  //   invoke()
  // },[userCookie, userToken])
  useEffect(() => {
    const cookieToken = userCookie?.userCookie;
    setIsUser(cookieToken === userToken);
  }, [userCookie.userCookie, userToken]);
  

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    removeCookie('userCookie');
    localStorage.clear();
    dispatch(userLogout());
    navigate('/');
  };

  return (
    <AppBar
      style={{
        background: "#011742"
      }}
      position="fixed"
 
    >
      <Container maxWidth="xl"      >
        <Toolbar disableGutters>
          <img
            src="https://www.pngall.com/wp-content/uploads/8/Rudder-PNG-Picture.png" // Replace with the URL or path to your image
            alt=""
            style={{ width: '30px', height: '30px', marginRight: '8px' }}
          />

          <Typography
            variant="h6"
            style={{ fontFamily: "'Bree Serif', serif" }}
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
              
            }}
          >
            Cruise 
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages?.map((page) => (
                <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center" style={{textDecoration:"none"}} component={Link} to={page.path}>
                    {page.name}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          {/* <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} /> */}
          <Typography
            variant="h5"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Cruise
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages?.map((page) => (
              <Button
                key={page.name}
                style={{ fontFamily: "'Bree Serif', serif" }}
                component={Link}
                to={page.path}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page.name}
              </Button>
            ))}
          </Box>
           { console.log(isUser,"iiiiiisssssssss",userToken,"uuuuuuutttttttttt")}

           {/* User settings or login button */}
           {isUser&&userToken? (


             
             <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="https://www.pngmart.com/files/22/User-Avatar-Profile-PNG-Isolated-Transparent.png" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
{settings?.map((setting) => (
  <MenuItem key={setting.name} onClick={handleCloseUserMenu}>
    <Typography textAlign="center" style={{textDecoration:"none"}} component={Link} to={setting.path}>
      {setting.name}
    </Typography>
  </MenuItem>
))}

                {/* Logout MenuItem */}
                <MenuItem onClick={handleLogout}>
                  <Typography  textAlign="center">Logout</Typography>
                </MenuItem>
              </Menu>
            </Box>
          ) : (
            <MenuItem onClick={handleCloseNavMenu}>
              <Typography textAlign="center" style={{fontFamily:"'Bree Serif', serif",color:"white"}} component={Link} to={'/signin'}>
                LOGIN
              </Typography>
            </MenuItem>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}


export default Navbar;

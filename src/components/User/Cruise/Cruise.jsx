import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import axios from 'axios';
import Navbar from '../../Shared/Navbar/Navbar'
import { baseApi } from '../../../store/Api';
import { Carousel } from 'react-responsive-carousel';
import './Cruise.css';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';

const drawerWidth = 240;

function Cruise() {
  const [cards, setCards] = React.useState([]);
  const navigate = useNavigate();

  const changeInput = () => {}

  React.useEffect(() => {
    axios.get(`${baseApi}cruise-data`, { withCredentials: true })
      .then((res) => {
        setCards(res.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleClick = (obj) => {
    navigate('/cruises/' + obj._id);
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Navbar />
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            {['Category', 'District', 'Price'].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <div className="container" id='conatiner-cruise'>
          <div className='searchbar'>
            <SearchIcon className='searchBar-icon' />
            <input
              type="text"
              placeholder='Search for your dream cruise'
              onChange={changeInput}
            />
          </div>
          <div className="cruise-cards">
            {cards && cards.length > 0 ? (
              cards
                .filter((card) => card.isApproved === "verified") // Filter cruises by isApproved === "verified"
                .map((card, index) => (
                  <div onClick={() => handleClick(card)} key={index} className="each-card shadow">
                    <Carousel showThumbs={false} showArrows={false}>
                      {card.Images.map((image, index) => (
                        <div key={index}>
                          <img src={`${baseApi}files/${image}`} alt="Banner" className='img-cruise-card' />
                        </div>
                      ))}
                    </Carousel>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <h5>{card.name}</h5>
                      {/* Rating */}
                    </div>
                    <p style={{ color: "#717171", fontWeight: '500' }}>{card.category}</p>
                    <p style={{ color: "#717171" }}>{card.boarding}, {card.district}</p>
                    <p style={{ color: "black", fontWeight: '600', marginTop: "15px" }}>₹{card.baseRate} <span style={{ color: "black", fontWeight: "400" }}>night</span> </p>
                  </div>
                ))
            ) : (
              <div class="flex flex-col items-center">
                <div className='justify-center'>
                  <img class="w-52" src="https://raw.githubusercontent.com/spagnuolocarmine/spagnuolocarmine/main/sail.gif" alt="" />
                  <h5 class="text-center">loading....</h5>
                </div>
              </div>
            )}
          </div>
        </div>
      </Box>
    </Box>
  );
}

export default Cruise;

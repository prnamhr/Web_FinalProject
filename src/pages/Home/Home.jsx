// Home.jsx
import  { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, InputBase, Badge, Button, Grid, useMediaQuery } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Pin from './Pin';
import './index.css';
import Masonry from 'react-masonry-css';
const Home = () => {
  const { username } = useParams();
  const [pins, setPins] = useState([]);
  const searchStyle = {
    position: 'relative',
    borderRadius: '20px',
    backgroundColor: '#fff',
    '&:hover': { backgroundColor: 'rgba(255,255,255,0.25)' },
    marginRight: '16px',
    marginLeft: 'auto',
    width: '660%',
  };

  const searchIconStyle = {
    color:'#ba5d17',
    padding: '0 16px',
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };


  useEffect(() => {
    const fetchPins = async () => {
      try {
        const response = await fetch('http://localhost:3000/pins');
        const data = await response.json();
        setPins(data);
      } catch (error) {
        console.error('Error fetching pins:', error);
      }
    };

    fetchPins();
  }, []);
  const breakpointColumnsObj = {
    default: 5, // Number of columns by default
    1100: 4, // Number of columns on screens between 1100px and 700px
    700: 3, // Number of columns on screens between 700px and 500px
    500: 2, // Number of columns on screens below 500px
  };
  return (
      <div className="mainPage">
        <div className="toolbar">
          <AppBar position="static" color="default" elevation={0}>
            <Toolbar sx={{ backgroundColor: '#64806a', color: '#fff' }}>
              <img src="/pic/logo.png" alt="Logo" style={{width: '45px', height: '45px'}}/>
              <Grid container margin="10px">
                <Grid item style={{marginRight: '3px'}}>
                  <Button
                      sx={{
                        backgroundColor: '#ba5d17',
                        color: '#fff',
                        borderReduis:'15px'
                      }}
                  >
                    Home
                  </Button>
                </Grid>
                <Grid item style={{marginRight: '10px'}}>
                  <Link to={`/${username}/creation`} style={{textDecoration: 'none'}}>
                    <Button sx={{color:'#fff'}}>
                      Create
                    </Button>
                  </Link>
                </Grid>
              </Grid>

              <div style={searchStyle}>
                <div style={searchIconStyle}>
                  <SearchIcon/>
                </div>
                <InputBase
                    placeholder="Search"
                    inputProps={{'aria-label': 'search'}}
                    style={{paddingLeft: '60px', width: '100%'}}
                />
              </div>

              <IconButton aria-label="show notifications" color="ierit">
                <Badge badgeContent={4} sx={{colo:'#ba5d17'}}>
                  <NotificationsIcon/>
                </Badge>
              </IconButton>
              <IconButton
                  edge="end"
                  aria-label="account of current user"
                  aria-controls="primary-search-account-menu"
                  aria-haspopup="true"
                  color="inherit"
              >
                <AccountCircle/>
              </IconButton>
              <IconButton aria-label="display more actions" edge="end" color="inherit">
                <MoreVertIcon/>
              </IconButton>
            </Toolbar>
          </AppBar>
        </div>
        <div className="mainContainer2" style={{marginTop: "50px"}}>
          <Masonry
              breakpointCols={breakpointColumnsObj}
              className="my-masonry-grid"
              columnClassName="my-masonry-grid_column"
          >
            {pins.map((pin) => (
                <div key={pin.post_id}>
                  <Pin post={pin}/>
                </div>
            ))}
          </Masonry>
        </div>
      </div>
  );
};

export default Home;

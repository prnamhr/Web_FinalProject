// Home.jsx
import  { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, InputBase, Button, Grid,Paper,List,ListItem,ListItemText } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Pin from './Pin';
import './index.css';
import Masonry from 'react-masonry-css';
import PersonIcon from "@mui/icons-material/Person.js";
const Home = () => {
  const {username} = useParams();
  const [pins, setPins] = useState([]);
  // Add this to your component's state
  const [searchInput, setSearchInput] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const searchStyle = {
    position: 'relative',
    borderRadius: '20px',
    backgroundColor: '#fff',
    '&:hover': {backgroundColor: 'rgba(255,255,255,0.25)'},
    marginRight: '16px',
    marginLeft: 'auto',
    width: '660%',
  };

  const searchIconStyle = {
    color: '#e27d60',
    padding: '0 16px',
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const searchUsers = async () => {
    try {
      const response = await fetch(`http://localhost:3000/${searchInput}/finduser`);
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      const data = await response.json();
      console.log(data)
      setSearchResults(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };
  useEffect(() => {
    console.log(searchInput);
    if (searchInput) {
      searchUsers();
    } else {
      setSearchResults([]);
    }
  }, [searchInput]);


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
    default: 6, // Number of columns by default
    1100: 5, // Number of columns on screens between 1100px and 700px
    700: 4, // Number of columns on screens between 700px and 500px
    500: 3, // Number of columns on screens below 500px
  };
  return (
      <div className="mainPage">
        <div className="toolbar">
          <AppBar position="static" color="default" elevation={0}>
            <Toolbar sx={{backgroundColor: '#64806a', color: '#fff'}}>
              <img src="/pic/logo.png" alt="Logo" style={{width: '45px', height: '45px'}}/>
              <Grid container margin="10px">
                <Grid item style={{marginRight: '3px'}}>
                  <Button
                      sx={{
                        backgroundColor: '#e27d60',
                        color: '#fff',
                        borderReduis: '15px'
                      }}
                  >
                    Home
                  </Button>
                </Grid>
                <Grid item style={{marginRight: '10px'}}>
                  <Link to={`/${username}/creation`} style={{textDecoration: 'none'}}>
                    <Button sx={{color: '#fff'}}>
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
                    inputProps={{ 'aria-label': 'search' }}
                    style={{ paddingLeft: '60px', width: '100%' }}
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                />

              </div>

              <IconButton
                  edge="end"
                  aria-label="account of current user"
                  aria-controls="primary-search-account-menu"
                  aria-haspopup="true"
                  color="inherit"
              >
                <AccountCircle style={{ fontSize: '40px' }} />

              </IconButton>
              <IconButton aria-label="display more actions" edge="end" color="inherit">
                <MoreVertIcon/>
              </IconButton>
            </Toolbar>
          </AppBar>
        </div>
        <div className="mainContainer2" style={{marginTop: '30px'}}>
          <Masonry
              breakpointCols={breakpointColumnsObj}
              className="my-masonry-grid"
              columnClassName="my-masonry-grid_column"
          >
            {pins.map((pin) => (
                <div key={pin.post_id}>
                  <Link to={`/${username}/post/${pin.post_id}`} style={{textDecoration: 'none'}}>
                    <Pin post={pin}/>
                  </Link>
                </div>
            ))}
          </Masonry>
        </div>
        {searchResults.length > 0 && (
            <Paper
                elevation={3}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  padding: '15px',
                  width: '60%',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                  position: 'absolute',
                  top: '19%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  borderRadius: '10px',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                  backgroundColor: '#fff',
                }}
            >
          <List>
                {searchResults.map((user) => (
                    <ListItem key={user.id}>
                      <PersonIcon sx={{fontSize: 35, color: '#e27d60', marginRight: '5px'}}/>
                      <ListItemText primary={user.username} />
                    </ListItem>
                ))}
              </List>
            </Paper>
        )}
      </div>
  );
};

export default Home;

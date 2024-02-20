import { Link, useParams } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Typography, InputBase, Badge, Button, Grid, useTheme } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import './index.css'

const Home = () => {
  const { username } = useParams();
  const theme = useTheme();
  const searchStyle = {
    position: 'relative',
    borderRadius: '20px',
    backgroundColor: '#F5E8DD',
    '&:hover': { backgroundColor: 'rgba(255,255,255,0.25)' },
    marginRight: '16px',
    marginLeft: 'auto', 
    width: '660%', 
  };
  
  const searchIconStyle = {
    padding: '0 16px',
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };
  const mainStyle = {
    flex: 1,
    height: "auto", 
    marginTop: "15px",
    display: "grid",
    gridTemplateColumns: "repeat(auto-filled, 300px)",
    gridAtoRows: "10px"
  };

  return (
    <div className='mainPage'>
    <div className='tollbar'>
    <AppBar position="static" color="default" elevation={0}>
      <Toolbar>
        <img src="/pic/logo.png" alt="Logo" style={{ width: '30px', height: '30px' }} />
        <Grid container margin="10px">
          <Grid item style={{ marginRight: '3px'} }>
              <Button sx={{
                backgroundColor: '#e989b9',
                color: '#fff',
               
              }}>Home</Button>
          </Grid>
          <Grid item style={{ marginRight: '10px' }}>

            <Link to={`/${username}/creation`} style={{ textDecoration: 'none' }}>
              <Button sx={{
                backgroundColor: '#aa24c1',
                color: '#fff',
                '&:hover': {
                  backgroundColor: '#e989b9',
                },
              }}>Create</Button>
            </Link>
          </Grid>
        </Grid>

        <div style={searchStyle}>
          <div style={searchIconStyle}>
            <SearchIcon />
          </div>
          <InputBase
            placeholder="Search"
            inputProps={{ 'aria-label': 'search' }}
            style={{ paddingLeft: '60px', width: '100%' }}
          />
        </div>

        <IconButton aria-label="show notifications" color="inherit">
          <Badge badgeContent={4} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <IconButton
          edge="end"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <IconButton
          aria-label="display more actions"
          edge="end"
          color="inherit"
        >
          <MoreVertIcon />
        </IconButton>

      </Toolbar>
    </AppBar>
    </div>
    <div className='mainContainer' style={mainStyle}>
    
    </div>
    </div>
  );
};

export default Home;

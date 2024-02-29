import {useState, useEffect} from 'react';
import {Link, useParams} from 'react-router-dom';
import {
    AppBar, Toolbar, IconButton, InputBase, Button, Grid, List, ListItem, ListItemText, Paper, Avatar
    , Box, Typography,Stack
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import './index.css';
import PersonIcon from "@mui/icons-material/Person.js";

const User = () => {
    const {username} = useParams();
    const [userData, setUserData] = useState(null);
    const [searchInput, setSearchInput] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [followersCount, setFollowersCount] = useState(0);
    const [followingCount, setFollowingCount] = useState(0);

    const searchStyle = {
        position: 'relative',
        borderRadius: '20px',
        backgroundColor: '#fff',
        '&:hover': {backgroundColor: 'rgba(255,255,255,0.25)'},
        marginRight: '16px',
        marginLeft: 'auto',
        width: '660%',
    };

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const searchIconStyle = {
        color: '#75868e',
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

            setSearchResults(data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };
    useEffect(() => {
        if (searchInput) {
            searchUsers();
        } else {
            setSearchResults([]);
        }
    }, [searchInput]);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch(`http://localhost:3000/${username}/finduser`);
                if (!response.ok) {
                    throw new Error('Failed to fetch user data');
                }
                const data = await response.json();
                setUserData(data[0]);

                const fetchFollowersCount = async () => {
                    try {
                        const response = await fetch(`http://localhost:3000/user/${data[0].user_id}/followers`);
                        if (response.ok) {
                            const followers = await response.json();
                            setFollowersCount(followers.length);
                        }
                    } catch (error) {
                        console.error('Error fetching followers count:', error);
                    }
                };

                const fetchFollowingCount = async () => {
                    try {
                        const response = await fetch(`http://localhost:3000/user/${data[0].user_id}/following`);
                        if (response.ok) {
                            const following = await response.json();
                            setFollowingCount(following.length);
                        }
                    } catch (error) {
                        console.error('Error fetching following count:', error);
                    }
                };

                fetchFollowersCount();
                fetchFollowingCount();
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, [username]);


    return (
        <div className="mainPage">
            <div className="toolbar">
                <AppBar position="static" color="default" elevation={0}>
                    <Toolbar sx={{backgroundColor: '#193a3f', color: '#75868e'}}>
                        <img src="/pic/logo.png" alt="Logo" style={{width: '45px', height: '45px'}}/>
                        <Grid container margin="10px">
                            <Grid item style={{marginRight: '3px'}}>
                                <Link to={`/${username}`} style={{textDecoration: 'none'}}>
                                    <Button sx={{color: '#fff'}}>Home</Button>
                                </Link>
                            </Grid>
                            <Grid item style={{marginRight: '5px'}}>
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
                                inputProps={{'aria-label': 'search'}}
                                style={{paddingLeft: '60px', width: '100%'}}
                                value={searchInput}
                                onChange={(e) => setSearchInput(e.target.value)}
                            />

                        </div>

                        <IconButton
                            edge="end"
                            aria-label="account of current user"
                            aria-controls="primary-search-account-menu"
                            aria-haspopup="true"
                            sx={{color: '#fff'}}
                        >
                            <AccountCircle style={{fontSize: '40px'}}/>

                        </IconButton>
                        <IconButton aria-label="display more actions" edge="end" color="inherit">
                            <MoreVertIcon/>
                        </IconButton>
                    </Toolbar>
                </AppBar>
            </div>
            <Box className="mainContainer2" style={{marginTop: '30px'}}>
                <Box className="user" style={{
                    color: '#395761',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    minHeight: '100vh'
                }}>
                    <IconButton
                        edge="end"
                        aria-label="account of current user"
                        aria-controls="primary-search-account-menu"
                        aria-haspopup="true"
                        color="inherit"
                    >
                        {userData && userData.profile_picture ? (
                            <Avatar alt={userData.username} src={userData.profile_picture}
                                    style={{width: '40px', height: '40px'}}/>
                        ) : (
                            <AccountCircle style={{marginTop: '-20px', fontSize: '120px', color: '#75868e'}}/>
                        )}
                    </IconButton>
                    {userData && (
                        <div style={{marginTop: '10px'}}>
                            <Typography variant="h4" style={{
                                fontWeight: 'bold', fontFamily: 'Arial, sans-serif', textTransform: 'capitalize'
                                , color: '#75868e'
                            }}>
                                {`${capitalizeFirstLetter(userData.first_name)} ${capitalizeFirstLetter(userData.last_name)}`}
                            </Typography>
                            <div className='username' style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginTop: '5px'
                            }}>
                                <img src="/pic/logo.png" alt="Logo"
                                     style={{width: '20px', height: '20px', marginRight: '5px'}}/>
                                <Typography style={{fontWeight: 'bold', textTransform: 'capitalize', color: '#75868e'}}>
                                    {userData.username}
                                </Typography>
                            </div>
                            <div style={{
                                marginTop: '5px',
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <Typography style={{marginRight: '10px', color: '#75868e'}}>
                                    {followersCount} Followers
                                </Typography>
                                <Typography style={{color: '#75868e'}}>
                                    {followingCount} Following
                                </Typography>
                            </div>
                        </div>
                    )}
                    <Button sx={{
                        backgroundColor: '#8e3b13',
                        marginTop: '10px',
                        color: '#c6815a',
                        borderRadius: '20px',
                        "&:hover": {
                            backgroundColor: "#c6815a",
                            color: '#8e3b13',
                        },
                    }}>Edit profile</Button>
                    <Stack direction="row" style={{ marginTop: '40px' }}>
                        <Button sx={{

                            color: '#fff',
                            borderRadius: '20px',
                        }}>
                            Created
                        </Button>
                        <Button
                            sx={{
                                borderRadius: '20px',
                                position: 'relative',
                                '&:disabled': {
                                    color: '#fff',
                                },
                                '&:disabled::after': {
                                    content: '""',
                                    position: 'absolute',
                                    left: 0,
                                    right: 0,
                                    bottom: '5px',
                                    borderBottom: '1.5px solid #fff',
                                },
                            }}
                            disabled
                        >
                            Saved
                        </Button>
                    </Stack>
                </Box>

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
                                    <PersonIcon sx={{fontSize: 35, color: '#fff', marginRight: '5px'}}/>
                                    <ListItemText primary={user.username}/>
                                </ListItem>
                            ))}
                        </List>
                    </Paper>
                )}
            </Box>
        </div>
    );
};
export default User;
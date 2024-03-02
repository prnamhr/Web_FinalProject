import {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {
    AppBar,
    Toolbar,
    IconButton,
    InputBase,
    Button,
    Grid,
    Paper,
    List,
    ListItem,
    ListItemText,
    Avatar
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Pin from './Pin';
import './index.css';
import Masonry from 'react-masonry-css';
import PersonIcon from "@mui/icons-material/Person.js";
import DropdownMenu from '../Creation/DropdownMenu.jsx'
const BASE_URL= import.meta.env.VITE_BACKEND_BASE_URL;
const Home = () => {
    const [username,setUsername] =useState();
    const [pins, setPins] = useState([]);
    // Add this to your component's state
    const [searchInput, setSearchInput] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [imageSrc, setImageSrc] = useState('');
    const [userData, setUserData] = useState(null);
    const [dropdownOpen, setDropdownOpen] = useState(false);
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
            const response = await fetch(`${BASE_URL}/${searchInput}/finduser`);
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
        const userAuth= JSON.parse(localStorage.getItem("userAuth"))
        setUsername(userAuth.username)
        console.log(userAuth.username)
        if (searchInput) {
            searchUsers();
        } else {
            setSearchResults([]);
        }
    }, [searchInput]);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch(`${BASE_URL}/${username}/finduser`);
                if (!response.ok) {
                    throw new Error('Failed to fetch user data');
                }
                const data = await response.json();
                setUserData(data[0]);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };
        if (userData && userData.profile_picture) {
            const storageUrl = 'https://firebasestorage.googleapis.com/v0/b/images-a532a.appspot.com/o/';
            const imageUrl = `${storageUrl}${encodeURIComponent(userData.profile_picture)}?alt=media`;
            setImageSrc(imageUrl);
        }

        fetchUserData();
    }, [username, userData, setImageSrc, setUserData]);

    useEffect(() => {
        const fetchPins = async () => {
            try {
                const response = await fetch(`${BASE_URL}/pins`);
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
                    <Toolbar sx={{backgroundColor: '#193a3f', color: '#75868e'}}>
                        <img  src={`https://firebasestorage.googleapis.com/v0/b/images-a532a.appspot.com/o/uploads%2FLogo.png?alt=media&token=776b5284-9d23-4a29-8db5-5acbb6607f56`} alt="Logo" style={{width: '45px', height: '45px'}}/>
                        <Grid container margin="10px">
                            <Grid item style={{marginRight: '3px'}}>
                                <Button
                                    sx={{
                                        backgroundColor: '#8e3b13',
                                        color: '#c6815a',
                                        borderRadius: '20px'
                                    }}
                                >
                                    Home
                                </Button>
                            </Grid>
                            <Grid item style={{marginRight: '10px'}}>
                                <Link to={`/creation`} style={{textDecoration: 'none'}}>
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

                        {imageSrc ? (
                            <Link to={`/user`}>
                                <img
                                    src={imageSrc}
                                    alt="Profile Image"
                                    style={{width: '40px', height: '40px', borderRadius: '50%'}}
                                />
                            </Link>
                        ) : (
                            <Link to={`/user`}>
                                <IconButton
                                    edge="end"
                                    aria-label="account of current user"
                                    aria-controls="primary-search-account-menu"
                                    aria-haspopup="true"
                                    sx={{color: '#fff'}}
                                >
                                    <Avatar
                                        alt="Default Profile Picture"
                                        src={'/path/to/default/avatar.jpg'}
                                        sx={{width: 40, height: 40, color: '#c6815a', backgroundColor: '#8e3b13'}}
                                    />
                                </IconButton>
                            </Link>
                        )}
                        <IconButton
                            aria-label='display more actions'
                            edge='end'
                            color='inherit'
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                        >
                            <MoreVertIcon />
                        </IconButton>
                        <DropdownMenu open={dropdownOpen} onClose={() => setDropdownOpen(false)} />
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
                            <Link to={`/post/${pin.post_id}`} style={{textDecoration: 'none'}}>
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
                                <PersonIcon sx={{fontSize: 35, color: '#8e3b13', marginRight: '5px'}}/>
                                <Link to={`/user/${user.username}`} style={{textDecoration: 'none'}}>
                                    <ListItemText primary={user.username} sx={{color: 'black'}}/>
                                </Link>
                            </ListItem>
                        ))}
                    </List>
                </Paper>
            )}
        </div>
    );
};

export default Home;
import {useEffect, useState} from 'react';
import {
    Button,
    TextField,
    Avatar,
    Box,
    Typography,
    AppBar,
    Toolbar,
    Grid,
    InputBase,
    IconButton,
    Paper, List, ListItem, ListItemText
} from '@mui/material';
import PersonIcon from "@mui/icons-material/Person.js";
import {Link, useParams} from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search.js";
import AccountCircle from "@mui/icons-material/AccountCircle.js";
import MoreVertIcon from "@mui/icons-material/MoreVert.js";


const EditProfile = () => {
    const [name, setName] = useState('');
    const [surname, setsurname] = useState('');
    const [bio, setBio] = useState('');
    const [use, setUsername] = useState('');
    const [profilePicture, setProfilePicture] = useState(null);
    const {username} = useParams();
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
    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle the form submission here
        // For example, you could send the updated profile information to your backend
        console.log('Profile updated:', {name, bio, profilePicture});
        history.push('/'); // Redirect to the home page or profile page after updating
    };

    const handleProfilePictureChange = (e) => {
        if (e.target.files[0]) {
            setProfilePicture(URL.createObjectURL(e.target.files[0]));
        }
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

    return (
        <div className="mainPage" style={{marginBottom: '50px'}}>
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
            <Box sx={{display: 'flex'}}>
                <Box sx={{color: '#fff'}}>
                    <List>
                        <ListItem button component={Link} to={`/${username}/editProfile`}>
                            <div style={{borderBottom: '1.5px solid #fff'}}>
                                <ListItemText primary="Edit Profile"/>
                            </div>
                        </ListItem>
                        <ListItem button component={Link} to={`/${username}/accountManagement`}>
                            <ListItemText primary="Account Management"/>
                        </ListItem>
                    </List>
                </Box>
                <Box
                    sx={{
                        position: 'relative',
                        top: '20px',
                        left: '-50px',
                        maxWidth: 600,
                        margin: 'auto',
                        padding: 2,
                        backgroundColor: 'white',
                        boxShadow: '0 16px 32px rgba(117, 134, 142, 1000)', // Increased shadow with color #75868e
                        borderRadius: '8px',
                    }}
                >

                    <Typography variant="h4" gutterBottom sx={{color: '#8e3b13'}}>
                        Edit Profile
                    </Typography>
                    <Typography gutterBottom sx={{color: '#8e3b13', fontSize: '15px', marginBottom: '10px'}}>
                        Keep your personal details private. Information you add here is visible to anyone who can view
                        your
                        profile.
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <Box sx={{mb: 2}}>
                            <div style={{display: 'flex', alignItems: 'center', gap: '5px'}}>
                                <Avatar
                                    alt="Profile Picture"
                                    src={'/path/to/default/avatar.jpg'}
                                    sx={{width: 70, height: 70, color: '#c6815a', backgroundColor: '#8e3b13'}}
                                />
                                <input
                                    accept="image/*"
                                    style={{display: 'none'}}
                                    id="profile-picture"
                                    type="file"
                                    onChange={handleProfilePictureChange}
                                />
                                <label htmlFor="profile-picture">
                                    <Button variant="contained" component="span"
                                            sx={{
                                                backgroundColor: '#8e3b13',
                                                marginTop: '10px',
                                                color: '#c6815a',
                                                borderRadius: '20px',
                                                "&:hover": {
                                                    backgroundColor: "#c6815a",
                                                    color: '#8e3b13',
                                                },
                                            }}>
                                        change
                                    </Button>
                                </label>
                            </div>
                        </Box>
                        <div style={{display: 'flex', gap: '10px', marginBottom: '20px'}}>
                            <TextField
                                fullWidth
                                label="First Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                margin="normal"
                                sx={{
                                    borderRadius: '10px',
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: '20px',
                                    }
                                }}
                            />
                            <TextField
                                fullWidth
                                label="Surname"
                                value={surname}
                                onChange={(e) => setsurname(e.target.value)}
                                margin="normal"
                                sx={{
                                    borderRadius: '10px',
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: '20px'
                                    }
                                }}
                            />
                        </div>
                        <TextField
                            fullWidth
                            label="Bio"
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                            margin="normal"
                            variant="outlined"
                            multiline
                            rows={4}
                            sx={{
                                borderRadius: '10px',
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: '20px',
                                }
                            }}
                        />
                        <TextField
                            fullWidth
                            label="Username"
                            value={use}
                            onChange={(e) => setUsername(e.target.value)}
                            margin="normal"
                            sx={{
                                borderRadius: '10px',
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: '20px',
                                }
                            }}
                        />


                        <Button variant="contained" component="span"
                                sx={{
                                    backgroundColor: '#8e3b13',
                                    marginTop: '10px',
                                    color: '#c6815a',
                                    borderRadius: '20px',
                                    mt: 3,
                                    "&:hover": {
                                        backgroundColor: "#c6815a",
                                        color: '#8e3b13',
                                    },
                                }}>
                            Save Changes
                        </Button>
                    </form>
                </Box>
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
        </div>
    );
};

export default EditProfile;

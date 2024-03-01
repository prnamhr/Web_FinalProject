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
    Paper, List, ListItem, ListItemText, Alert
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PersonIcon from "@mui/icons-material/Person.js";
import {Link, useParams} from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search.js";
import MoreVertIcon from "@mui/icons-material/MoreVert.js";

const EditProfile = () => {
    const [name, setName] = useState('');
    const [surname, setsurname] = useState('');
    const [bio, setBio] = useState('');
    const [use, setUsername] = useState('');
    const [file, setFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const {username} = useParams();
    const [userData, setUserData] = useState(null);
    const [searchInput, setSearchInput] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isUsernameTaken, setIsUsernameTaken] = useState(false);
    const [isUpdateSuccess, setIsUpdateSuccess] = useState(false);
    const [imageSrc, setImageSrc] = useState('');
    const navigate = useNavigate();

    const searchStyle = {
        position: 'relative',
        borderRadius: '20px',
        backgroundColor: '#fff',
        '&:hover': {backgroundColor: 'rgba(255,255,255,0.25)'},
        marginRight: '16px',
        marginLeft: 'auto',
        width: '660%',
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (use) {
            try {
                const response = await fetch(`http://localhost:3000/${use}/finduser`);
                if (response.ok) {
                    const data = await response.json();
                    if (data.length > 0) {
                        setIsUsernameTaken(true)

                        return;
                    }
                } else {

                    alert('Error checking username availability. Please try again.');
                    return;
                }
            } catch (error) {
                console.error('Error checking username:', error);
                alert('Error checking username availability. Please try again.');
                return;
            }
        }

        const requestBody = {
            first_name: name,
            last_name: surname,
            bio: bio,
            username: use,
        };

        try {
            const response = await fetch(`http://localhost:3000/user/${userData.user_id}/update`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody)
            });
            if (!response.ok) {
                throw new Error('Failed to update profile');
            }
            if(use)
            {
                navigate(`/${use}/editProfile`);

            }

            if (file) {
                const formData = new FormData();
                formData.append('photo', file); // Use the file from the state

                const response2 = await fetch(`http://localhost:3000/user/${userData.user_id}/photo`, {
                    method: 'POST',
                    body: formData, // Send formData with the file
                });

                if (!response2.ok) {
                    throw new Error('Failed to upload profile picture');
                }
            }
            setIsUpdateSuccess(true);
            setTimeout(() => {
                setIsUpdateSuccess(false);
            }, 3000);
            setName('');
            setsurname('');
            setBio('');
            setUsername('');

        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch(`http://localhost:3000/${username}/finduser`);
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

    const handleProfilePictureChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result);
        };
        if (selectedFile) {
            reader.readAsDataURL(selectedFile);

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

                        {imageSrc ? (
                            <Link to={`/${username}/user`}>
                                <img
                                    src={imageSrc}
                                    alt="Profile Image"
                                    style={{ width: '40px', height: '40px', borderRadius: '50%' }}
                                />
                            </Link>
                        ) : (
                            <Link to={`/${username}/user`}>
                                <IconButton
                                    edge="end"
                                    aria-label="account of current user"
                                    aria-controls="primary-search-account-menu"
                                    aria-haspopup="true"
                                    sx={{ color: '#fff' }}
                                >
                                    <Avatar
                                        alt="Default Profile Picture"
                                        src={'/path/to/default/avatar.jpg'}
                                        sx={{ width: 40, height: 40, color: '#c6815a', backgroundColor: '#8e3b13' }}
                                    />
                                </IconButton>
                            </Link>
                        )}
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
                    <form>
                        <Box sx={{mb: 2}}>
                            {isUpdateSuccess && (
                                <Alert severity="success" sx={{marginBottom: '15px'}}>
                                    Profile updated successfully!
                                </Alert>
                            )}
                            <div style={{display: 'flex', alignItems: 'center', gap: '15px'}}>
                                {imagePreview ? (
                                    <img
                                        src={imagePreview}
                                        alt='Image Preview'
                                        style={{ height: '80px', width: '80px', borderRadius: '50%', objectFit: 'cover' }}
                                    />
                                ) : (
                                    <>
                                        {imageSrc ? (
                                            <img
                                                src={imageSrc}
                                                alt='Profile Picture'
                                                style={{ height: '80px', width: '80px', borderRadius: '50%', objectFit: 'cover' }}
                                            />
                                        ) : (
                                            <Avatar
                                                alt="Default Profile Picture"
                                                src={'/path/to/default/avatar.jpg'}
                                                sx={{ width: 70, height: 70, color: '#c6815a', backgroundColor: '#8e3b13' }}
                                            />
                                        )}
                                    </>
                                )}

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
                        {isUsernameTaken && (
                            <Alert severity="error" sx={{marginTop: '15px', marginButtm: '15px'}}>
                                Username is already taken. Please choose another one.
                            </Alert>
                        )}
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
                                onClick={handleSubmit}
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

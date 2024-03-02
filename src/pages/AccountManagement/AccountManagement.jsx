import {useEffect, useState} from 'react';
import {
    Button,
    TextField,
    FormControlLabel,
    FormControl,
    FormLabel,
    RadioGroup,
    Radio,
    Box,
    Typography,
    AppBar,
    Toolbar,
    Grid,
    InputBase,
    IconButton,
    Paper, List, ListItem, ListItemText, Avatar, Alert,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
} from '@mui/material';
import PersonIcon from "@mui/icons-material/Person.js";
import {Link} from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search.js";
import MoreVertIcon from "@mui/icons-material/MoreVert.js";
import DropdownMenu from '../Creation/DropdownMenu.jsx'
const BASE_URL= import.meta.env.VITE_BACKEND_BASE_URL;
const AccountManagement = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [gender, setGender] = useState('');
    const [searchInput, setSearchInput] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [imageSrc, setImageSrc] = useState('');
    const [userData, setUserData] = useState(null);
    const [isUpdateSuccess, setIsUpdateSuccess] = useState(false);
    const [isInvalidEmail, setIsInvalidEmail] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [username,setUsername] =useState();
    const searchStyle = {
        position: 'relative',
        borderRadius: '20px',
        backgroundColor: '#fff',
        '&:hover': {backgroundColor: 'rgba(255,255,255,0.25)'},
        marginRight: '16px',
        marginLeft: 'auto',
        width: '660%',
    };

    const handleDeleteAccount = async () => {
        setDeleteDialogOpen(true);
    };
    const handleCancelDelete = () => {
        setDeleteDialogOpen(false);
    };

    useEffect(() => {
        const userAuth= JSON.parse(localStorage.getItem("userAuth"))
        setUsername(userAuth.username)
        const fetchUserData = async () => {
            try {
                const response = await fetch(`${BASE_URL}/${userAuth.username}/finduser`);
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
    const handleSubmit = async (e) => {
        e.preventDefault();

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setIsInvalidEmail(true);
            return;
        }

        const requestBody = {
            email: email,
            password: password,
            gender: gender,
        };
        try {
            const response = await fetch(`${BASE_URL}/user/${userData.user_id}/account`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody)
            });

            if (!response.ok) {
                throw new Error('Failed to update profile');
            }


            setIsUpdateSuccess(true);
            setIsInvalidEmail(false);
            setTimeout(() => {
                setIsUpdateSuccess(false);
            }, 3000);
            setEmail('');
            setPassword('');


        } catch (error) {
            console.error('Error updating profile:', error);
        }

    };
    const handleConfirmDelete = async () => {
        try {
            // Perform the delete operation

            const response = await fetch(`${BASE_URL}/user/${userData.user_id}/delete`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to delete account');
            }
        } catch (error) {
            console.error('Error deleting account:', error);
        } finally {
            setDeleteDialogOpen(false);
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
                        <img  src={`https://firebasestorage.googleapis.com/v0/b/images-a532a.appspot.com/o/uploads%2FLogo.png?alt=media&token=776b5284-9d23-4a29-8db5-5acbb6607f56`} alt="Logo" style={{width: '45px', height: '45px'}}/>
                        <Grid container margin="10px">
                            <Grid item style={{marginRight: '3px'}}>
                                <Link to={`/inside`} style={{textDecoration: 'none'}}>
                                    <Button sx={{color: '#fff'}}>Home</Button>
                                </Link>
                            </Grid>
                            <Grid item style={{marginRight: '5px'}}>
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
            <Box sx={{display: 'flex'}}>
                <Box sx={{color: '#fff'}}>
                    <List>
                        <ListItem button component={Link} to={`/editProfile`}>
                            <ListItemText primary="Edit Profile"/>
                        </ListItem>
                        <ListItem button component={Link} to={`/accountManagement`}>
                            <div style={{borderBottom: '1.5px solid #fff'}}>
                                <ListItemText primary="Account Management"/>
                            </div>
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
                        Account management
                    </Typography>
                    <Typography gutterBottom sx={{color: '#8e3b13', fontSize: '15px', marginBottom: '20px'}}>
                        Keep your personal details private. Information you add here is visible to anyone who can view
                        your profile.
                    </Typography>
                    <Typography variant="h5" gutterBottom sx={{color: '#8e3b13'}}>
                        Your account
                    </Typography>
                    <form>
                        {isUpdateSuccess && (
                            <Alert severity="success" sx={{marginBottom: '15px'}}>
                                Profile updated successfully!
                            </Alert>
                        )}
                        {isInvalidEmail && (
                            <Alert severity="error" sx={{marginBottom: '15px'}}>
                                Invalid email format. Please enter a valid email address.
                            </Alert>
                        )}
                        <TextField
                            fullWidth
                            label="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            margin="normal"
                            sx={{
                                borderRadius: '10px',
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: '20px'
                                }
                            }}
                        />
                        <Box style={{display: 'flex', alignItems: 'center', gap: '5px'}}>
                            <TextField
                                fullWidth
                                label="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                margin="normal"
                                sx={{
                                    borderRadius: '10px',
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: '20px'
                                    }
                                }}
                            />
                        </Box>
                        <Typography variant="h5" gutterBottom sx={{color: '#8e3b13'}}>
                            Personal information
                        </Typography>

                        <Box style={{display: 'flex', gap: '10px', marginTop: '10px'}}>
                            <FormControl component="fieldset">
                                <FormLabel component="legend" sx={{color: '#8e3b13'}}>
                                    Gender
                                </FormLabel>
                                <RadioGroup
                                    row
                                    aria-label="gender"
                                    name="radio-buttons-group"
                                    value={gender}
                                    onChange={(e) => setGender(e.target.value)}
                                    sx={{color: '#8e3b13'}}
                                >
                                    <FormControlLabel
                                        value="female"
                                        control={<Radio sx={{
                                            color: '#8e3b13',
                                            '&.Mui-checked': {
                                                color: '#c6815a',
                                            },
                                        }}/>}
                                        label={<Typography sx={{color: '#8e3b13'}}>Female</Typography>}
                                    />
                                    <FormControlLabel
                                        value="male"
                                        control={<Radio sx={{
                                            color: '#8e3b13',
                                            '&.Mui-checked': {
                                                color: '#c6815a',
                                            },
                                        }}/>}
                                        label={<Typography sx={{color: '#8e3b13'}}>Male</Typography>}
                                    />
                                    <FormControlLabel
                                        value="other"
                                        control={<Radio sx={{
                                            color: '#8e3b13',
                                            '&.Mui-checked': {
                                                color: '#c6815a',
                                            },
                                        }}/>}
                                        label={<Typography sx={{color: '#8e3b13'}}>Other</Typography>}
                                    />
                                </RadioGroup>
                            </FormControl>
                        </Box>
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
                        <div style={{display: 'flex', alignItems: 'center'}}>
                            <div>
                                <Typography variant="h6" gutterBottom sx={{color: '#8e3b13', marginTop: '30px'}}>
                                    Delete your data and account
                                </Typography>
                                <Typography gutterBottom sx={{color: '#8e3b13'}}>
                                    Permanently delete your data and everything associated with your account
                                </Typography>
                            </div>
                            <label htmlFor="profile-picture">
                                <Button variant="contained" component="span"
                                        onClick={handleDeleteAccount}
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
                                    Delete Account
                                </Button>
                            </label>
                        </div>
                    </form>
                </Box>
            </Box>
            <Dialog
                open={deleteDialogOpen}
                onClose={handleCancelDelete}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Confirm Deletion</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to delete your account? This action cannot be undone.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancelDelete} color="primary">
                        Cancel
                    </Button>
                    <Link to={`/`} style={{textDecoration: 'none'}}>
                        <Button onClick={handleConfirmDelete} color="primary" autoFocus>
                            Confirm
                        </Button>
                    </Link>
                </DialogActions>
            </Dialog>
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

export default AccountManagement;
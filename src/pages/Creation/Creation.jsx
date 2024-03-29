import {Link} from 'react-router-dom';
import {
    Input,
    Box,
    Button,
    TextField,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
    Paper,
    Typography, Alert, List, ListItem, ListItemText
} from '@mui/material';
import {
    AppBar,
    Toolbar,
    IconButton,
    InputBase,
    Grid,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import {useState, useEffect} from 'react';
import PersonIcon from "@mui/icons-material/Person.js";
import DropdownMenu from './DropdownMenu.jsx'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
const BASE_URL= import.meta.env.VITE_BACKEND_BASE_URL;
const Creation = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [board, setBoard] = useState('');
    const boardOptions = ['Board 1', 'Board 2', 'Board 3'];
    const [file, setFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const [openAlert, setOpenAlert] = useState(false);
    const [searchInput, setSearchInput] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [imageSrc, setImageSrc] = useState('');
    const [userData, setUserData] = useState(null);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [username,setUsername] =useState();
    const fetchUserId = async () => {
        try {
            const response = await fetch(`${BASE_URL}/postCreation/getUserId?username=${username}`);
            if (response.status === 200) {
                const data = await response.json();
                return data.user_id;
            } else {
                console.error(`Server responded with status: ${response.status}`);
                throw new Error(`Failed to fetch user ID, status code: ${response.status}`);
            }
        } catch (error) {
            console.error('Error fetching user ID:', error.message);
        }
    };
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
        if (searchInput) {
            searchUsers();
        } else {
            setSearchResults([]);
        }
    }, [searchInput]);

    const handleFileChange = (e) => {
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userId = await fetchUserId();
        try {
            const formData = new FormData();
            formData.append('user_id', userId);
            formData.append('photo', file);
            formData.append('title', title);
            formData.append('description', description);
            formData.append('board_id', board);

            const response = await fetch(`${BASE_URL}/postCreation`, {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Failed to create post');
            }

            const data = await response.json();
            setSuccessMessage('Post created successfully!');
            setOpenAlert(true);
            setTitle('');
            setDescription('');
            setBoard('');
            setFile(null);
            setImagePreview(null);
        } catch (error) {
            console.error(error);
        }
    };

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
    const handleAlertClose = () => {
        setOpenAlert(false);
    };

    const mainStyle = {
        flex: 1,
        height: 'auto',
        marginTop: '15px',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-filled, 300px)',
    };

    return (
        <div className='mainPage'>
            <div className='toolbar'>
                <AppBar position='static' color='default' elevation={0}>
                    <Toolbar sx={{backgroundColor: '#193a3f', color: '#75868e'}}>
                        <img  src={`https://firebasestorage.googleapis.com/v0/b/images-a532a.appspot.com/o/uploads%2FLogo.png?alt=media&token=776b5284-9d23-4a29-8db5-5acbb6607f56`} alt='Logo' style={{width: '30px', height: '30px'}}/>
                        <Grid container margin='10px'>
                            <Grid item style={{marginRight: '3px'}}>
                                <Link to={`/inside`} style={{textDecoration: 'none'}}>
                                    <Button sx={{color: '#fff'}}>Home</Button>
                                </Link>
                            </Grid>
                            <Grid item style={{marginRight: '10px'}}>
                                <Button sx={{
                                    backgroundColor: '#8e3b13',
                                    color: '#c6815a',
                                    borderRadius: '20px'
                                }}>Create</Button>
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
                                    <AccountCircleIcon
                                        sx={{width: 40, height: 40, color: '#fff'}}
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
            <div className='upload' style={mainStyle}>
                <Box display='flex' justifyContent='center' alignItems='center' p={2}>
                    <Paper elevation={3} sx={{maxWidth: 600, width: '100%', p: 2}}>
                        <Box component='form' sx={{display: 'grid', gap: 2}}>
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    border: '1px dashed grey',
                                    borderRadius: 2,
                                    padding: 2,
                                }}
                            >
                                <label htmlFor='upload-file'>
                                    <Input
                                        type='file'
                                        id='upload-file'
                                        name='photo'
                                        onChange={handleFileChange}
                                        inputProps={{style: {display: 'none'}}}
                                    />
                                    {imagePreview ? (
                                        <img
                                            src={imagePreview}
                                            alt='Image Preview'
                                            style={{width: '100%', maxHeight: '200px', objectFit: 'cover'}}
                                        />
                                    ) : (
                                        <>
                                            <CloudUploadIcon sx={{fontSize: 50}}/>
                                            <Button
                                                sx={{
                                                    backgroundColor: '#8e3b13',
                                                    color: '#fff',
                                                    '&:hover': {
                                                        backgroundColor: '#c6815a'
                                                    }
                                                }}
                                                variant='contained'
                                                component='span'
                                            >
                                                Choose a file or drag and drop it here
                                            </Button>
                                        </>
                                    )}
                                </label>
                                <Typography variant='caption' sx={{mt: 1}}>
                                    We recommend using high-quality jpg files less than 20MB or .mp4 files less than
                                    200MB.
                                </Typography>
                            </Box>
                            <TextField label='Title' variant='outlined' value={title}
                                       onChange={(e) => setTitle(e.target.value)}/>
                            <TextField
                                label='Description'
                                variant='outlined'
                                multiline
                                rows={4}
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                            <FormControl>
                                <InputLabel>Board</InputLabel>
                                <Select value={board} label='Board' onChange={(e) => setBoard(e.target.value)}>
                                    {boardOptions.map((option) => (
                                        <MenuItem key={option} value={option}>
                                            {option}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                            <Button
                                sx={{
                                    backgroundColor: '#8e3b13',
                                    color: '#fff',
                                    '&:hover': {
                                        backgroundColor: '#c6815a'
                                    }
                                }}
                                onClick={handleSubmit}
                            >
                                Create
                            </Button>


                            {openAlert && <Alert
                                severity="success"
                                open={openAlert}
                                onClose={handleAlertClose}
                                sx={{marginTop: 2}}
                            >
                                {successMessage}
                            </Alert>}
                        </Box>
                    </Paper>
                </Box>
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

export default Creation;
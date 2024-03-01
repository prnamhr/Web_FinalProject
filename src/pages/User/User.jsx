import {useState, useEffect} from 'react';
import {Link, useParams} from 'react-router-dom';
import {
    AppBar, Toolbar, IconButton, InputBase, Button, Grid, List, ListItem, ListItemText, Paper
    , Box, Typography,Stack
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import './index.css';
import PersonIcon from "@mui/icons-material/Person.js";
import { Dialog, DialogTitle, DialogContent } from '@mui/material';
import Masonry from "react-masonry-css";
import Pin from './Pin';
const User = () => {
    const {username} = useParams();
    const [userData, setUserData] = useState(null);
    const [searchInput, setSearchInput] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [followersCount, setFollowersCount] = useState(0);
    const [followingCount, setFollowingCount] = useState(0);
    const [imageSrc, setImageSrc] = useState('');
    const [openFollowersDialog, setOpenFollowersDialog] = useState(false);
    const [openFollowingDialog, setOpenFollowingDialog] = useState(false);
    const [followerList, setFollowerList] = useState([]);
    const [followingList, setFollowingList] = useState([]);
    const [followingStatus, setFollowingStatus] = useState([]);
    const [postList, setPostList] = useState([]);

    const searchStyle = {
        position: 'relative',
        borderRadius: '20px',
        backgroundColor: '#fff',
        '&:hover': {backgroundColor: 'rgba(255,255,255,0.25)'},
        marginRight: '16px',
        marginLeft: 'auto',
        width: '660%',
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
                if(data[0].profile_picture){
                    const storageUrl = 'https://firebasestorage.googleapis.com/v0/b/images-a532a.appspot.com/o/';
                    const imageUrl = `${storageUrl}${encodeURIComponent(data[0].profile_picture)}?alt=media`;
                    setImageSrc(imageUrl);}

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

                const fetchFollowingStatus = async () => {
                    try {
                        const response = await fetch(`http://localhost:3000/user/${data[0].user_id}/following`);
                        if (response.ok) {
                            const following = await response.json();
                            const statusMap = {};
                            following.forEach((user) => {
                                statusMap[user.user_id] = true;
                            });
                            setFollowingStatus(statusMap);
                        }
                    } catch (error) {
                        console.error('Error fetching following status:', error);
                    }
                };
                const fetchPosts = async () => {
                    try {
                        const response = await fetch(`http://localhost:3000/post/${data[0].user_id}/saveList`);
                        if (response.ok) {
                            const saved = await response.json();
                            console.log(saved)
                            setPostList(saved);
                        }
                    } catch (error) {
                        console.error('Error fetching following status:', error);
                    }
                };

                fetchFollowersCount();
                fetchFollowingCount();
                fetchFollowingStatus();
                fetchPosts();
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, [username]);
    const handleFollow = async (followerId) => {

        const requestBody = {
            user_id:followerId
        };
        try {

            const response = await fetch(`http://localhost:3000/post/${username}/follow`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody)
            });

            if (!response.ok) {
                throw new Error('Failed to update follow status');
            }
            const isFollowing = followingStatus[followerId];

            setFollowingCount((prevCount) => (!isFollowing ? prevCount + 1 : prevCount - 1));

            setFollowingStatus((prevStatus) => {
                const newStatus = { ...prevStatus };
                newStatus[followerId] = !isFollowing;
                return newStatus;
            });
        } catch (error) {
            console.error('Error updating follow status:', error);
        }
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
    const breakpointColumnsObj = {
        default: 6, // Number of columns by default
        1100: 5, // Number of columns on screens between 1100px and 700px
        700: 4, // Number of columns on screens between 700px and 500px
        500: 3, // Number of columns on screens below 500px
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




    const handleFollowersClick = async () => {
        try {
            const response = await fetch(`http://localhost:3000/user/${userData.user_id}/followers`);
            if (response.ok) {
                const followers = await response.json();
                if (followers.length > 0) {
                    setFollowerList(followers);
                    setOpenFollowersDialog(true);
                }
            }
        } catch (error) {
            console.error('Error fetching followers:', error);
        }
    };

    const handleFollowingClick = async () => {
        try {
            const response = await fetch(`http://localhost:3000/user/${userData.user_id}/following`);
            if (response.ok) {
                const following = await response.json();
                if (following.length > 0) {
                    setFollowingList(following);
                    setOpenFollowingDialog(true);
                }
            }
        } catch (error) {
            console.error('Error fetching following:', error);
        }
    };


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
                                    <AccountCircle style={{fontSize: '40px'}}/>
                                </IconButton>
                            </Link>
                        )}

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
                    <div>
                        {imageSrc ? (
                            <Link to={`/${username}/user`}>
                                <img
                                    src={imageSrc}
                                    alt="Profile Image"
                                    style={{width: '140px', height: '140px', borderRadius: '50%'}}
                                />
                            </Link>
                        ) : (
                            <Link to={`/${username}/user`}>
                                <div style={{color: '#fff'}}>
                                    <IconButton
                                        edge="end"
                                        aria-label="account of current user"
                                        aria-controls="primary-search-account-menu"
                                        aria-haspopup="true"
                                        sx={{color: '#fff'}}
                                    >
                                        <AccountCircle style={{fontSize: '140px'}}/>
                                    </IconButton>
                                </div>
                            </Link>
                        )}
                    </div>
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
                                <Typography
                                    onClick={handleFollowersClick}
                                    style={{
                                        marginRight: '10px',
                                        color: '#75868e',
                                        cursor: 'pointer'
                                    }}
                                >
                                    {followersCount} Followers
                                </Typography>
                                <Typography
                                    onClick={handleFollowingClick}
                                    style={{color: '#75868e', cursor: 'pointer'}}
                                >
                                    {followingCount} Following
                                </Typography>
                            </div>
                        </div>
                    )}
                    <Link to={`/${username}/editProfile`}>
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
                    </Link>
                    <Stack direction="row" style={{marginTop: '40px'}}>
                        <Link to={`/${username}/_created`}>
                            <Button sx={{

                                color: '#fff',
                                borderRadius: '20px',
                            }}>
                                Created
                            </Button>
                        </Link>
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
                <div className="mainContainer2" style={{marginTop: '-290px'}}>
                    {postList && postList.length > 0 ? (
                        <Masonry
                            breakpointCols={breakpointColumnsObj}
                            className="my-masonry-grid"
                            columnClassName="my-masonry-grid_column"
                        >
                            {postList.map((pin) => (
                                <div key={pin.post_id}>
                                    <Link to={`/${username}/post/${pin.post_id}`} style={{textDecoration: 'none'}}>
                                        <Pin post={pin}/>
                                    </Link>
                                </div>
                            ))}
                        </Masonry>
                    ) : (
                        <div style={{textAlign: 'center', marginTop: '20px'}}>
                            <Typography style={{color: '#75868e'}}>Nothing to show...yet! Pins you saved will live
                                here.</Typography>
                        </div>
                    )}
                </div>
                {followerList &&
                    <Dialog open={openFollowersDialog} onClose={() => setOpenFollowersDialog(false)} fullWidth
                            maxWidth="sm">
                        <DialogTitle
                            style={{borderBottom: '1px solid #ccc', paddingBottom: '10px', textAlign: 'center'}}>
                            {followersCount} Followers
                        </DialogTitle>
                        <DialogContent>
                            <List>
                                {followerList.map((user) => (
                                    <ListItem key={user.user_id}
                                              style={{borderBottom: '1px solid #eee', padding: '10px 0'}}>
                                        <div style={{display: 'flex', alignItems: 'center'}}>
                                            {user.profile_picture ? (
                                                <img
                                                    src={`${'https://firebasestorage.googleapis.com/v0/b/images-a532a.appspot.com/o/'}${encodeURIComponent(user.profile_picture)}?alt=media`}
                                                    alt={`${user.username}'s Profile`}
                                                    style={{
                                                        width: '50px',
                                                        height: '50px',
                                                        borderRadius: '50%',
                                                        marginRight: '20px',
                                                    }}
                                                />
                                            ) : (
                                                <PersonIcon sx={{fontSize: 50, color: '#c6815a', marginRight: '20px'}}/>
                                            )}
                                            <Typography variant="h5"
                                                        style={{fontWeight: 'bold'}}>{user.username}</Typography>
                                        </div>
                                        <Button
                                            variant="contained"
                                            style={{
                                                borderRadius: '30px',
                                                backgroundColor: followingStatus[user.user_id] ? '#c6815a' : '#8e3b13',
                                                color: '#fff',
                                                textTransform: 'capitalize',
                                            }}
                                            onClick={() => handleFollow(user.user_id)}
                                        >
                                            {followingStatus[user.user_id] ? 'Following' : 'Follow'}
                                        </Button>
                                    </ListItem>
                                ))}
                            </List>
                        </DialogContent>
                    </Dialog>

                }
                <Dialog open={openFollowingDialog} onClose={() => setOpenFollowingDialog(false)} fullWidth
                        maxWidth="sm">
                    <DialogTitle style={{borderBottom: '1px solid #ccc', paddingBottom: '10px', textAlign: 'center'}}>
                        {followingCount} Following</DialogTitle>
                    <DialogContent>
                        <List>
                            {followingList.map((user) => (
                                <ListItem key={user.user_id}
                                          style={{borderBottom: '1px solid #eee', padding: '10px 0'}}>
                                    <div style={{display: 'flex', alignItems: 'center'}}>
                                        {user.profile_picture ? (
                                            <img
                                                src={`${'https://firebasestorage.googleapis.com/v0/b/images-a532a.appspot.com/o/'}${encodeURIComponent(user.profile_picture)}?alt=media`}
                                                alt={`${user.username}'s Profile`}
                                                style={{
                                                    width: '50px',
                                                    height: '50px',
                                                    borderRadius: '50%',
                                                    marginRight: '20px',
                                                }}
                                            />
                                        ) : (
                                            <PersonIcon sx={{fontSize: 50, color: '#c6815a', marginRight: '20px'}}/>
                                        )}
                                        <Typography variant="h5"
                                                    style={{fontWeight: 'bold'}}>{user.username}</Typography>
                                    </div>
                                    <Button
                                        variant="contained"
                                        style={{
                                            borderRadius: '30px',
                                            backgroundColor: followingStatus[user.user_id] ? '#c6815a' : '#8e3b13',
                                            color: '#fff',
                                            textTransform: 'capitalize',
                                        }}
                                        onClick={() => handleFollow(user.user_id)}
                                    >
                                        {followingStatus[user.user_id] ? 'Following' : 'Follow'}
                                    </Button>
                                </ListItem>
                            ))}
                        </List>
                    </DialogContent>
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
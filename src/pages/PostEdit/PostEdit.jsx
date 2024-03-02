import {useState, useEffect} from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    Card,
    CardContent,
    IconButton,
    InputBase,
    Button,
    Grid,
    CardMedia,
    Paper,
    List,
    ListItem,
    ListItemText,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions
} from '@mui/material';
import Box from '@mui/material/Box';
import SearchIcon from '@mui/icons-material/Search';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {Link, useParams} from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
import SendIcon from '@mui/icons-material/Send';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import {TextField} from '@mui/material';
import DropdownMenu from '../Creation/DropdownMenu.jsx'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
const BASE_URL= import.meta.env.VITE_BACKEND_BASE_URL;
const PostEdit = () => {
    const { postId} = useParams();
    const [username,setUsername] =useState();
    const [postData, setPostData] = useState(null);
    const [imageSrc, setImageSrc] = useState('');
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [isLiked, setIsLiked] = useState(false);
    const [likeLen, setLikeLen] = useState(0);
    const [searchInput, setSearchInput] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [imageSrc2, setImageSrc2] = useState('');
    const [userImageSrc, setUserImageSrc2] = useState('');
    const [userData, setUserData] = useState(null);
    const [isEditMode, setIsEditMode] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const handleDeleteAccount = async () => {
        setDeleteDialogOpen(true);
    };
    const handleCancelDelete = () => {
        setDeleteDialogOpen(false);
    };
    const handleConfirmDelete = async () => {
        try {

            const response = await fetch(`${BASE_URL}/post/${postId}/delete`, {
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
    const handleSubmit = async (e) => {
        e.preventDefault();

        const requestBody = {
            title: title,
            description: description
        };

        try {
            const response = await fetch(`${BASE_URL}/post/${postId}/update`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody)
            });
            if (!response.ok) {
                throw new Error('Failed to update profile');
            }

            setTimeout(() => {
                setIsEditMode(false);
            }, 1000);
            setTitle('');
            setDescription('');
        } catch (error) {
            console.error('Error updating profile:', error);
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
            setImageSrc2(imageUrl);
        }

        fetchUserData();
    }, [username, userData, setImageSrc2, setUserData]);
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
    useEffect(() => {
        const fetchPostData = async () => {
            try {
                const response = await fetch(`${BASE_URL}/post/${postId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch post data');
                }
                const data = await response.json();
                setPostData(data);
                const storageUrl = 'https://firebasestorage.googleapis.com/v0/b/images-a532a.appspot.com/o/';
                const imageUrl = `${storageUrl}${encodeURIComponent(data.photo_content)}?alt=media`;
                setImageSrc(imageUrl);
                if (data.profile_picture) {
                    const storageUrl2 = 'https://firebasestorage.googleapis.com/v0/b/images-a532a.appspot.com/o/';
                    const imageUrl2 = `${storageUrl2}${encodeURIComponent(data.profile_picture)}?alt=media`;
                    setUserImageSrc2(imageUrl2);
                }

                const commentsResponse = await fetch(`${BASE_URL}/post/${postId}/comments`);
                if (!commentsResponse.ok) {
                    throw new Error('Failed to fetch comments');
                }
                const addedComment = await commentsResponse.json();
                setComments(addedComment);

                const response3 = await fetch(`${BASE_URL}/post/${postId}/likes`);
                const data2 = await response3.json();
                setLikeLen(data2.length);
            } catch (error) {
                console.error('Error fetching post data:', error);
            }
        };

        fetchPostData();
    }, [postId]);

    useEffect(() => {
        const userAuth= JSON.parse(localStorage.getItem("userAuth"))
        setUsername(userAuth.username)
        const fetchLikeStatus = async () => {
            try {
                const response = await fetch(`${BASE_URL}/post/${userAuth.username}/${postId}/like`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch like status');
                }

                const likeStatus = await response.json();
                setLikeLen((prevLikeLen) => (likeStatus.isLiked ? prevLikeLen + 1 : prevLikeLen));
                setIsLiked(likeStatus.isLiked);
            } catch (error) {
                console.error('Error fetching like status:', error);
            }
        };

        fetchLikeStatus();
    }, [postId, username]);


    const handleLike = async () => {
        try {
            const response = await fetch(`${BASE_URL}/post/${username}/${postId}/like`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to update like status');
            }

            const likeStatus = await response.json();
            setLikeLen((prevLikeLen) => (likeStatus.isLiked ? prevLikeLen + 1 : prevLikeLen - 1));
            setIsLiked(likeStatus.isLiked);
        } catch (error) {
            console.error('Error updating like status:', error);
        }
    };

    const handleCommentSubmit = async () => {
        try {
            if (!newComment) {
                return;
            }

            const response = await fetch(`${BASE_URL}/post/${username}/${postId}/comment`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    comment_text: newComment,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to submit comment');
            }

            const updatedCommentsResponse = await fetch(`${BASE_URL}/post/${postId}/comments`);
            if (!updatedCommentsResponse.ok) {
                throw new Error('Failed to fetch updated comments');
            }

            const updatedComments = await updatedCommentsResponse.json();

            setComments(updatedComments);
            setNewComment('');
        } catch (error) {
            console.error('Error submitting comment:', error);
        }
    };

    return (
        <div>
            {isEditMode && (
                <>
                    {/* Full-screen overlay */}
                    <div
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent gray
                            zIndex: 999, // Lower than the edit box but higher than other content
                        }}
                    />
                    <Paper
                        sx={{
                            position: 'absolute',
                            top: '0',
                            right: '0',
                            height: '100%',
                            padding: '20px',
                            borderRadius: '10px',
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                            overflowY: 'auto', // Add scroll if content overflows
                            zIndex: 1000, // Ensure it's in front of other elements

                        }}
                    >
                        <Typography variant="h4" gutterBottom sx={{color: '#8e3b13'}}>
                            Edit Post
                        </Typography>

                        <form>
                            <TextField
                                fullWidth
                                label="Title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
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
                                label="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                margin="normal"
                                sx={{
                                    borderRadius: '10px',
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: '20px'
                                    }
                                }}
                            />
                            <div>
                                <Button variant="contained" component="span"
                                        onClick={handleSubmit}
                                        sx={{
                                            backgroundColor: '#8e3b13',
                                            marginTop: '10px',
                                            marginRight: '2px',
                                            color: '#c6815a',
                                            borderRadius: '20px',
                                            mt: 3,
                                            "&:hover": {
                                                backgroundColor: "#c6815a",
                                                color: '#8e3b13',
                                            },
                                        }}>
                                    Save
                                </Button>
                                <Button variant="contained" component="span"
                                        onClick={handleDeleteAccount}
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
                                    Delete
                                </Button>
                            </div>
                        </form>
                    </Paper>
                </>
            )}
            <div className="mainPage">
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
                            {imageSrc2 ? (
                                <Link to={`/user`}>
                                    <img
                                        src={imageSrc2}
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
                                            sx={{ width: 40, height: 40, color: '#c6815a', backgroundColor: '#8e3b13' }}
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
            </div>
            <Link to={`/_created`} style={{textDecoration: 'none'}}>
                <IconButton color="inherit" aria-label="for you"
                            style={{display: 'flex', alignItems: 'center', marginTop: '30px', marginLeft: '10px'}}>
                    <ArrowBackIcon sx={{fontSize: '25px', color: '#fff'}}/>
                    <Typography style={{fontSize: '20px', marginLeft: '5px', fontFamily: 'inherit', color: '#fff'}}>For
                        you</Typography>
                </IconButton>
            </Link>
            <Card className="box" style={{
                margin: '20px auto',
                marginTop: '-45px',
                borderRadius: '30px',
                maxWidth: '800px',
                width: '100%',
                display: 'flex',
                alignItems: 'stretch',
                minHeight: '500px',
                position: 'relative',
            }}>
                <div className="photo" style={{flex: '1'}}>
                    <CardMedia
                        component="img"
                        image={imageSrc}
                        style={{width: '100%', height: '100%'}}
                    />
                </div>
                <Button
                    variant="contained"
                    style={{
                        borderRadius: '120px',
                        backgroundColor: '#8e3b13',
                        position: 'absolute',
                        top: '20px',
                        right: '20px',
                    }}
                >
                    Save
                </Button>
                <div style={{flex: '1', marginTop: '80px'}}>
                    <CardContent>

                        {postData && postData.title && (
                            <Typography variant="h4" style={{marginBottom: '10px'}}>{postData.title}</Typography>
                        )}
                        {postData && postData.description && (
                            <Typography variant="body1">{postData.description}</Typography>
                        )}

                        <div style={{
                            display: 'flex',
                            marginTop: '30px',
                            flexDirection: 'row',
                            justifyContent: 'space-around'
                        }}>
                            <div style={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                marginLeft: '-60px'
                            }}>
                                {userImageSrc ? (
                                    <img
                                        src={userImageSrc}
                                        alt="User Profile"
                                        style={{
                                            width: '40px',
                                            height: '40px',
                                            borderRadius: '50%',
                                            marginRight: '10px'
                                        }}
                                    />
                                ) : (
                                    <PersonIcon sx={{fontSize: 40, color: '#8e3b13'}}/>
                                )}
                                {postData && postData.username && (
                                    <Typography variant="body1">{postData.username}</Typography>
                                )}
                            </div>
                            <Button
                                variant="contained"
                                onClick={() => setIsEditMode(true)}
                                style={{
                                    borderRadius: '120px',
                                    backgroundColor: '#8e3b13',
                                }}

                            >
                                Edit Pin
                            </Button>

                        </div>
                        <div style={{marginTop: '30px '}}>
                            <div style={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center'
                            }}>
                                <Typography variant="h6">Comments</Typography>

                            </div>
                            <Box p={2} sx={{maxHeight: '100px', overflowY: 'auto'}}>
                                {comments.map((comment) => (
                                    <Box key={comment.comment_id} mb={1} style={{wordWrap: 'break-word'}}>
                                        <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                                            {comment.profile_picture ? (
                                                <img
                                                    src={`${'https://firebasestorage.googleapis.com/v0/b/images-a532a.appspot.com/o/'}${encodeURIComponent(comment.profile_picture)}?alt=media`}
                                                    alt={`${comment.username}'s Profile`}
                                                    style={{
                                                        width: '30px',
                                                        height: '30px',
                                                        borderRadius: '50%',
                                                        marginRight: '10px'
                                                    }}
                                                />
                                            ) : (
                                                <PersonIcon sx={{fontSize: 30, color: '#c6815a', marginRight: '5px'}}/>
                                            )}
                                            <div style={{display: 'flex', flexDirection: 'column', marginRight: '5px'}}>
                                                <Typography variant="h7">{comment.username}</Typography>
                                                <Typography variant="body2">{comment.comment_text}</Typography>

                                            </div>
                                        </div>
                                    </Box>
                                ))}
                            </Box>

                        </div>
                    </CardContent>

                    <Card style={{

                        padding: '10px',
                        paddingRight: '12%',
                        boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .3)',
                        position: 'absolute',
                        bottom: '0',
                    }}>
                        <div style={{display: 'flex', justifyContent: 'space-between'}}>
                            <Typography variant="h6"
                                        style={{marginLeft: '10px'}}>{comments.length} comments</Typography>
                            <div style={{display: 'flex', flexDirection: 'row'}}>
                                <Typography variant="h6"
                                            style={{marginLeft: '10px'}}>{likeLen}</Typography>
                                <IconButton onClick={handleLike} style={{color: 'red'}}>
                                    {isLiked ? <FavoriteIcon/> : <FavoriteBorderIcon/>}
                                </IconButton>
                            </div>
                        </div>
                        <div style={{display: 'flex'}}>
                            {imageSrc2 ? (
                                <Link to={`/user`}>
                                    <img
                                        src={imageSrc2}
                                        alt="Profile Image"
                                        style={{width: '40px', height: '40px', borderRadius: '50%'}}
                                    />
                                </Link>
                            ) : (
                                <PersonIcon sx={{fontSize: 40, color: '#8e3b13', marginRight: '5px'}}/>
                            )}

                            <InputBase
                                placeholder="Add a comment"
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                fullWidth
                                style={{margin: '0 10px'}}
                            />
                            <IconButton onClick={handleCommentSubmit} style={{color: "#8e3b13", marginRight: '-25%'}}>
                                <SendIcon style={{
                                    borderRadius: '50%',
                                }}/>

                            </IconButton>
                        </div>
                    </Card>

                </div>


            </Card>
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
                    <Link to={`/_created`} style={{textDecoration: 'none'}}>
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

export default PostEdit;
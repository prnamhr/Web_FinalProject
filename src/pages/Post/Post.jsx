import {useState, useEffect} from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    Card,
    CardContent,
    IconButton,
    InputBase,
    Badge,
    Button,
    Grid, CardMedia
} from '@mui/material';
import Box from '@mui/material/Box';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {Link, useParams} from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
import SendIcon from '@mui/icons-material/Send';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import './index.css'

const Post = () => {
    const {postId, username} = useParams();
    const [postData, setPostData] = useState(null);
    const [imageSrc, setImageSrc] = useState('');
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [isLiked, setIsLiked] = useState(false);
    const [likeLen,setLikeLen]=useState(0);
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
    useEffect(() => {
        const fetchPostData = async () => {
            try {
                const response = await fetch(`http://localhost:3000/post/${postId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch post data');
                }
                const data = await response.json();
                setPostData(data);
                const storageUrl = 'https://firebasestorage.googleapis.com/v0/b/images-a532a.appspot.com/o/';
                const imageUrl = `${storageUrl}${encodeURIComponent(data.photo_content)}?alt=media`;
                setImageSrc(imageUrl);

                const commentsResponse = await fetch(`http://localhost:3000/post/${postId}/comments`);
                if (!commentsResponse.ok) {
                    throw new Error('Failed to fetch comments');
                }
                const addedComment = await commentsResponse.json();
                setComments(addedComment);

                const response3 = await fetch(`http://localhost:3000/post/${postId}/likes`);
                const data2 = await response3.json();
                setLikeLen(data2.length);
            } catch (error) {
                console.error('Error fetching post data:', error);
            }
        };

        fetchPostData();
    }, [postId]);

    useEffect(() => {
        const fetchLikeStatus = async () => {
            try {
                const response = await fetch(`http://localhost:3000/post/${username}/${postId}/like`, {
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
            const response = await fetch(`http://localhost:3000/post/${username}/${postId}/like`, {
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

            const response = await fetch(`http://localhost:3000/post/${username}/${postId}/comment`, {
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

            const updatedCommentsResponse = await fetch(`http://localhost:3000/post/${postId}/comments`);
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
            <div className="mainPage">
                <div className="toolbar">
                    <AppBar position="static" color="default" elevation={0}>
                        <Toolbar sx={{backgroundColor: '#64806a', color: '#fff'}}>
                            <img src="/pic/logo.png" alt="Logo" style={{width: '45px', height: '45px'}}/>
                            <Grid container margin="10px">
                                <Grid item style={{marginRight: '3px'}}>
                                    <Link to={`/${username}`} style={{textDecoration: 'none'}}>
                                        <Button sx={{color: '#fff'}}>Home</Button>
                                    </Link>
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
                                    inputProps={{'aria-label': 'search'}}
                                    style={{paddingLeft: '60px', width: '100%'}}
                                />
                            </div>

                            <IconButton aria-label="show notifications" color="ierit">
                                <Badge badgeContent={4} sx={{colo: '#ba5d17'}}>
                                    <NotificationsIcon/>
                                </Badge>
                            </IconButton>
                            <IconButton
                                edge="end"
                                aria-label="account of current user"
                                aria-controls="primary-search-account-menu"
                                aria-haspopup="true"
                                color="inherit"
                            >
                                <AccountCircle/>
                            </IconButton>
                            <IconButton aria-label="display more actions" edge="end" color="inherit">
                                <MoreVertIcon/>
                            </IconButton>
                        </Toolbar>
                    </AppBar>
                </div>
            </div>
            <Link to={`/${username}`} style={{textDecoration: 'none'}}>
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
                        backgroundColor: '#e27d60',
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
                                <PersonIcon sx={{fontSize: 40, color: '#e27d60', marginRight: '5px'}}/>
                                {postData && postData.username && (
                                    <Typography variant="body1">{postData.username}</Typography>
                                )}
                            </div>
                            <Button
                                variant="contained"
                                style={{
                                    borderRadius: '120px',
                                    backgroundColor: '#e27d60',
                                }}
                            >
                                Follow
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
                                            <PersonIcon sx={{fontSize: 30, color: '#e27d60', marginRight: '5px'}}/>
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
                            <div style={{display:'flex',flexDirection:'row'}}>
                                <Typography variant="h6"
                                            style={{marginLeft: '10px'}}>{likeLen}</Typography>
                                <IconButton onClick={handleLike} style={{color: 'red', marginRight: '-24%'}}>
                                    {isLiked ? <FavoriteIcon/> : <FavoriteBorderIcon/>}
                                </IconButton>
                            </div>
                        </div>
                        <div style={{display: 'flex'}}>
                            <PersonIcon sx={{fontSize: 40, color: '#e27d60', marginRight: '5px'}}/>
                            <InputBase
                                placeholder="Add a comment"
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                fullWidth
                                style={{margin: '0 10px'}}
                            />
                            <IconButton onClick={handleCommentSubmit} style={{color: "#e27d60", marginRight: '-25%'}}>
                                <SendIcon style={{
                                    borderRadius: '50%',
                                }}/>

                            </IconButton>
                        </div>
                    </Card>

                </div>


            </Card>

        </div>
    );
};

export default Post;

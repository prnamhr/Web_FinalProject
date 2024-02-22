import { useState, useEffect } from 'react';
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
    Grid, CardMedia,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Link, useParams } from 'react-router-dom';

import './index.css'
const Post = () => {
    const { postId, username } = useParams();
    const [postData, setPostData] = useState(null);
    const [imageSrc, setImageSrc] = useState('');
    const searchStyle = {
        position: 'relative',
        borderRadius: '20px',
        backgroundColor: '#fff',
        '&:hover': { backgroundColor: 'rgba(255,255,255,0.25)' },
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
            } catch (error) {
                console.error('Error fetching post data:', error);
            }
        };

        fetchPostData();
    }, [postId]);

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
            <Card className="box" style={{
                margin: '20px auto',
                borderRadius: '30px',
                maxWidth: '600px',
                width: '100%',
                display: 'flex',
                alignItems: 'stretch',
                minHeight: '500px',
            }}>
                <div className="photo" style={{ borderRadius: '20px', display: 'flex' }}>
                    <CardMedia
                        component="img"
                        image={imageSrc}
                        style={{ width: '100%', height: '100%' }}
                    />
                </div>
                <div style={{ width: '100%' }}>
                    <CardContent>
                        <Typography variant="h4">Hi</Typography>
                        {postData && postData.title && (
                            <Typography variant="h4">{postData.title}</Typography>
                        )}
                        {postData && postData.description && (
                            <Typography variant="body1">{postData.description}</Typography>
                        )}
                    </CardContent>
                </div>
            </Card>

        </div>
    );
};

export default Post;

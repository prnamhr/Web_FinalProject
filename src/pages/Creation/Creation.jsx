import {Link, useParams} from 'react-router-dom';
import { Box, Button, TextField, Select, MenuItem, InputLabel, FormControl, Paper, Typography } from '@mui/material';
import { AppBar, Toolbar, IconButton, InputBase, Badge, Grid } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import {useState} from 'react'

const Home = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [board, setBoard] = useState('');
    const boardOptions = ['Board 1', 'Board 2', 'Board 3'];


    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log({ title, description, board });
    };

    const {username} = useParams();
    const searchStyle = {
        position: 'relative',
        borderRadius: '20px',
        backgroundColor: '#F5E8DD',
        '&:hover': {backgroundColor: 'rgba(255,255,255,0.25)'},
        marginRight: '16px',
        marginLeft: 'auto',
        width: '660%',
    };

    const searchIconStyle = {
        padding: '0 16px',
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    };
    const mainStyle = {
        flex: 1,
        height: "auto",
        marginTop: "15px",
        display: "grid",
        gridTemplateColumns: "repeat(auto-filled, 300px)",
        gridAtoRows: "10px"
    };

    return (
        <div className='mainPage'>
            <div className='tollbar'>
                <AppBar position="static" color="default" elevation={0}>
                    <Toolbar>
                        <img src="/pic/logo.png" alt="Logo" style={{width: '30px', height: '30px'}}/>
                        <Grid container margin="10px">
                            <Grid item style={{marginRight: '3px'}}>
                                <Link to={`/${username}`} style={{textDecoration: 'none'}}>
                                    <Button sx={{
                                        backgroundColor: '#aa24c1',
                                        color: '#fff',

                                    }}>Home</Button>
                                </Link>
                            </Grid>
                            <Grid item style={{marginRight: '10px'}}>
                                <Button sx={{
                                    backgroundColor: '#e989b9',
                                    color: '#fff',
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
                            />
                        </div>

                        <IconButton aria-label="show notifications" color="inherit">
                            <Badge badgeContent={4} color="secondary">
                                <NotificationsIcon/>
                            </Badge>
                        </IconButton>
                        <IconButton
                            edge="end"
                            aria-label="account of current user"
                            aria-controls="primary-search-account-menu"
                            aria-haspopup="true"
                            color="inherit"
                        ><AccountCircle/>
                        </IconButton>
                        <IconButton
                            aria-label="display more actions"
                            edge="end"
                            color="inherit"
                        >
                            <MoreVertIcon/>
                        </IconButton>

                    </Toolbar>
                </AppBar>
            </div>
            <div className='uplod' style={mainStyle}>
                <Box display="flex" justifyContent="center" alignItems="center" p={2}>
                    <Paper elevation={3} sx={{ maxWidth: 600, width: '100%', p: 2 }}>
                        <Box component="form"  sx={{ display: 'grid', gap: 2 }}>
                            <Box sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                border: '1px dashed grey',
                                borderRadius: 2,
                                padding: 2,
                            }}>
                                <CloudUploadIcon sx={{ fontSize: 50 }} />
                                <Button  sx={{
                                    backgroundColor: '#aa24c1',
                                    color: '#fff',
                                    '&:hover': {
                                        backgroundColor: '#e989b9',
                                    } }}variant="contained" component="label" >
                                    Choose a file or drag and drop it here
                                    <input type="file" hidden onChange={(e) => console.log(e.target.files)} />
                                </Button>
                                <Typography variant="caption" sx={{ mt: 1 }}>
                                    We recommend using high-quality jpg files less than 20MB or .mp4 files less than 200MB.
                                </Typography>
                            </Box>

                            <TextField label="Title" variant="outlined" value={title} onChange={(e) => setTitle(e.target.value)} />
                            <TextField
                                label="Description"
                                variant="outlined"
                                multiline
                                rows={4}
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                            <FormControl>
                                <InputLabel>Board</InputLabel>
                                <Select
                                    value={board}
                                    label="Board"
                                    onChange={(e) => setBoard(e.target.value)}
                                >
                                    {boardOptions.map((option) => (
                                        <MenuItem key={option} value={option}>
                                            {option}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                            <Button
                                sx={{
                                    backgroundColor: '#aa24c1',
                                    color: '#fff',
                                    '&:hover': {
                                        backgroundColor: '#e989b9',
                                    },
                                }}
                                onClick={handleSubmit}
                            >
                                Create
                            </Button>
                        </Box>
                    </Paper>
                </Box>
            </div>
        </div>
);
};

export default Home;

import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {Link} from 'react-router-dom';
import Alert from '@mui/material/Alert';
import {useState} from 'react'

const defaultTheme = createTheme();
import './index.css'

export default function ForgotPassword() {
    const [message, setMessage] = useState('');
    const [isSearchValid, setIsSearchValid] = useState(true);
    const [formData, setFormData] = useState({email: ''});

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsSearchValid(true);
        setMessage('');

        if (formData.email.trim() === '') {
            setIsSearchValid(false);
            setMessage('Please enter a valid email, name, or username.');
            return;
        }
        try {
            const response = await fetch(`http://localhost:3000/forgotpassword`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body:
                    JSON.stringify({
                        searchInput: formData.email
                    }),
            });

            if (response.ok) {
                const data = await response.json();
                setMessage(data.message);
            } else {
                const errorData = await response.json();
                setIsSearchValid(false);
                setMessage(errorData.error);
            }
        } catch (error) {
            console.error('Error occurred during fetch:', error);
            setIsSearchValid(false);
            setMessage('An unexpected error occurred.');
        }
    };

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <Box
                    sx={{
                        marginTop: 8,
                        display: "flex",
                        backgroundColor: "#fff",
                        flexDirection: "column",
                        alignItems: "center",
                        padding: "20px",
                        borderRadius: "10px",
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    }}
                >
                    <img
                        src="/pic/logo.jpg"
                        alt="Pinterest Logo"
                        style={{width: '200px', height: '200px'}}
                    />
                    <Typography component="h1" variant="h5" style={{color: '#8e3b13'}}>
                        Let's find your lumière account
                    </Typography>

                    <Typography variant="body2" sx={{mt: 3}} style={{color: '#8e3b13'}}>
                        What's your email or username?
                    </Typography>

                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{mt: 1}}>
                        <TextField
                            margin="normal"
                            fullWidth
                            id="email"
                            label="Search"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            variant="outlined"
                            value={formData.email}
                            onChange={handleChange}
                        /> {message && <Alert severity={isSearchValid ? "success" : "error"}>{message}</Alert>}
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{
                                mt: 3,
                                mb: 2,
                                backgroundColor: '#8e3b13',
                                color: '#fff',
                                '&:hover': {
                                    backgroundColor: '#c6815a',
                                },
                            }}
                        >
                            Send Reset Link
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link to="/" style={{textDecoration: 'none'}}>
                                    <Button sx={{
                                        backgroundColor: '#8e3b13',
                                        color: '#fff',
                                        '&:hover': {
                                            backgroundColor: '#c6815a',
                                        },
                                    }}>Log In</Button>
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link to="/Signup" style={{textDecoration: 'none'}}>
                                    <Button sx={{
                                        backgroundColor: '#8e3b13',
                                        color: '#fff',
                                        '&:hover': {
                                            backgroundColor: '#c6815a',
                                        },
                                    }}>Sign Up</Button>
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}
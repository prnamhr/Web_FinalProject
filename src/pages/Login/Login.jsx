import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import {Link} from "react-router-dom";

import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

const defaultTheme = createTheme();

export default function Login() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [isValid, setIsValid] = useState({
        email: true,
        password: true,
    });
    useEffect(()=>
    {  //localStorage.clear();
        const userAuth= JSON.parse(localStorage.getItem("userAuth"))
        if(userAuth){
            navigate(`/inside`);
        }

    },[])
    const [isUser, setIsUser] = useState(false);
    const navigate = useNavigate();
    const validateForm = () => {
        const currentIsValid = {
            email: formData.email.trim() !== "",
            password: formData.password.trim() !== "",
        };
        setIsValid(currentIsValid);
        return currentIsValid.email && currentIsValid.password;
    };
    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formIsValid = validateForm();

        if (formIsValid) {
            try {
                const response = await fetch('http://localhost:3000/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email: formData.email,
                        password: formData.password,
                    }),
                });

                if (response.ok) {
                    const data = await response.json();

                    if (data) {
                        setIsUser(false);
                        localStorage.setItem("userAuth",JSON.stringify(data))
                        navigate(`/inside`);

                    } else {
                        setIsUser(true);
                    }
                } else {
                    console.error('Server returned an error:', response.status, response.statusText);
                }
            } catch (error) {
                console.error('Error during login:', error.message);
            }
        }
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline
                    sx={{
                        marginTop: 8,
                        display: "flex",
                        backgroundcolor: "#fff",
                        flexDirection: "column",
                        alignItems: "center",
                        padding: "20px",
                        borderRadius: "10px",
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    }}
                />
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
                        style={{width: "200px", height: "200px"}}
                    />
                    <Typography component="h1" variant="h5" style={{color: '#8e3b13'}}>
                        Welcome to lumière
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{mt: 1}}>
                        <TextField
                            margin="normal"
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            onChange={handleChange}
                            helperText={!isValid.email &&
                                <span style={{color: "red", fontFamily: "BeautifulFont"}}>Invalid email address</span>}
                        />
                        <TextField
                            margin="normal"
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            onChange={handleChange}
                            helperText={!isValid.password && <span style={{color: "red", fontFamily: "BeautifulFont"}}>Password cannot be empty</span>}
                        />
                        {isUser &&
                            <div className="error-message" style={{color: "red", fontFamily: "BeautifulFont"}}> Email or
                                Password is wrong!</div>}
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{
                                mt: 3,
                                mb: 2,
                                backgroundColor: "#8e3b13",
                                color: "#fff",
                                "&:hover": {
                                    backgroundColor: "#c6815a",
                                },
                            }}
                        >
                            Log In
                        </Button>
                        <Link to="/password/reset" style={{textDecoration: "none"}}>
                            <Typography variant="body2" color="#8e3b13" sx={{mt: 3}}>
                                Forgot password?
                            </Typography>
                        </Link>

                        <Link to="/signup" style={{textDecoration: "none"}}>
                            <Typography variant="body2" color="#8e3b13" sx={{mt: 3}}>
                                Don't you have an account?
                            </Typography>
                        </Link>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}

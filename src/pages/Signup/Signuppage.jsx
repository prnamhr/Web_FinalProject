import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import {Link} from "react-router-dom";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

const defaultTheme = createTheme();

export default function Signup() {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
    });
    const [isValid, setIsValid] = useState({
        firstName: true,
        lastName: true,
        email: true,
        password: true,
    });
    const [isUniqueEmail, setIsUniqueEmail] = useState(true);
    const navigate = useNavigate();
    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    const validateForm = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const currentIsValid = {
            firstName: formData.firstName.trim() !== '',
            lastName: formData.lastName.trim() !== '',
            email: emailRegex.test(formData.email),
            password: formData.password.trim() !== '',
        };

        setIsValid(currentIsValid);

        return (
            currentIsValid.firstName &&
            currentIsValid.lastName &&
            currentIsValid.email &&
            currentIsValid.password
        );
    };
    const checkUniqueEmail = async () => {
        try {
            const response = await fetch(`http://localhost:3000/signup/checkUniqueEmail?email=${formData.email}`);
            const data = await response.json();

            setIsUniqueEmail(data.isUnique);

            return data.isUnique;
        } catch (error) {
            console.error("Email uniqueness check error:", error.message);
        }
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        const formIsValid = validateForm();
        console.log(formIsValid);
        const isUniqueEmail = await checkUniqueEmail();

        if (formIsValid && isUniqueEmail) {
            try {
                const response = await fetch("http://localhost:3000/signup", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        first_name: formData.firstName,
                        last_name: formData.lastName,
                        email: formData.email,
                        password: formData.password,
                    }),
                });
                console.log(response)
                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message);
                }
                const data = await response.json();
                localStorage.setItem("userAuth",JSON.stringify(data))
                navigate(`/`);
                console.log("Signup successful");
            } catch (error) {
                console.error("Signup error:", error.message);
                setError(error.message); // Error is not defined; you might want to declare 'setError'
            }
        } else {
            console.error("Form is not valid or email is not unique");
        }
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
                    <Link
                        to="/"
                        style={{
                            textDecoration: "none",
                            alignSelf: "flex-start",
                            marginLeft: "6px",
                        }}
                    >
                        <Typography
                            variant="body2"
                            style={{color: '#8e3b13'}}
                            sx={{mt: 3, fontSize: "18px"}}
                        >
                            Back
                        </Typography>
                    </Link>
                    <img
                        src="/pic/logo.jpg"
                        alt="Pinterest Logo"
                        style={{width: "180px", height: "180px"}}
                    />
                    <Typography component="h1" variant="h5 " style={{color: '#8e3b13'}}>
                        Sign Up for lumière
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{mt: 1}}>
                        {!isUniqueEmail &&
                            <div className="error-message" style={{color: "red", fontFamily: "BeautifulFont"}}> You have
                                already signed in</div>}
                        <TextField
                            margin="normal"
                            fullWidth
                            id="firstName"
                            label="First Name"
                            name="firstName"
                            autoComplete="fname"
                            value={formData.firstName}
                            onChange={handleChange}
                            helperText={!isValid.firstName && <span style={{color: "red", fontFamily: "BeautifulFont"}}>First Name cannot be empty</span>}
                        />
                        <TextField
                            margin="normal"
                            fullWidth
                            id="lastName"
                            label="Last Name"
                            name="lastName"
                            autoComplete="lname"
                            value={formData.lastName}
                            onChange={handleChange}
                            helperText={!isValid.lastName && <span style={{color: "red", fontFamily: "BeautifulFont"}}>Last Name cannot be empty</span>}
                        />
                        <TextField
                            margin="normal"
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            value={formData.email}
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
                            value={formData.password}
                            onChange={handleChange}
                            helperText={!isValid.password && <span style={{color: "red", fontFamily: "BeautifulFont"}}>Password cannot be empty</span>}
                        />
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
                            Sign Up
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}

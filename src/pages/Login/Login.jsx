import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link } from "react-router-dom";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
  const[isUser, setIsUser] = useState(false);
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
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formIsValid = validateForm();
    console.log(formData.email, formData.password);

    if (formIsValid) {
      try {
        const response = await fetch(
          `http://localhost:3000/?email=${formData.email}&password=${formData.password}`,
          {
            method: "GET",
          }
        );
        console.log(response);
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          if(data.length > 0) {
            setIsUser(false);
          
            navigate(`/${data[0].username}`); 
          } else {
            setIsUser(true);
          }
        } else {
          console.error(
            "Server returned an error:",
            response.status,
            response.statusText
          );
        }
      } catch (error) {
        console.error("Error during login:", error.message);
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
            style={{ width: "200px", height: "200px" }}
          />
          <Typography component="h1" variant="h5">
            Welcome to lumière
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              onChange={handleChange}
              helperText={!isValid.email && <span style={{ color: "red", fontFamily: "BeautifulFont" }}>Invalid email address</span>}
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
              helperText={!isValid.password && <span style={{ color: "red", fontFamily: "BeautifulFont" }}>Password cannot be empty</span>}
            />
             {isUser && <div className="error-message" style={{ color: "red", fontFamily: "BeautifulFont" }}> Email or Password is wrong!</div>}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                backgroundColor: "#aa24c1",
                color: "#fff",
                "&:hover": {
                  backgroundColor: "#e989b9",
                },
              }}
            >
              Log In
            </Button>
            <Link to="/password/reset" style={{ textDecoration: "none" }}>
              <Typography variant="body2" color="#aa24c1" sx={{ mt: 3 }}>
                Forgot password?
              </Typography>
            </Link>

            <Link to="/signup" style={{ textDecoration: "none" }}>
              <Typography variant="body2" color="#aa24c1" sx={{ mt: 3 }}>
                Don't you have an account?
              </Typography>
            </Link>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

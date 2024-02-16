import React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link } from "react-router-dom";

const defaultTheme = createTheme();

export default function Login() {
  return (
    <ThemeProvider theme={defaultTheme}>
      
      <Container component="main" maxWidth="xs">
      
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            backgroundcolor: '#fff',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '20px',
            borderRadius: '10px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          }}>
          <Link to="/" style={{ textDecoration: 'none', alignSelf: 'flex-start', marginLeft: '6px',}}>
            <Typography variant="body2" color="#aa24c1" sx={{ mt: 3 ,fontSize:'18px'} }>
              Back
            </Typography>
          </Link>
        <img
            src="/pic/logo.jpg" 
            alt="Pinterest Logo"
            style={{ width: '180px', height: '180px' }}
          />
          <Typography component="h1" variant="h5">
          Sign Up for lumière
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
          <TextField
              margin="normal"
              fullWidth
              id="name"
              label="Name"
              name="name"
              autoComplete="name"
            />
          <TextField
              margin="normal"
              fullWidth
              id="lastname"
              label="Last Name"
              name="email"
              autoComplete="email"
            />
            <TextField
              margin="normal"
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
            />
            <TextField
              margin="normal"
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
        <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                backgroundColor: '#aa24c1',
                color: '#fff',
                '&:hover': {
                  backgroundColor: '#e989b9',
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

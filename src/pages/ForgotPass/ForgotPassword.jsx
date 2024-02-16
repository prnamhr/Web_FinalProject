
import React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link } from 'react-router-dom';

const defaultTheme = createTheme();

export default function ForgotPassword() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        ><img
        src="/pic/logo.jpg" 
        alt="Pinterest Logo"
        style={{ width: '200px', height: '200px' }}
      />
          <Typography component="h1" variant="h5">
          Let's find your lumière account
          </Typography>
          
            <Typography variant="body2" color="text.secondary" sx={{ mt: 3 }}>
            What's your email, name, or username?
            </Typography>
            <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              fullWidth
              id="email"
              label="Search"
              name="email"
              autoComplete="email"
              autoFocus
              variant="outlined"
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
              Send Reset Link
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/" style={{ textDecoration: 'none' }}>
                  <Button sx={{
                backgroundColor: '#aa24c1',
                color: '#fff',
                '&:hover': {
                  backgroundColor: '#e989b9',
                },
              }}>Log In</Button>
                </Link>
              </Grid>
              <Grid item>
                <Link to="/signup" style={{ textDecoration: 'none' }}>
                  <Button sx={{
                backgroundColor: '#aa24c1',
                color: '#fff',
                '&:hover': {
                  backgroundColor: '#e989b9',
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

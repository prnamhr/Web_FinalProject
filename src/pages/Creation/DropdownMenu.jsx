import { Link } from 'react-router-dom';
import { MenuItem, Paper } from '@mui/material';

const DropdownMenu = ({ open, onClose }) => {
    if (!open) return null;

    const handleLogout = () => {
        // Clear localStorage on logout
        localStorage.clear();
        // You may also want to redirect to the login page or perform other logout-related actions
        // For example: window.location.href = '/login';
    };

    return (
        <Paper
            elevation={3}
            style={{
                position: 'absolute',
                top: '100%',
                right: 0,
                backgroundColor: '#fff',
                borderRadius: '4px',
                padding: '8px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            }}
        >
            <Link to={`/`} style={{ textDecoration: 'none' }}>
                <MenuItem onClick={() => { handleLogout(); onClose(); }} sx={{ color: 'black' }}>Logout</MenuItem>
            </Link>
        </Paper>
    );
};

export default DropdownMenu;

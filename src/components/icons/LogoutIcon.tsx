import { Alert, Snackbar } from '@mui/material';
import logoutIcon from '../../images/logout.png';
import { useState } from 'react';

export function LogoutIcon() {
    const [open, setOpen] = useState(false);

    const clearLocalStorage = () => {
        localStorage.removeItem('currentUser');
        setOpen(true);
        const timer = setTimeout(() => {
            setOpen(false);
        }, 2000);

        return () => clearTimeout(timer);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <div>
                <img
                    src={logoutIcon}
                    alt="Logout"
                    onClick={clearLocalStorage}
                    style={{
                        position: 'absolute',
                        bottom: '20px',
                        left: '20px',
                        width: '80px',
                        height: '80px',
                        cursor: 'pointer',
                        transition: 'transform 0.3s, opacity 0.3s',
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scale(1.1)';
                        e.currentTarget.style.opacity = '0.8';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1)';
                        e.currentTarget.style.opacity = '1';
                    }}
                />
            </div>

            <Snackbar
                open={open}
                autoHideDuration={2000}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert 
                    variant="outlined" 
                    severity="success" 
                    sx={{
                        fontFamily: "'Indie Flower', cursive", 
                        fontWeight: "bold", 
                        fontSize: "2rem",
                        display: 'flex',
                        alignItems: 'center',
                        '& .MuiAlert-icon': {
                            fontSize: '2.6rem',
                            marginRight: '8px',
                        }
                    }}
                >
                    Logged Out!
                </Alert>
            </Snackbar>
        </>
    );
}

import { Alert, Stack, Typography } from "@mui/material";
import { SetStateAction, useEffect, useState } from "react";

import { getPasswords } from '../../api/getPasswords';

type Logins = {
    username: string,
    password: string
}

const primaryColour = "#FF8343";

type LoginProps = {
    navigateToHome: () => void
}

export function Login({
    navigateToHome
}: LoginProps) {

    const [logins, setLogins] = useState<Logins[]>([]);
    const [message, setMessage] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showAlert, setShowAlert] = useState(false);

    const alert = () => {
        return(
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
                Account Created!
            </Alert>
        )
    }

    useEffect(() => {
        const fetchPasswords = async () => {
            const data = await getPasswords();
            setLogins(data);
        };

        fetchPasswords();
    }, []);

    const handleButtonClick = () => {
        setMessage('')
        setShowAlert(true); 
        setUsername('');
        setPassword('');
        
        const timer = setTimeout(() => {
            setShowAlert(false);
        }, 2000);

        return () => clearTimeout(timer);
    };

    const handleUsernameChange = (event: { target: { value: SetStateAction<string> } }) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event: { target: { value: SetStateAction<string> } }) => {
        setPassword(event.target.value);
    };

    const validateLogin = () => {
        const user = logins.find((login) => login.username === username);

        if (user) {
            if (user.password === password) {
                localStorage.setItem('currentUser', username);
                navigateToHome()
                alert()
                handleButtonClick();
            } else {
                setMessage('Incorrect password. Please try again.');
            }
        } else {
            setMessage('Username not found. Please try again.');
        }
    };

    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh"
        }}>
            <Typography variant="h1" style={{ marginBottom: "80px", fontFamily: "'Indie Flower', cursive", fontWeight: "bold", fontSize: "8rem" }}>
                Login
            </Typography>

            <Stack direction="row" spacing={2} sx={{ justifyContent: "center", alignItems: "center" }}>
                <Typography variant="h3" style={{ marginBottom: "30px", fontFamily: "'Indie Flower', cursive", fontWeight: "bold", fontSize: "3rem" }}>
                    Username:
                </Typography>
                <input
                    onChange={handleUsernameChange}
                    value={username}
                    type="text"
                    id="standard-basic"
                    placeholder="Enter Username"
                    autoComplete="off"
                    style={{
                        width: '250px',
                        height: '50px',
                        border: 'none',
                        borderBottom: '2px solid black',
                        fontFamily: "'Indie Flower', cursive",
                        fontSize: "2rem",
                        fontWeight: "bold",
                        background: 'none',
                        textAlign: 'center',
                        marginBottom: '60px',
                    }}
                    onFocus={(event) => {
                        event.target.style.outline = `none`;
                        event.target.style.borderBottom = `2px solid ${primaryColour}`;
                        event.target.placeholder = '';
                    }}
                    onBlur={(event) => {
                        event.target.style.borderBottom = '2px solid black';
                        event.target.placeholder = 'Enter Username';
                    }}
                />
            </Stack>

            <Stack direction="row" spacing={2} sx={{ justifyContent: "center", alignItems: "center" }}>
                <Typography variant="h3" style={{ marginBottom: "30px", fontFamily: "'Indie Flower', cursive", fontWeight: "bold", fontSize: "3rem" }}>
                    Password:
                </Typography>
                <input
                    onChange={handlePasswordChange}
                    value={password}
                    type="text"
                    id="standard-basic"
                    placeholder="Enter Password"
                    autoComplete="off"
                    style={{
                        width: '250px',
                        height: '50px',
                        border: 'none',
                        borderBottom: '2px solid black',
                        fontFamily: "'Indie Flower', cursive",
                        fontSize: "2rem",
                        fontWeight: "bold",
                        background: 'none',
                        textAlign: 'center',
                        marginBottom: '60px',
                    }}
                    onFocus={(event) => {
                        event.target.style.outline = `none`;
                        event.target.style.borderBottom = `2px solid ${primaryColour}`;
                        event.target.placeholder = '';
                    }}
                    onBlur={(event) => {
                        event.target.style.borderBottom = '2px solid black';
                        event.target.placeholder = 'Enter Password';
                    }}
                />
            </Stack>

            <span
                 onClick={validateLogin} 
                style={{
                    color: "green",
                    display: "inline-block",
                    fontSize: "4rem",
                    height: "65px",
                    fontFamily: "'Indie Flower', cursive",
                    fontWeight: "bold",
                    cursor: "pointer",
                    transition: "transform 0.3s, background-color 0.3s",
                    marginBottom: "80px"
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.color = 'darkgreen',
                    e.currentTarget.style.transform = 'scale(1.1)'
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'green',
                    e.currentTarget.style.transform = 'scale(1)'
                }}
                >
                SUBMIT
            </span>

            <div style={{transition: '0.3s', height: '50px'}}>
            {message &&
                <Typography
                    style={{ 
                        fontFamily: "'Indie Flower',cursive",
                        fontWeight: "bold",
                        fontSize: "2rem",
                    }}>{message}
                </Typography>
                }
            </div> 
            
            <div style={{transition: '0.3s', height: '75px'}}>
            {showAlert && (
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
                    Logged In!
                </Alert>
            )}
            </div>
        </div>
    )
}
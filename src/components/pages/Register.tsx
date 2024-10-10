import { Alert, Stack, Typography } from "@mui/material";
import { SetStateAction, useEffect, useState } from "react";

import { getUsernames } from '../../api/getUsernames';
import { addUser } from '../../api/addUser'

const primaryColour = "#FF8343";

import { getCountryByTimeZone } from '../functions/getLocation';

function validPassword(password:string) {
    const minLength = 6;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasDigit = /\d/.test(password); 

    if (password.length < minLength) {
        return { valid: false, message: 'Password must be at least 6 characters long.' };
    }
    if (!hasUpperCase) {
        return { valid: false, message: 'Password must contain at least one uppercase letter.' };
    }
    if (!hasLowerCase) {
        return { valid: false, message: 'Password must contain at least one lowercase letter.' };
    }
    if (!hasDigit) {
        return { valid: false, message: 'Password must contain at least one digit.' };
    }
    return { valid: true, message: 'Password is valid.' }; 
}

const location: string = getCountryByTimeZone();

type Packet = {
    username: string,
    score: number,
    location: string,
    password: string
}

export function Register() {

    const [usedNames, setUsedNames] = useState<string[]>([]);
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
        const fetchScores = async () => {
            const data = await getUsernames();
            setUsedNames(data);
        };
    
        fetchScores();
    }, [])

    const handleButtonClick = () => {
        setMessage('')
        const body: Packet = {
            username: username,
            password: password,
            score: 0,
            location: location
        }
        addUser(body)
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

    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh"
        }}>
            <Typography variant="h1" style={{ marginBottom: "80px", fontFamily: "'Indie Flower', cursive", fontWeight: "bold", fontSize: "8rem" }}>
                Register
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
                 onClick={() => {
                    const result = validPassword(password)
                    if (password && username && (!usedNames.includes(username)) && result.valid) {
                        handleButtonClick()
                        alert()
                    } else {
                        if (!username) {
                            setMessage('Please enter a username.');
                        } else if (!password) {
                            setMessage('Please enter a password.');
                        } else if (result.valid == false) {
                            setMessage(result.message)
                        } else if (usedNames.includes(username)) {
                            setMessage('Username already taken.');
                        }
                    }
                }} 
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
                    Account Created!
                </Alert>
            )}
            </div>
        </div>
    )
}
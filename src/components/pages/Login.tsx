import { Stack, Typography } from "@mui/material";
import { SetStateAction, useEffect, useState } from "react";

import { getPasswords } from '../../api/getPasswords';

import { clickSound } from "../sounds/clickSXF";
import { play } from "../sounds/generalSFX";
import error from '../../sounds/error.mp3'
import { getUserId } from "../../api/getUserId";

type Logins = {
    username: string,
    password: string
}

const primaryColour = "#FF8343";

type LoginProps = {
    navigateToHome: () => void
}

export function Login({navigateToHome}: LoginProps) {

    const [logins, setLogins] = useState<Logins[]>([]);
    const [message, setMessage] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        const fetchPasswords = async () => {
            const data = await getPasswords();
            setLogins(data);
        };

        fetchPasswords();
    }, []);

    const handleUsernameChange = (event: { target: { value: SetStateAction<string> } }) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event: { target: { value: SetStateAction<string> } }) => {
        setPassword(event.target.value);
    };

    const validateLogin = async () => {
        const user = logins.find((login) => login.username === username);
    
        if (user) {
            if (user.password === password) {
                clickSound();
    
                const userId = await getUserId(username);
                const currentUser = {
                    username: username,
                    userId: userId
                };
    
                localStorage.setItem('currentUser', JSON.stringify(currentUser));
    
                setMessage('');
                setUsername('');
                setPassword('');
                navigateToHome();
            } else {
                play(error);
                setMessage('Incorrect password. Please try again.');
            }
        } else {
            play(error);
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
        </div>
    )
}
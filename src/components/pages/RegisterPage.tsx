import { Stack, Typography } from "@mui/material";
import { SetStateAction, useEffect, useState } from "react";

import { getUsernames } from '../../api/getUsernames';
import { addUser } from '../../api/addUser'

import { Register } from "../../models/Register";

const primaryColour = "#FF8343";

import { getCountryByTimeZone } from '../functions/getLocation';
import { validatePassword } from "../functions/validatePassword";

import { clickSound } from "../sounds/clickSXF";
import { play } from "../sounds/generalSFX";
import error from '../../sounds/error.mp3'

const location: string = getCountryByTimeZone();

type RegisterPageProps = {
    navigateToLogin: () => void
}

const validateUsername = (username: string): boolean => {
    const usernameRegex = /^[^\s]+$/;
    return username.trim() !== '' && usernameRegex.test(username);
};


export function RegisterPage({navigateToLogin}:RegisterPageProps) {

    const [usedNames, setUsedNames] = useState<string[]>([]);
    const [message, setMessage] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        const fetchScores = async () => {
            const data = await getUsernames();
            setUsedNames(data);
        };
    
        fetchScores();
    }, [])

    const handleButtonClick = async () => {
        setMessage('')
        const body: Register = {
            username: username,
            password: password,
            score: 0,
            location: location
        }
        await addUser(body)
        setUsername('');
        setPassword('');
        navigateToLogin()
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
                    placeholder="Create Username"
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
                        event.target.placeholder = 'Create Username';
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
                    placeholder="Create Password"
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
                        event.target.placeholder = 'Create Password';
                    }}
                />
            </Stack>

            <span
                 onClick={() => {
                    const passwordCheck = validatePassword(password)
                    const usernameCheck = validateUsername(username)

                    if (password && username && (!usedNames.includes(username)) && passwordCheck.valid && usernameCheck) {
                        clickSound()
                        handleButtonClick()
                    } else {
                        play(error)
                        if (!username) {
                            setMessage('Please enter a username.');
                        } else if (!password) {
                            setMessage('Please enter a password.');
                        } else if (passwordCheck.valid == false) {
                            setMessage(passwordCheck.message)
                        } else if (usedNames.includes(username)) {
                            setMessage('Username already taken.');
                        } else if (!usernameCheck) {
                            setMessage('Username cannot contain spaces.')
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
        </div>
    )
}
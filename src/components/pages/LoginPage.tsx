import { Stack, Typography } from "@mui/material";
import { SetStateAction, useState } from "react";

import { checkLogin } from "../../api/checkLogin";

import { clickSound } from "../sounds/clickSXF";
import { play } from "../sounds/generalSFX";
import error from '../../sounds/error.mp3'
import openEyeIcon from "../../images/eyeOpen.png"
import closedEyeIcon from "../../images/eyeClosed.png"
import StyledCard from "../StyledCard"

const primaryColor = "#9c8b75"

type LoginProps = {
    navigateToHome: () => void
}

type Login = {
    username: string,
    password: string,
}

export function Login({navigateToHome}: LoginProps) {

    const [message, setMessage] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [seePassword, setSeePassword] = useState(false) 

    const handleUsernameChange = (event: { target: { value: SetStateAction<string> } }) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event: { target: { value: SetStateAction<string> } }) => {
        setPassword(event.target.value);
    };

    const validateLogin = async () => {
        clickSound()
        const body: Login = {
            username: username,
            password: password
        }
        const result = await checkLogin(body);
        if (result.success) {
            setMessage('');
            setUsername('');
            setPassword('');
            navigateToHome();
        } else {
            play(error);
            if (result.message) setMessage(result.message)
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
            <StyledCard title="Login" padding="20px" marginBottom="50px" fontSize="8rem" width="600px">
                <Stack
                    direction="column"
                    spacing={-3}
                    sx={{
                        justifyContent: "center",
                        alignItems: "flex-start",
                    }}
                >
                    {/* USERNAME */}
                    <Stack direction="row" spacing={2} sx={{ justifyContent: "center", alignItems: "center" }}>
                        <Typography variant="h3" style={{ marginBottom: "30px", fontFamily: "'Indie Flower', cursive", fontWeight: "bold", fontSize: "3rem" }}>
                            Username:
                        </Typography>
                        <input
                            onChange={handleUsernameChange}
                            value={username}
                            type="text"
                            id="username"
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
                                event.target.style.borderBottom = `2px solid ${primaryColor}`;
                                event.target.placeholder = '';
                            }}
                            onBlur={(event) => {
                                event.target.style.borderBottom = '2px solid black';
                                event.target.placeholder = 'Enter Username';
                            }}
                        />
                    </Stack>
                    
                    {/* PASSWORD */}
                    <Stack direction="row" spacing={2} sx={{ justifyContent: "center", alignItems: "center" }}>
                        <Typography variant="h3" style={{ marginBottom: "30px", fontFamily: "'Indie Flower', cursive", fontWeight: "bold", fontSize: "3rem" }}>
                            Password:
                        </Typography>
                        <input
                            onChange={handlePasswordChange}
                            value={password}
                            type={seePassword ? "text" : "password"}
                            id="password"
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
                                event.target.style.borderBottom = `2px solid ${primaryColor}`;
                                event.target.placeholder = '';
                            }}
                            onBlur={(event) => {
                                event.target.style.borderBottom = '2px solid black';
                                event.target.placeholder = 'Enter Password';
                            }}
                        />
                        {seePassword ? 
                            (<img
                                src={closedEyeIcon}
                                alt="See Password"
                                onClick={() => {setSeePassword(false)}}
                                style={{
                                    width: '40px',
                                    height: '40px',
                                    cursor: 'pointer',
                                    marginBottom: '50px',
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
                            />) 
                            :
                            (<img
                                src={openEyeIcon}
                                alt="See Password"
                                onClick={() => {setSeePassword(true)}}
                                style={{
                                    width: '40px',
                                    height: '40px',
                                    cursor: 'pointer',
                                    marginBottom: '50px',
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
                            />)
                        }
                    </Stack>
                </Stack>
                <span
                    onClick={validateLogin}
                    style={{
                        color: primaryColor,
                        display: "inline-block",
                        fontSize: "4rem",
                        height: "65px",
                        fontFamily: "'Indie Flower', cursive",
                        fontWeight: "bold",
                        cursor: "pointer",
                        transition: "transform 0.3s, background-color 0.3s",
                        marginBottom: "20px"
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.color = 'black',
                        e.currentTarget.style.transform = 'scale(1.1)'
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.color = primaryColor,
                        e.currentTarget.style.transform = 'scale(1)'
                    }}
                    >
                    SUBMIT
                </span>
            </StyledCard>

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
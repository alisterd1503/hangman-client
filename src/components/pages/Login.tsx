import { Stack, Typography } from "@mui/material";
import { SetStateAction, useState } from "react";
const primaryColour = "#FF8343";

export function Login() {

    const message = 'hello'
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    console.log(username,password)


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
                Login
            </Typography>

            <Stack direction="row" spacing={2} sx={{ justifyContent: "center", alignItems: "center" }}>
                <Typography variant="h3" style={{ marginBottom: "30px", fontFamily: "'Indie Flower', cursive", fontWeight: "bold", fontSize: "3rem" }}>
                    Username:
                </Typography>
                <input
                    onChange={handleUsernameChange}
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
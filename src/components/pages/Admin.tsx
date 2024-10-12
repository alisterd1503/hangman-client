import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Checkbox, Tooltip, Stack } from "@mui/material";
import { SetStateAction, useEffect, useState } from "react";
import { getUsers } from "../../api/getUsers";
import { removeUser } from "../../api/removeUser";
import deleteIcon from "../../images/delete.png"
import nameIcon from "../../images/name.png"
import passwordIcon from "../../images/password.png"
import appleIcon from "../../images/apple.png"
import { clickSound } from "../sounds/clickSXF";
import { updateName } from "../../api/updateName";
import { updateScore } from "../../api/udpateScore";
import { updatePassword } from "../../api/updatePassword";
import checkedIcon from '../../images/checked.png'
import uncheckedIcon from '../../images/unchecked.png'
const primaryColour = "#FF8343";

type Users = {
    id: number,
    username: string,
    score: number,
    location: string,
    password: string
}

type NewName = {
    id: number,
    newName: string,
}

type NewScore = {
    id: number,
    newScore: number,
}

type NewPassword = {
    id: number,
    newPassword: string,
}

export function Admin() {
    const [users, setUsers] = useState<Users[]>([]);
    const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
    const [input, setInput] = useState("");
    const [inputType, setInputType] = useState<"username" | "score" | "password" | null>(null);

    useEffect(() => {
        const fetchScores = async () => {
            const data = await getUsers();
            setUsers(data);
        };

        fetchScores();
    }, []);

    const handleInputChange = (event: { target: { value: SetStateAction<string> } }) => {
        setInput(event.target.value);
    };

    const handleSelectUser = (id: number) => {
        setSelectedUserId((prevId) => (prevId === id ? null : id));
        setInput("");
        setInputType(null);
    };

    const handleDelete = async () => {
        if (selectedUserId !== null) {
            await removeUser(selectedUserId);
            const updatedUsers = await getUsers();
            setUsers(updatedUsers);
            setSelectedUserId(null);
        }
    };

    // Handle updating username
    const updateUsername = async () => {
        if (selectedUserId !== null && input) {
            const body: NewName = { newName: input, id: selectedUserId };
            await updateName(body);
            const updatedUsers = await getUsers();
            setUsers(updatedUsers);
            setSelectedUserId(null);
            setInput(""); // Reset input after update
            setInputType(null);
        }
    };

    // Handle updating score
    const updateUserScore = async () => {
        const num = parseInt(input);
        if (selectedUserId !== null && !isNaN(num)) {
            const body: NewScore = { newScore: num, id: selectedUserId };
            await updateScore(body);
            const updatedUsers = await getUsers();
            setUsers(updatedUsers);
            setSelectedUserId(null);
            setInput(""); // Reset input after update
            setInputType(null);
        }
    };

    // Handle updating password
    const updateUserPassword = async () => {
        if (selectedUserId !== null && input) {
            const body: NewPassword = { newPassword: input, id: selectedUserId };
            await updatePassword(body);
            const updatedUsers = await getUsers();
            setUsers(updatedUsers);
            setSelectedUserId(null);
            setInput(""); // Reset input after update
            setInputType(null);
        }
    };

    const handleUpdateClick = () => {
        clickSound()
        if (inputType === "username") updateUsername();
        if (inputType === "score") updateUserScore();
        if (inputType === "password") updateUserPassword();
    };

    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "105vh",
        }}>
            <Typography variant="h1" style={{ fontFamily: "'Indie Flower', cursive", fontWeight: "bold", fontSize: "7rem" }}>
                Admin
            </Typography>

            <TableContainer component={Paper} sx={{ borderRadius: 5, boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.1)', maxWidth: '100%', border: 'solid black 2px', height:'600px', marginBottom:'20px' }}>
            <Table sx={{ minWidth: 800 }}>
                <TableHead>
                    <TableRow sx={{ backgroundColor: '#F48FB1' }}>
                        {/* New Checkbox Column */}
                        <TableCell align="center" sx={{ color: '#FFF', fontWeight: 'bold', fontSize: '2.5rem', fontFamily: "'Indie Flower', cursive" }}>Select</TableCell>
                        <TableCell align="center" sx={{ color: '#FFF', fontWeight: 'bold', fontSize: '2.5rem', fontFamily: "'Indie Flower', cursive" }}>ID</TableCell>
                        <TableCell align="center" sx={{ color: '#FFF', fontWeight: 'bold', fontSize: '2.5rem', fontFamily: "'Indie Flower', cursive" }}>User</TableCell>
                        <TableCell align="center" sx={{ color: '#FFF', fontWeight: 'bold', fontSize: '2.5rem', fontFamily: "'Indie Flower', cursive" }}>Score</TableCell>
                        <TableCell align="center" sx={{ color: '#FFF', fontWeight: 'bold', fontSize: '2.5rem', fontFamily: "'Indie Flower', cursive" }}>Location</TableCell>
                        <TableCell align="center" sx={{ color: '#FFF', fontWeight: 'bold', fontSize: '2.5rem', fontFamily: "'Indie Flower', cursive" }}>Password</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users.map((row) => (
                        <TableRow 
                            key={row.id} 
                            sx={{
                                "&:last-child td, &:last-child th": { border: 0 },
                                backgroundColor: selectedUserId === row.id ? "#FFCCBC" : "transparent",
                                "&:hover": { backgroundColor: "#FFCCBC" },
                            }}
                        >
       
                            <TableCell align="center">
                            <Checkbox
                                checked={selectedUserId === row.id}
                                onChange={() => handleSelectUser(row.id)}
                                icon={<img src={uncheckedIcon} alt="Unchecked" style={{ width: '30px', height: '30px' }} />}
                                checkedIcon={<img src={checkedIcon} alt="Checked" style={{ width: '30px', height: '30px' }} />}
                                disableRipple
                            />
                            </TableCell>
                            <TableCell align="center" sx={{ fontSize: '2rem', color: '#D84315', fontFamily: "'Indie Flower', cursive"}}>{row.id}</TableCell>
                            <TableCell align="center" sx={{ fontSize: '2rem', color: '#D84315', fontFamily: "'Indie Flower', cursive"}}>{row.username}</TableCell>
                            <TableCell align="center" sx={{ fontSize: '2rem', color: '#D84315', fontFamily: "'Indie Flower', cursive" }}>{row.score}</TableCell>
                            <TableCell align="center" sx={{ fontSize: '2rem', color: '#D84315', fontFamily: "'Indie Flower', cursive" }}>{row.location}</TableCell>
                            <TableCell align="center" sx={{ fontSize: '2rem', color: '#D84315', fontFamily: "'Indie Flower', cursive" }}>{row.password}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            </TableContainer>

            {/* Display Delete Button if a user is selected */}
            <div style={{height: "255px"}}>
            {selectedUserId !== null && (<>
                    <Stack
                        direction="row"
                        spacing={15}
                        sx={{
                            justifyContent: "center",
                            alignItems: "center",
                            marginBottom: "30px"
                        }}
                        >
                        <Tooltip
                            title="delete user"
                            placement="bottom"
                            slotProps={{
                                tooltip: {
                                    sx: {
                                        color: 'black',
                                        backgroundColor: 'transparent',
                                        fontSize:'30px',
                                        fontWeight: 'bold',
                                        fontFamily: "'Indie Flower', cursive"
                                    },
                                },
                            }}
                        >
                        <img
                        src={deleteIcon}
                        alt="Home"
                        onClick={() => {clickSound(),handleDelete()}}
                        style={{
                            width: '50px',
                            height: '50px',
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
                        </Tooltip>

                        <Tooltip
                            title="edit name"
                            placement="bottom"
                            slotProps={{
                                tooltip: {
                                    sx: {
                                        color: 'black',
                                        backgroundColor: 'transparent',
                                        fontSize:'30px',
                                        fontWeight: 'bold',
                                        fontFamily: "'Indie Flower', cursive"
                                    },
                                },
                            }}
                        >
                        <img
                        src={nameIcon}
                        alt="Home"
                        onClick={() => {clickSound(),setInputType("username")}}
                        style={{
                            width: '50px',
                            height: '50px',
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
                        </Tooltip>

                        <Tooltip
                            title="edit score"
                            placement="bottom"
                            slotProps={{
                                tooltip: {
                                    sx: {
                                        color: 'black',
                                        backgroundColor: 'transparent',
                                        fontSize:'30px',
                                        fontWeight: 'bold',
                                        fontFamily: "'Indie Flower', cursive"
                                    },
                                },
                            }}
                        >
                        <img
                        src={appleIcon}
                        alt="Home"
                        onClick={() => {clickSound(),setInputType("score")}}
                        style={{
                            width: '70px',
                            height: '70px',
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
                        </Tooltip>

                        <Tooltip
                            title="edit password"
                            placement="bottom"
                            slotProps={{
                                tooltip: {
                                    sx: {
                                        color: 'black',
                                        backgroundColor: 'transparent',
                                        fontSize:'30px',
                                        fontWeight: 'bold',
                                        fontFamily: "'Indie Flower', cursive"
                                    },
                                },
                            }}
                        >
                        <img
                        src={passwordIcon}
                        alt="Home"
                        onClick={() => {clickSound(),setInputType("password")}}
                        style={{
                            width: '50px',
                            height: '50px',
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
                        </Tooltip>
                    </Stack>

                    {inputType && (
                    <Stack direction="row" spacing={2} sx={{ justifyContent: "center", alignItems: "center", height: "55px" }}>
                        <input
                            onChange={handleInputChange}
                            value={input}
                            type={inputType === "score" ? "number" : "text"}
                            id="standard-basic"
                            placeholder={
                                inputType === "username"
                                    ? "New Username"
                                    : inputType === "score"
                                    ? "New Score"
                                    : "New Password"
                            }
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
                            }}
                            onFocus={(event) => {
                                event.target.style.outline = `none`;
                                event.target.style.borderBottom = `2px solid ${primaryColour}`;
                                event.target.placeholder = '';
                            }}
                            onBlur={(event) => {
                                event.target.style.borderBottom = '2px solid black';
                                event.target.placeholder = 'Enter Value';
                            }}
                        />

                        <span
                            onClick={handleUpdateClick}
                            style={{
                                color: "green",
                                display: "inline-block",
                                fontSize: "3rem",
                                height: "65px",
                                fontFamily: "'Indie Flower', cursive",
                                fontWeight: "bold",
                                cursor: "pointer",
                                transition: "transform 0.3s, background-color 0.3s",
                                marginTop: "20px"
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
                            UPDATE
                        </span>
                    </Stack>
                    )}
                </>)}
            </div>
        </div>
    );
}

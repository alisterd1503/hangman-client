import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Checkbox, Tooltip, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { getUsers } from "../../api/getUsers";
import { removeUser } from "../../api/removeUser";
import deleteIcon from "../../images/delete.png"
import nameIcon from "../../images/name.png"
import passwordIcon from "../../images/password.png"
import appleIcon from "../../images/apple.png"
import { clickSound } from "../sounds/clickSXF";
import { updateName } from "../../api/updateName";

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

export function Admin() {
    const [users, setUsers] = useState<Users[]>([]);
    const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
    const inputValue = 'chicken';

    useEffect(() => {
        const fetchScores = async () => {
            const data = await getUsers();
            setUsers(data);
        };

        fetchScores();
    }, []);

    // Handle checkbox selection (only allow one user to be selected at a time)
    const handleSelectUser = (id: number) => {
        setSelectedUserId(prevId => prevId === id ? null : id); // Toggle selection
    };

    // Handle delete action (delete the selected user)
    const handleDelete = async () => {
        if (selectedUserId !== null) {
            await removeUser(selectedUserId)
            const updatedUsers = await getUsers();
            setUsers(updatedUsers);
            setSelectedUserId(null);
        }
    };

    // Handle delete action (delete the selected user)
    const updateUsername = async () => {
        if (selectedUserId !== null && inputValue) {
            const body: NewName = { newName:inputValue, id: selectedUserId}
            await updateName(body)
            const updatedUsers = await getUsers();
            setUsers(updatedUsers);
            setSelectedUserId(null);
        }
    };

    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "90vh",
            marginBottom: "100px"
        }}>
            <Typography variant="h1" style={{ fontFamily: "'Indie Flower', cursive", fontWeight: "bold", fontSize: "8rem" }}>
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
                        <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 }, '&:hover': { backgroundColor: '#FFCCBC' } }}>
                            {/* Checkbox for selecting the user */}
                            <TableCell align="center">
                                <Checkbox
                                    checked={selectedUserId === row.id}
                                    onChange={() => handleSelectUser(row.id)}
                                    color="primary"
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
            <div style={{height: "100px"}}>
            {selectedUserId !== null && (<>
                <Stack
                    direction="row"
                    spacing={15}
                    sx={{
                        justifyContent: "center",
                        alignItems: "center",
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
                    onClick={() => {clickSound(),updateUsername()}}
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
                    onClick={() => {clickSound(),handleDelete()}}
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
                </Stack>
                </>)}
            </div>
        </div>
    );
}

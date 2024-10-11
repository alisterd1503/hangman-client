import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Checkbox, IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { useEffect, useState } from "react";
import { getUsers } from "../../api/getUsers";
import { removeUser } from "../../api/removeUser";

type Users = {
    id: number,
    username: string,
    score: number,
    location: string,
    password: string
}

export function Admin() {
    const [users, setUsers] = useState<Users[]>([]);
    const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

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
            setSelectedUserId(null);
        }
    };

    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "60vh",
        }}>
            <Typography variant="h1" style={{ fontFamily: "'Indie Flower', cursive", fontWeight: "bold", fontSize: "8rem" }}>
                Admin
            </Typography>

            <TableContainer component={Paper} sx={{ borderRadius: 5, boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.1)', maxWidth: '100%', border: 'solid black 2px', height:'600px' }}>
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
            {selectedUserId !== null && (
                <IconButton onClick={handleDelete} sx={{ mt: 2 }} color="error">
                    <DeleteIcon sx={{ fontSize: '3rem' }} />
                </IconButton>
            )}
        </div>
    );
}

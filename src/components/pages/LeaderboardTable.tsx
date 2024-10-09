import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"
import { getScores } from "../../api/getScores"
import { useEffect, useState } from "react";

type DB_Packet = {
    id: number
    name: string | null,
    score: number,
    location: string
}

export function LeaderboardTable() {
    const [scores, setScores] = useState<DB_Packet[]>([]);

    useEffect(() => {
        const fetchScores = async () => {
            const data = await getScores();
            setScores(data);
        };

        fetchScores();
    }, []);

    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
        }}>
            <Typography variant="h1" style={{ marginBottom: "30px", fontFamily: "'Indie Flower', cursive", fontWeight: "bold", fontSize: "8rem" }}>
                Leaderboard
            </Typography>

            {/* Table with custom styles */}
            <TableContainer component={Paper} sx={{ borderRadius: 5, boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.1)', maxWidth: '100%', border: 'solid black 2px', height:'600px' }}>
                <Table sx={{ minWidth: 800 }}>
                    <TableHead>
                        <TableRow sx={{ backgroundColor: '#F48FB1' }}>
                            {/* New Position Column */}
                            <TableCell align="center" sx={{ color: '#FFF', fontWeight: 'bold', fontSize: '1.5rem', fontFamily: "'Indie Flower', cursive"}}>Position</TableCell>
                            <TableCell align="center" sx={{ color: '#FFF', fontWeight: 'bold', fontSize: '2.5rem', fontFamily: "'Indie Flower', cursive" }}>Name</TableCell>
                            <TableCell align="center" sx={{ color: '#FFF', fontWeight: 'bold', fontSize: '2.5rem', fontFamily: "'Indie Flower', cursive" }}>Score</TableCell>
                            <TableCell align="center" sx={{ color: '#FFF', fontWeight: 'bold', fontSize: '2.5rem', fontFamily: "'Indie Flower', cursive" }}>Location</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {scores.map((row, index) => (
                            <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 }, '&:hover': { backgroundColor: '#FFCCBC' } }}>
                                {/* Display Position */}
                                <TableCell align="center" sx={{ fontSize: '3rem', color: '#D84315', fontFamily: "'Indie Flower', cursive" }}>#{index + 1}</TableCell>
                                <TableCell align="center" sx={{ fontSize: '2rem', color: '#D84315', fontFamily: "'Indie Flower', cursive"}}>{row.name}</TableCell>
                                <TableCell align="center" sx={{ fontSize: '2rem', color: '#D84315', fontFamily: "'Indie Flower', cursive" }}>{row.score}</TableCell>
                                <TableCell align="center" sx={{ fontSize: '2rem', color: '#D84315', fontFamily: "'Indie Flower', cursive" }}>{row.location}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

        </div>
    )

}

/**
CREATE TABLE users {
    name varachar(255)
    score BIGINT
    location VARCHAR(255)
}
 */
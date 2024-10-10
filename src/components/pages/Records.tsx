import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"
import { getRecords } from "../../api/getRecords";
import { useEffect, useState } from "react";

type Record = {
    id: number;
    score: number;
    difficulty: string;
    date: string; 
};

export function Records() {
    const [scores, setRecords] = useState<Record[]>([]);
    const [currentUser, setCurrentUser] = useState<string | null>(null);

    useEffect(() => {
        const savedUser = localStorage.getItem('currentUser');
        if (savedUser) {
          setCurrentUser(savedUser);
        }
      }, []);

    useEffect(() => {
        if (currentUser) {
            const fetchScores = async () => {
                const data = await getRecords(currentUser);
                setRecords(data);
            };
            fetchScores();
        }
    }, []);

    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
        }}>
            <Typography variant="h1" style={{ marginBottom: "30px", fontFamily: "'Indie Flower', cursive", fontWeight: "bold", fontSize: "8rem" }}>
                Your Games
            </Typography>

            {/* Table with custom styles */}
            <TableContainer component={Paper} sx={{ borderRadius: 5, boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.1)', maxWidth: '100%', border: 'solid black 2px', height:'600px' }}>
                <Table sx={{ minWidth: 800 }}>
                    <TableHead>
                        <TableRow sx={{ backgroundColor: '#F48FB1' }}>
                            {/* New Position Column */}
                            <TableCell align="center" sx={{ color: '#FFF', fontWeight: 'bold', fontSize: '2.5rem', fontFamily: "'Indie Flower', cursive" }}>Difficulty</TableCell>
                            <TableCell align="center" sx={{ color: '#FFF', fontWeight: 'bold', fontSize: '2.5rem', fontFamily: "'Indie Flower', cursive" }}>Score</TableCell>
                            <TableCell align="center" sx={{ color: '#FFF', fontWeight: 'bold', fontSize: '2.5rem', fontFamily: "'Indie Flower', cursive" }}>Date</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {scores.map((row) => (
                            <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 }, '&:hover': { backgroundColor: '#FFCCBC' } }}>
                                {/* Display Position */}
                                <TableCell align="center" sx={{ fontSize: '2rem', color: '#D84315', fontFamily: "'Indie Flower', cursive"}}>{row.difficulty}</TableCell>
                                <TableCell align="center" sx={{ fontSize: '2rem', color: '#D84315', fontFamily: "'Indie Flower', cursive" }}>{row.score}</TableCell>
                                <TableCell align="center" sx={{ fontSize: '2rem', color: '#D84315', fontFamily: "'Indie Flower', cursive" }}>{row.date}</TableCell>
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
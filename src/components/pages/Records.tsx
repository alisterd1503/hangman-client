import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"
import { getRecords } from "../../api/getRecords";
import { useEffect, useState } from "react";

type Record = {
    id: number,
    score: number,
    difficulty: string,
    date: string,
    word: string,
    result: boolean,
    guesses: number,
};

function formatDate(isoString: string | number | Date) {
    const date = new Date(isoString);

    // Extract components
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // getMonth() returns 0-based month
    const year = String(date.getFullYear()).slice(-2); // Get last 2 digits of the year
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    // Return formatted date as dd/mm/yy hr:min
    return `${day}/${month}/${year} ${hours}:${minutes}`;
}

export function Records() {
    const [records, setRecords] = useState<Record[]>([]);
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
    }, [currentUser]);

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
                            <TableCell align="center" sx={{ color: '#FFF', fontWeight: 'bold', fontSize: '2.5rem', fontFamily: "'Indie Flower', cursive" }}>Word</TableCell>
                            <TableCell align="center" sx={{ color: '#FFF', fontWeight: 'bold', fontSize: '2.5rem', fontFamily: "'Indie Flower', cursive" }}>Result</TableCell>
                            <TableCell align="center" sx={{ color: '#FFF', fontWeight: 'bold', fontSize: '2.5rem', fontFamily: "'Indie Flower', cursive" }}>Guesses</TableCell>
                            <TableCell align="center" sx={{ color: '#FFF', fontWeight: 'bold', fontSize: '2.5rem', fontFamily: "'Indie Flower', cursive" }}>Difficulty</TableCell>
                            <TableCell align="center" sx={{ color: '#FFF', fontWeight: 'bold', fontSize: '2.5rem', fontFamily: "'Indie Flower', cursive" }}>Score</TableCell>
                            <TableCell align="center" sx={{ color: '#FFF', fontWeight: 'bold', fontSize: '2.5rem', fontFamily: "'Indie Flower', cursive" }}>Date</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {records.map((row) => (
                            <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 }, '&:hover': { backgroundColor: '#FFCCBC' } }}>
                                {/* Display Position */}
                                <TableCell align="center" sx={{ fontSize: '2rem', color: '#D84315', fontFamily: "'Indie Flower', cursive"}}>{row.word}</TableCell>
                                <TableCell align="center" sx={{ fontSize: '2rem', color: '#D84315', fontFamily: "'Indie Flower', cursive"}}>{row.result ? 'won' : 'lost'}</TableCell>
                                <TableCell align="center" sx={{ fontSize: '2rem', color: '#D84315', fontFamily: "'Indie Flower', cursive"}}>{row.guesses}</TableCell>
                                <TableCell align="center" sx={{ fontSize: '2rem', color: '#D84315', fontFamily: "'Indie Flower', cursive"}}>{row.difficulty}</TableCell>
                                <TableCell align="center" sx={{ fontSize: '2rem', color: '#D84315', fontFamily: "'Indie Flower', cursive" }}>{row.score}</TableCell>
                                <TableCell align="center" sx={{ fontSize: '2rem', color: '#D84315', fontFamily: "'Indie Flower', cursive" }}>{formatDate(row.date)}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

        </div>
    )

}
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"
import { Record } from "../../models/Record";
import { formatDate } from "../../utils/formatDate";

const primaryColor = "#F0E5CF"
const thirdColor =  "#D1BB9E"

export function Records({ records }: { records: Record[] }) {
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
                        <TableRow sx={{ backgroundColor: thirdColor }}>
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
                            <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 }, '&:hover': { backgroundColor: primaryColor } }}>
                                {/* Display Position */}
                                <TableCell align="center" sx={{ fontSize: '2rem', fontFamily: "'Indie Flower', cursive"}}>{row.word}</TableCell>
                                <TableCell align="center" sx={{ fontSize: '2rem', fontFamily: "'Indie Flower', cursive"}}>{row.result ? 'won' : 'lost'}</TableCell>
                                <TableCell align="center" sx={{ fontSize: '2rem', fontFamily: "'Indie Flower', cursive"}}>{row.guesses}</TableCell>
                                <TableCell align="center" sx={{ fontSize: '2rem', fontFamily: "'Indie Flower', cursive"}}>{row.difficulty}</TableCell>
                                <TableCell align="center" sx={{ fontSize: '2rem', fontFamily: "'Indie Flower', cursive" }}>{row.score}</TableCell>
                                <TableCell align="center" sx={{ fontSize: '2rem', fontFamily: "'Indie Flower', cursive" }}>{formatDate(row.date)}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

        </div>
    )

}
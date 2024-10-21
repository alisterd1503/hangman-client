import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"
import { LeaderboardModel } from "../../models/LeaderboardModel"

const primaryColor = "#F0E5CF"
const thirdColor =  "#D1BB9E"

export function LeaderboardTable({ scores }: { scores: LeaderboardModel[] }) {
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
            <TableContainer component={Paper} sx={{ borderRadius: 5, boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.1)', maxWidth: '100%', border: 'solid black 2px', height:'600px', marginBottom: "60px" }}>
                <Table sx={{ minWidth: 800 }}>
                    <TableHead>
                        <TableRow sx={{ backgroundColor: thirdColor }}>
                            {/* New Position Column */}
                            <TableCell align="center" sx={{ color: '#FFF', fontWeight: 'bold', fontSize: '1.5rem', fontFamily: "'Indie Flower', cursive"}}>Position</TableCell>
                            <TableCell align="center" sx={{ color: '#FFF', fontWeight: 'bold', fontSize: '2.5rem', fontFamily: "'Indie Flower', cursive" }}>Name</TableCell>
                            <TableCell align="center" sx={{ color: '#FFF', fontWeight: 'bold', fontSize: '2.5rem', fontFamily: "'Indie Flower', cursive" }}>Score</TableCell>
                            <TableCell align="center" sx={{ color: '#FFF', fontWeight: 'bold', fontSize: '2.5rem', fontFamily: "'Indie Flower', cursive" }}>Location</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {scores.map((row, index) => (
                            <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 }, '&:hover': { backgroundColor: primaryColor } }}>
                                {/* Display Position */}
                                <TableCell align="center" sx={{ fontSize: '3rem', fontFamily: "'Indie Flower', cursive" }}>#{index + 1}</TableCell>
                                <TableCell align="center" sx={{ fontSize: '2rem', fontFamily: "'Indie Flower', cursive"}}>{row.username}</TableCell>
                                <TableCell align="center" sx={{ fontSize: '2rem', fontFamily: "'Indie Flower', cursive" }}>{row.score}</TableCell>
                                <TableCell align="center" sx={{ fontSize: '2rem', fontFamily: "'Indie Flower', cursive" }}>{row.location}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

        </div>
    )

}
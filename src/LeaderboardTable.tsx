import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"

const rows = [
    { id: 1, name: 'Alice', score: 120, country: 'United States' },
    { id: 2, name: 'Bob', score: 95, country: 'Canada' },
    { id: 3, name: 'Charlie', score: 150, country: 'United Kingdom' },
    { id: 4, name: 'Diana', score: 75, country: 'Australia' },
    { id: 5, name: 'Ethan', score: 200, country: 'Germany' },
    { id: 6, name: 'Fiona', score: 50, country: 'Japan' },
    { id: 7, name: 'George', score: 180, country: 'France' },
    { id: 8, name: 'Hannah', score: 90, country: 'Brazil' },
    { id: 9, name: 'Ivan', score: 110, country: 'Russia' },
    { id: 10, name: 'Julia', score: 160, country: 'Italy' }
  ];

export function LeaderboardTable() {

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
                    <TableCell align="center" sx={{ color: '#FFF', fontWeight: 'bold', fontSize: '1.5rem', fontFamily: "'Indie Flower', cursive" }}>Name</TableCell>
                    <TableCell align="center" sx={{ color: '#FFF', fontWeight: 'bold', fontSize: '1.5rem', fontFamily: "'Indie Flower', cursive" }}>Score</TableCell>
                    <TableCell align="center" sx={{ color: '#FFF', fontWeight: 'bold', fontSize: '1.5rem', fontFamily: "'Indie Flower', cursive" }}>Location</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                    <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 }, '&:hover': { backgroundColor: '#FFCCBC' } }}>
                        <TableCell align="center" sx={{ fontSize: '1.5rem', color: '#D84315', fontFamily: "'Indie Flower', cursive"}}>{row.name}</TableCell>
                        <TableCell align="center" sx={{ fontSize: '1.5rem', color: '#D84315', fontFamily: "'Indie Flower', cursive" }}>{row.score}</TableCell>
                        <TableCell align="center" sx={{ fontSize: '1.5rem', color: '#D84315', fontFamily: "'Indie Flower', cursive" }}>{row.country}</TableCell>
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
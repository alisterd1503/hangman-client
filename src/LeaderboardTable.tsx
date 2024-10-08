import { Typography } from "@mui/material"

export function LeaderboardTable() {

    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "60vh"
        }}>
            <Typography variant="h1" style={{ marginBottom: "40px", fontFamily: "'Indie Flower', cursive", fontWeight: "bold", fontSize: "8rem" }}>
                Leaderboard
            </Typography>
        </div>
    )

}
import { Typography } from "@mui/material";

export function Login() {
    
    const registerClicked = false

    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
        }}>
            {registerClicked ?
            ( 

            <Typography variant="h1" style={{ marginBottom: "30px", fontFamily: "'Indie Flower', cursive", fontWeight: "bold", fontSize: "8rem" }}>
            Register
            </Typography>
            
            )
            :
            (

            <Typography variant="h1" style={{ marginBottom: "30px", fontFamily: "'Indie Flower', cursive", fontWeight: "bold", fontSize: "8rem" }}>
                Login
            </Typography>

            )
            }
        </div>
    )
}
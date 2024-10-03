import { Button, Stack, TextField } from "@mui/material"

export function HangmanGuess() {
    return (
        <Stack direction="row" spacing={2}>
            <TextField id="outlined-basic" label="GUESS A WORD" variant="outlined" />
            <Button variant="contained">GUESS</Button>
        </Stack>
    )
}
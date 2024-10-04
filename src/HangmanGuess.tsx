import { Button, Stack } from "@mui/material"

const primaryColour = "#FF8343";
const secondaryColour = "#db6e37"

type HangmanGuessProps = {
    inputValue: string,
    handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
    handleKeyPress: (event: React.KeyboardEvent<HTMLInputElement>) => void,
    handleButtonClick: () => void,
    isWinner?: boolean,
}

export function HangmanGuess({
    inputValue,
    handleInputChange,
    handleKeyPress,
    handleButtonClick,
    isWinner,
}: HangmanGuessProps) {
    return (
        <Stack direction="row" spacing={2} justifyContent="center" alignItems="center">
        <input
          type="text"
          id="standard-basic"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyPress}
          placeholder="Guess a Word!"
          style={{
            width: '250px',
            height: '50px',
            padding: '5px',
            border: 'solid black 2px',
            borderRadius: '10px',
            paddingLeft: '15px',
            fontFamily: "Arial",
            fontSize: "1.8rem",
            fontWeight: "bold",
            textTransform: "uppercase",
          }}
          onFocus={(event) => {
            event.target.style.outline = `2px solid ${primaryColour}`; 
          }}
          onBlur={(event) => {
            event.target.style.outline = 'none';
          }}
        />
          <Button 
            variant="contained" 
            onClick={handleButtonClick}
            sx={{
              backgroundColor: isWinner ? "green" : primaryColour,
              padding: "10px 20px",
              fontSize: "1rem",
              borderRadius: "10px",
              height: "65px",
              fontFamily: "Arial",
              fontWeight: "bold",
              border: "solid black 2px",
              boxShadow: "0px 0px 0px",
              ':hover': {
                bgcolor: secondaryColour,
                color: 'white',
              },
            }}
          >
            GUESS
          </Button>
        </Stack>
    )
}
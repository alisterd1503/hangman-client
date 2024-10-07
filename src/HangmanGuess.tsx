import { Stack } from "@mui/material"
import './styles.css';

const primaryColour = "#FF8343";
const secondaryColour = "#db6e37"

type HangmanGuessProps = {
    inputValue: string,
    handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
    handleKeyPress: (event: React.KeyboardEvent<HTMLInputElement>) => void,
    handleButtonClick: () => void,
}

export function HangmanGuess({
    inputValue,
    handleInputChange,
    handleKeyPress,
    handleButtonClick,
}: HangmanGuessProps) {
    return (
        <Stack direction="row" spacing={2} justifyContent="center" alignItems="flex-end">
        <input
          type="text"
          id="standard-basic"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyPress}
          placeholder="Guess a Word"
          autoComplete="off"
          style={{
            width: '250px',
            height: '50px',
            border: 'none',
            borderBottom: '2px solid black',
            fontFamily: "'Indie Flower', cursive",
            fontSize: "2rem",
            fontWeight: "bold",
            textTransform: "uppercase",
            background: 'none',
            textAlign: 'center'
          }}
          onFocus={(event) => {
            event.target.style.outline = `none`;
            event.target.style.borderBottom = `2px solid ${primaryColour}`;
            event.target.placeholder = '';
          }}
          onBlur={(event) => {
            event.target.style.borderBottom = '2px solid black';
            event.target.placeholder = 'Guess a Word';
          }}
        />
          <span 
                onClick={handleButtonClick}
                style={{
                  display: "inline-block",
                  fontSize: "4rem",
                  height: "65px",
                  fontFamily: "'Indie Flower', cursive",
                  cursor: "pointer",
                  transition: "transform 0.3s, background-color 0.3s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = secondaryColour,
                  e.currentTarget.style.transform = 'scale(1.1)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '',
                  e.currentTarget.style.transform = 'scale(1)'
                }}
                >
              GUESS
            </span>
        </Stack>
    )
}
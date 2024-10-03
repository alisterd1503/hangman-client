import { SetStateAction, useCallback, useEffect, useState } from "react"
import { HangmanDrawing } from "./HangmanDrawing"
import { HangmanWord } from "./HangmanWord"
import { Keyboard } from "./Keyboard"
import words from "./wordList.json"
import Confetti from 'react-confetti'
import { Button, Stack, TextField } from "@mui/material"
import './styles.css';

const HEIGHT = 800;
const WIDTH = 1200;
const primaryColour = "#b3510b";

function getWord() {
  return words[Math.floor(Math.random() * words.length)]
}

function App() {
  let playAgain = ''
  const [chosenWord, setChosenWord] = useState(() => getWord())
  const [guessedLetters, setGuessedLetters] = useState<string[]>([])

  const incorrectLetters = guessedLetters.filter(guess => {
    // single character guess
    if (guess.length === 1) {
      return !chosenWord.includes(guess);
    }
    // whole word guess
    return guess !== chosenWord;
  });

  const isLoser = incorrectLetters.length >= 6

  const isWinner = guessedLetters.includes(chosenWord) || chosenWord
  .split("")
  .every((letter: string) => guessedLetters.includes(letter));

  const addGuessedLetter = useCallback((letter: string) => {
    if (guessedLetters.includes(letter) || isLoser || isWinner) {
      return
    }
    setGuessedLetters(currentLetters => [...currentLetters, letter])
  }, [guessedLetters, isLoser, isWinner])


  // USE KEYBOARD TO ENTER LETTERS
  // useEffect(() => {
  //   const handler = (e: KeyboardEvent) => {
  //     const key = e.key

  //     if (!key.match(/^[a-z]$/)) {
  //       return
  //     }

  //     e.preventDefault()
  //     addGuessedLetter(key)
  //   }

  //   document.addEventListener("keypress", handler)

  //   return () => {
  //     document.removeEventListener("keypress", handler)
  //   }
  // },[guessedLetters])


  // RESET GAME WHEN ENTER IS PRESSED
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key

      if (key !== " ") {
        return
      }

      e.preventDefault()
      if (isWinner || isLoser) {
        setGuessedLetters([]);
        setChosenWord(getWord());
      }
    }
    document.addEventListener("keypress", handler)

    return () => {
      document.removeEventListener("keypress", handler)
    }
  },[])

  isWinner != isLoser ? playAgain = "PRESS SPACE TO PLAY AGAIN" : ""

  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event: { target: { value: SetStateAction<string> } }) => {
    setInputValue(event.target.value);
  };
  
  const handleButtonClick = () => {
    if (inputValue.trim() === "") {
      return;
    }
    addGuessedLetter(inputValue);
    setInputValue("")
  };

  const handleKeyPress = (event: { key: string }) => {
    if (event.key === 'Enter') {
      handleButtonClick();
    }
  };

  return (
    <div className={`main ${isWinner ? 'winner' : isLoser ? 'loser' : ''}`} style={{
      backgroundColor: isWinner != isLoser ? (isWinner ? "#9ADE7B" : "#FF8F8F") : "white",
      maxWidth: `${WIDTH}px`
    }}>
      {isWinner && <Confetti width={WIDTH} height={HEIGHT}/>}
  
      {/* Displays winner loser message */}
      <div className="message" style={{
        color: isWinner != isLoser ? (isWinner ? "green" : "red") : "black",
      }}>
        {isWinner == isLoser && "GUESS THE WORD!"}
        {isWinner && "WINNER!"}
        {isLoser && "LOSER!"}
        <div className="play-again">
          {playAgain}
        </div>
      </div>
  
      {/* Displays the stand and body */}
      <div className="drawing">
        <HangmanDrawing numOfGuesses={incorrectLetters.length} />
      </div>
  
      {/* Displays the dashes and letters */}
      <div className="dashed-words">
        <HangmanWord reveal={isLoser} guessedLetters={guessedLetters} chosenWord={chosenWord} />
      </div>
  
      {/* Displays the guessed letters */}
      <div className="guessed-letters">
        {incorrectLetters.map((letter, index) => (
          <span key={index} style={{ textDecoration: 'line-through', marginRight: '0.5rem' }}>
            {letter}
          </span>
        ))}
      </div>
  
      {/* Displays the keyboard */}
      <div className="keyboard">
        <Keyboard 
          disabled={isWinner || isLoser}
          activeLetters={guessedLetters.filter(letter => chosenWord.includes(letter))}
          inactiveLetters={incorrectLetters}
          addGuessedLetter={addGuessedLetter}
        />
      </div>
  
      {/* Displays the text line and guess button */}
      <div className="guess-words">
        <Stack direction="row" spacing={2} justifyContent="center" alignItems="center">
          <TextField
            id="outlined-basic"
            variant="outlined"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyPress}
            placeholder="Guess a Word!"
            sx={{
              width: '250px',
              height: '55px',
              border: 'solid black 2px',
              borderRadius: '10px',
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
              height: "55px",
              border: "solid black 2px",
              ':hover': {
                bgcolor: '#b3510b',
                color: 'white',
              },
            }}
          >
            GUESS
          </Button>
        </Stack>
      </div>
    </div>
  );  
}

export default App

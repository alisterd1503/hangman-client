import { SetStateAction, useCallback, useState } from "react"
import { HangmanDrawing } from "./HangmanDrawing"
import { HangmanWord } from "./HangmanWord"
import { Keyboard } from "./Keyboard"
import { HangmanGuess } from "./HangmanGuess"
import words from "./wordList.json"
import Confetti from 'react-confetti'
import './styles.css';
import { Button } from "@mui/material"

const HEIGHT = 800;
const WIDTH = 1200;
const regex = /^[a-zA-Z]+$/;

// Function that returns a random word from the words list
function getWord() {
  return words[Math.floor(Math.random() * words.length)]
}

function App() {
  const [chosenWord, setChosenWord] = useState(() => getWord())
  const [userGuesses, setUserGuesses] = useState<string[]>([])
  const [inputValue, setInputValue] = useState('');

  // Adding incorrect guesses to an array
  const incorrectGuesses = userGuesses.filter(guess => {
    if (guess.length === 1) {
      return !chosenWord.includes(guess);
    }
    return guess !== chosenWord;
  });

  // Variable to track if player lost
  const isLoser = incorrectGuesses.length >= 10

   // Variable to track if player won
  const isWinner = userGuesses.includes(chosenWord) || chosenWord
  .split("")
  .every((letter: string) => userGuesses.includes(letter));

  // Funcition that adds users guesses to userGuesses array
  const addUserGuess = useCallback((letter: string) => {
    if (userGuesses.includes(letter) || isLoser || isWinner) {
      return
    }
    setUserGuesses(currentLetters => [...currentLetters, letter])
  }, [userGuesses, isLoser, isWinner])

  // Funciton to reset the game
  const resetGame = () => {
    setUserGuesses([]);
    setChosenWord(getWord());
  };

  // Function that updates the inputValue variable
  const handleInputChange = (event: { target: { value: SetStateAction<string> } }) => {
    setInputValue(event.target.value);
  };
  
  // Function that adds the inputValue to useGuesses array
  const handleButtonClick = () => {
    if (inputValue.trim() === "" || !(regex.test(inputValue))) {
      setInputValue("")
      return;
    }
    addUserGuess(inputValue);
    setInputValue("")
  };

  // Allows users to press enter instead of clicking button
  const handleKeyPress = (event: { key: string }) => {
    if (event.key === 'Enter') {
      handleButtonClick();
    }
  };

  return (
    <div className="main" style={{maxWidth: `${WIDTH}px`}}>

      {/* Displays confetti if the user wins */}
      {isWinner && <Confetti width={WIDTH} height={HEIGHT}/>}
  
      {/* Displays winner loser message */}
      <div className="message" style={{
        color: isWinner != isLoser ? (isWinner ? "green" : "red") : "black",
      }}>
        {isWinner == isLoser && "GUESS THE WORD!"}
        {isWinner && "WINNER!"}
        {isLoser && "LOSER!"}
      </div>
  
      {/* Displays the stand and body */}
      <div className="drawing">
        <HangmanDrawing numOfGuesses={incorrectGuesses.length} />
      </div>
  
      {/* Displays the dashes and letters */}
      <div className="dashed-words">
        <HangmanWord reveal={isLoser || isWinner} userGuesses={userGuesses} chosenWord={chosenWord} isWinner={isWinner}/>
      </div>
  
      {/* Displays the guessed letters */}
      <div className="guessed-letters">
        {incorrectGuesses.map((letter, index) => (
          <span key={index} style={{ textDecoration: 'line-through', marginRight: '0.5rem' }}>
            {letter}
          </span>
        ))}
      </div>
  
      {/* Displays the keyboard */}
      <div className="keyboard">
        <Keyboard 
          disabled={isWinner || isLoser}
          activeLetters={userGuesses.filter(letter => chosenWord.includes(letter))}
          inactiveLetters={incorrectGuesses}
          addUserGuess={addUserGuess}
        />
      </div>
  
      {/* Displays the guess word input field or reset button */}
      <div className="guess-words">
        {isLoser || isWinner ?  
          <Button 
            variant="contained" 
            onClick={resetGame}
            sx={{
              backgroundColor: "green",
              padding: "10px 20px",
              fontSize: "1rem",
              borderRadius: "10px",
              height: "65px",
              fontFamily: "Arial",
              fontWeight: "bold",
              border: "solid black 2px",
              ':hover': {
                bgcolor: "darkgreen",
                color: 'white',
              },
              boxShadow: "0px 0px 0px",
            }}
          >
            PlAY AGAIN
          </Button>
          :
          <HangmanGuess 
            inputValue={inputValue} 
            handleInputChange={handleInputChange} 
            handleKeyPress={handleKeyPress} 
            handleButtonClick={handleButtonClick} 
            isWinner={isWinner} 
          />
        }
      </div>
    </div>
  );  
}

export default App

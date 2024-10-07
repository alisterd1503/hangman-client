import './styles.css';

import { SetStateAction, useCallback, useState } from "react"
import { HangmanDrawing } from "./HangmanDrawing"
import { HangmanWord } from "./HangmanWord"
import { Keyboard } from "./Keyboard"
import { HangmanGuess } from "./HangmanGuess"
import { StartScreen } from "./StartScreen"

import words from "./wordList.json"
import Confetti from 'react-confetti'
import homeIcon from './images/home.png';

const regex = /^[a-zA-Z]+$/;

const options = ['easy','medium','hard']

// Function that returns a random word from the words list
function getWord(difficulty: string) {
  let word;
  do {
    word = words[Math.floor(Math.random() * words.length)];

    if (difficulty === 'easy' && word.length === 4) {
      return word;
    } else if (difficulty === 'medium' && (word.length === 5 || word.length === 6)) {
      return word;
    } else if (difficulty === 'hard' && word.length > 6) {
      return word;
    } else if (!options.includes(difficulty)) {
      return word;
    }

  } while (true);
}

function App() {
  const [difficulty, setDifficulty] = useState<string | null>(null);
  const [chosenWord, setChosenWord] = useState<string | null>(null);
  const [userGuesses, setUserGuesses] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isGameStarted, setIsGameStarted] = useState(false);

  // Function to get incorrect guesses
  const getIncorrectGuesses = () => {
      return userGuesses.filter(guess => {
          if (guess.length === 1) {
              return !chosenWord!.includes(guess);
          }
          return guess !== chosenWord;
      });
  };

  // Function to start the game
  const handleStartGame = () => {
      setIsGameStarted(true);
      setChosenWord(getWord(difficulty!));
  };

  // Variable to track incorrect guesses
  const incorrectGuesses = getIncorrectGuesses();

  // Variable to track if player lost
  const isLoser = incorrectGuesses.length >= 10;

  // Variable to track if player won
  const isWinner = chosenWord && (userGuesses.includes(chosenWord) || chosenWord
      .split("")
      .every((letter: string) => userGuesses.includes(letter)));

  // Adding users guesses to an array
  const addUserGuess = useCallback((letter: string) => {
      if (userGuesses.includes(letter) || isLoser || isWinner) {
          return;
      }
      setUserGuesses(currentLetters => [...currentLetters, letter]);
  }, [userGuesses, isLoser, isWinner]);

  // Function to reset all variables and game
  const resetGame = () => {
      setUserGuesses([]);
      setChosenWord(getWord(difficulty!));
      setInputValue('');
  };

  const handleInputChange = (event: { target: { value: SetStateAction<string> } }) => {
      setInputValue(event.target.value);
  };

  // Sets the input value when the submit button is clicked
  const handleButtonClick = () => {
      if (inputValue.trim() === "" || !(regex.test(inputValue))) {
          setInputValue("");
          return;
      }
      addUserGuess(inputValue);
      setInputValue("");
  };

  // User can press enter to submit the input
  const handleKeyPress = (event: { key: string }) => {
      if (event.key === 'Enter') {
          handleButtonClick();
      }
  };

  // Reset all relevant states when returning to the home screen
  const homeScreen = () => {
      setUserGuesses([]);
      setChosenWord(null);
      setInputValue('');
      setDifficulty(null);
      setIsGameStarted(false);
  };

  return (
      <div className="main">
          {!isGameStarted ? (
              <StartScreen
                    onStart={handleStartGame}
                    onDifficultySelect={setDifficulty}
              />
          ) : (
              <>
                  {/* Home screen button */}
                  <div>
                      <img
                          src={homeIcon}
                          alt="Home"
                          onClick={homeScreen}
                          style={{
                              position: 'absolute',
                              bottom: '40px',
                              left: '20px',
                              width: '80px',
                              height: '80px',
                              cursor: 'pointer',
                              transition: 'transform 0.3s, opacity 0.3s',
                          }}
                          onMouseEnter={(e) => {
                              e.currentTarget.style.transform = 'scale(1.1)';
                              e.currentTarget.style.opacity = '0.8';
                          }}
                          onMouseLeave={(e) => {
                              e.currentTarget.style.transform = 'scale(1)';
                              e.currentTarget.style.opacity = '1';
                          }}
                      />
                  </div>

                  {/* Displays confetti */}
                  {isWinner && (
                      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
                          <Confetti width={window.outerWidth} height={window.outerHeight} />
                      </div>
                  )}
                  
                  {/* Displays header tite */}
                  <div className="message" style={{
                      color: isWinner !== isLoser ? (isWinner ? "green" : "red") : "black",
                  }}>
                      {isWinner === isLoser && "GUESS THE WORD!"}
                      {isWinner && "WINNER!"}
                      {isLoser && "LOSER!"}
                  </div>

                  {/* Displays the hangman image */}
                  <div className="drawing">
                      <HangmanDrawing numOfGuesses={incorrectGuesses.length} />
                  </div>

                  {/* Displays the correct guessed letters and dashes */}
                  <div className="dashed-words">
                      <HangmanWord
                          reveal={isLoser || isWinner ? true : false}
                          userGuesses={userGuesses}
                          chosenWord={chosenWord ?? ''}
                          isWinner={!!isWinner}
                      />
                  </div>

                  {/* Displays the incorrect guessed letters */}
                  <div className="guessed-letters">
                      {incorrectGuesses.map((letter, index) => (
                          <span key={index} style={{ marginRight: '1rem' }}>
                              {letter}
                          </span>
                      ))}
                  </div>
                  
                  {/* Displays the keyboard */}
                  <div className="keyboard">
                      <Keyboard
                          disabled={isWinner || isLoser}
                          activeLetters={userGuesses.filter(letter => chosenWord!.includes(letter))}
                          inactiveLetters={incorrectGuesses}
                          addUserGuess={addUserGuess}
                      />
                  </div>

                  {/* Displays the guess input field    */}
                  <div className="guess-words">
                      {isLoser || isWinner ?
                          <span
                              onClick={resetGame}
                              style={{
                                  display: "inline-block",
                                  color: "green",
                                  fontSize: "4rem",
                                  height: "65px",
                                  fontFamily: "'Indie Flower', cursive",
                                  fontWeight: "bold",
                                  cursor: "pointer",
                                  transition: "transform 0.3s, background-color 0.3s",
                              }}
                              onMouseEnter={(e) => {
                                  e.currentTarget.style.color = 'darkgreen';
                                  e.currentTarget.style.transform = 'scale(1.1)';
                              }}
                              onMouseLeave={(e) => {
                                  e.currentTarget.style.color = 'green';
                                  e.currentTarget.style.transform = 'scale(1)';
                              }}
                          >
                              PLAY AGAIN
                          </span>
                          :
                          <HangmanGuess
                              inputValue={inputValue}
                              handleInputChange={handleInputChange}
                              handleKeyPress={handleKeyPress}
                              handleButtonClick={handleButtonClick}
                          />
                      }
                  </div>
              </>
          )}
      </div>
  );
}

export default App;

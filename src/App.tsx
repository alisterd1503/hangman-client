import './styles.css';

import { SetStateAction, useCallback, useEffect, useState } from "react"
import { HangmanDrawing } from "./HangmanDrawing"
import { HangmanWord } from "./HangmanWord"
import { Keyboard } from "./Keyboard"
import { HangmanGuess } from "./HangmanGuess"
import { StartScreen } from "./StartScreen"
import { Settings } from './Settings';
import { HomeIcon } from './HomeIcon';
import { SettingsIcon } from './SettingsIcon';
import { Points } from './Points';
import { PlayAgain } from './PlayAgain';
import { BgMusic } from './BgMusic';
import { WrongGuesses } from './WrongGuesses';
import { LeaderboardIcon } from './LeaderboardIcon';
import { LeaderboardTable } from './LeaderboardTable';

import words from "./wordList.json"
import Confetti from 'react-confetti'

/** 

Easy: 10 points for each correct letter.
Medium: 15 points for each correct letter.
Hard: 20 points for each correct letter.

Easy: -2 points for each incorrect guess.
Medium: -5 points for each incorrect guess.
Hard: -8 points for each incorrect guess.

Easy: No multiplier (1x).
Medium: 1.5x multiplier.
Hard: 2x multiplier.

Easy: 30 points.
Medium: 50 points.
Hard: 100 points.


**/

const regex = /^[a-zA-Z]+$/;
const options = ['easy','medium','hard']

// Import the moment-timezone library
import moment from 'moment-timezone';

/**
 * Get the user's country based on their time zone.
 * @param {string} userTimeZone - The user's time zone.
 * @returns {string} The user's country or the original time zone if not found.
 */
function getCountryByTimeZone(userTimeZone: string): string {
  // Get a list of countries from moment-timezone
  const countries: string[] = moment.tz.countries();

  // Iterate through the countries and check if the time zone is associated with any country
  for (const country of countries) {
    const timeZones: string[] = moment.tz.zonesForCountry(country);

    if (timeZones.includes(userTimeZone)) {
      // Use Intl.DisplayNames to get the full country name
      const countryName = new Intl.DisplayNames(['en'], { type: 'region' }).of(country);
      return countryName as string; // Type assertion since DisplayNames.of can return undefined
    }
  }

  // Return the original time zone if no matching country is found
  return userTimeZone;
}

const userTimeZone: string = Intl.DateTimeFormat().resolvedOptions().timeZone;
const userCountry: string = getCountryByTimeZone(userTimeZone);

console.log(userCountry)

// Function that returns a random word from the words list
function getWord(difficulty: string) {
    let word;
    do {
      word = words[Math.floor(Math.random() * words.length)];
      if (difficulty === 'easy' && word.length === 4) return word;
      else if (difficulty === 'medium' && (word.length === 5 || word.length === 6)) return word;
      else if (difficulty === 'hard' && word.length > 6) return word;
      else if (!options.includes(difficulty)) return word;
    } while (true);
  }

function App() {
  const [difficulty, setDifficulty] = useState<string | null>(null);
  const [chosenWord, setChosenWord] = useState<string | null>(null);
  const [userGuesses, setUserGuesses] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [usersPoints, setUsersPoints] = useState(0);
  const [settingsClicked, setSettingsClicked] = useState(false);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [volume, setVolume] = useState(0.5)
  const [mute, setMute] = useState(true)

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
      setUsersPoints(0);
  };

  // Variable to track incorrect guesses
  const incorrectGuesses = getIncorrectGuesses();

  // Variable to track if player lost
  const isLoser = incorrectGuesses.length >= 10;

  // Variable to track if player won
  const isWinner = chosenWord && (userGuesses.includes(chosenWord) || chosenWord
      .split("")
      .every((letter: string) => userGuesses.includes(letter)))

  // Adding users guesses to an array
  const addUserGuess = useCallback((letter: string) => {
    if (userGuesses.includes(letter) || isLoser || isWinner) {
      return;
    }
    setUserGuesses(currentLetters => {
      const newGuesses = [...currentLetters, letter];

      // Increment correct points if the guess is correct
      if ((chosenWord!.includes(letter) && letter.length === 1) 
        || chosenWord && userGuesses.includes(chosenWord)) {
        if (difficulty === 'easy') {
            setUsersPoints(prev => prev + 5);
        } else if (difficulty === 'hard') {
            setUsersPoints(prev => prev + 10);
        } else {
            setUsersPoints(prev => prev + 7.5);
        }
      } 
      return newGuesses;
    });
  }, [userGuesses, isLoser, isWinner, chosenWord]);

  // Function to reset all variables and game
  const resetGame = () => {
      setUserGuesses([]);
      setChosenWord(getWord(difficulty!));
      setInputValue('');
      setUsersPoints(0);
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
      addUserGuess(inputValue.toLowerCase());
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
      setSettingsClicked(false)
      setShowLeaderboard(false)
      setUserGuesses([]);
      setChosenWord(null);
      setInputValue('');
      setDifficulty(null);
      setIsGameStarted(false);
  };
  
  const settingsScreen = () => {
    setSettingsClicked(true);
  }

  const LeaderboardScreen = () => {
    setShowLeaderboard(true);
  }

  useEffect(() => {
    if (isWinner) {
        if (difficulty === 'easy') {
            setUsersPoints(prev => prev + 20);
        } else if (difficulty === 'hard') {
            setUsersPoints(prev => prev + 40);
        } else {
            setUsersPoints(prev => prev + 50);
        }
    } else if (isLoser) {
        if (difficulty === 'easy') {
            setUsersPoints(prev => prev - 10);
        } else if (difficulty === 'hard') {
            setUsersPoints(prev => prev - 20);
        } else {
            setUsersPoints(prev => prev - 15);
        }
    }
    }, [isWinner, isLoser, difficulty]);


    return (
      <div className="main">
        <BgMusic volume={volume} mute={mute}/>
        {/* Conditional rendering for LeaderboardTable */}
        {showLeaderboard ? (
          <>
            <LeaderboardTable />
            <HomeIcon homeScreen={homeScreen} />
          </>          
        ) : settingsClicked ? (
          <>
            <Settings volume={volume} mute={mute} setVolume={setVolume} setMute={setMute} />
            <HomeIcon homeScreen={homeScreen} />
          </>
        ) : !isGameStarted ? (
          <>
            <StartScreen onStart={handleStartGame} onDifficultySelect={setDifficulty} />
            <SettingsIcon settingsScreen={settingsScreen} />
            <LeaderboardIcon LeaderboardScreen={LeaderboardScreen} />
          </>
        ) : (
          <>
            {/* Home screen button */}
            <SettingsIcon settingsScreen={settingsScreen} />
            <HomeIcon homeScreen={homeScreen} />
            <Points usersPoints={usersPoints} />
    
            {/* Displays confetti */}
            {isWinner && (
              <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
                <Confetti width={window.outerWidth} height={window.outerHeight} />
              </div>
            )}
    
            {/* Displays header title */}
            <div className="message"
              style={{
                color: isWinner !== isLoser ? (isWinner ? 'green' : 'red') : 'black',
              }}
            >
              {isWinner === isLoser && 'GUESS THE WORD!'}
              {isWinner && 'WINNER!'}
              {isLoser && 'LOSER!'}
            </div>
    
            {/* Displays the hangman image */}
            <div className="drawing">
              <HangmanDrawing numOfGuesses={incorrectGuesses.length} />
            </div>
            {chosenWord}
    
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
            <WrongGuesses incorrectGuesses={incorrectGuesses} />
    
            {/* Displays the keyboard */}
            <div className="keyboard">
              <Keyboard
                disabled={isWinner || isLoser}
                activeLetters={userGuesses.filter((letter) => chosenWord!.includes(letter))}
                inactiveLetters={incorrectGuesses}
                addUserGuess={addUserGuess}
              />
            </div>
    
            {/* Displays the guess input field */}
            <div className="guess-words">
              {isLoser || isWinner ? (
                <PlayAgain resetGame={resetGame} />
              ) : (
                <HangmanGuess
                  inputValue={inputValue}
                  handleInputChange={handleInputChange}
                  handleKeyPress={handleKeyPress}
                  handleButtonClick={handleButtonClick}
                />
              )}
            </div>
          </>
        )}
      </div>
    );
    
      
}

export default App;

import { SetStateAction, useCallback, useEffect, useState } from "react"
import Confetti from 'react-confetti'

import './styles.css';

//Hangman//
import { HangmanDrawing } from "./HangmanDrawing"
import { HangmanWord } from "./HangmanWord"
import { HangmanGuess } from "./HangmanGuess"
import { WrongGuesses } from './WrongGuesses';
import { Keyboard } from "./Keyboard"
import { Points } from './Points';
import { PlayAgain } from './PlayAgain';

//Pages//
import { Settings } from './Settings';
import { LeaderboardTable } from './LeaderboardTable';
import { StartScreen } from "./StartScreen"

//Icons//
import { HomeIcon } from './HomeIcon';
import { SettingsIcon } from './SettingsIcon';
import { LeaderboardIcon } from './LeaderboardIcon';

//Background//
import { BgMusic } from './BgMusic';

//Functions//
import { getCountryByTimeZone } from './getLocation.tsx';
import { getWord } from './getWord.tsx';

//Models//
import { Packet } from './Packet.tsx'

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

const userCountry: string = getCountryByTimeZone();

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
  const [usersName, setUsersName] = useState<string | null>(null);

  const sendPacket = () => {
    const body: Packet = {
      name: usersName,
      score: usersPoints,
      location: userCountry
    } 
  }

  const handleNameSubmit = (name: string) => {
    setUsersName(name);
  };

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
            setUsersPoints(prev => prev + 10);
        } else if (difficulty === 'hard') {
            setUsersPoints(prev => prev + 20);
        } else {
            setUsersPoints(prev => prev + 15);
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
      sendPacket()
      setSettingsClicked(false)
      setShowLeaderboard(false)
      setUserGuesses([]);
      setChosenWord(null);
      setInputValue('');
      setDifficulty(null);
      setIsGameStarted(false);
      setUsersName('')
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
            <StartScreen onStart={handleStartGame} onDifficultySelect={setDifficulty} handleNameSubmit={handleNameSubmit} />
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
                <Confetti width={window.outerWidth} height={window.outerHeight} recycle={false} />
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
              <HangmanDrawing numOfGuesses={incorrectGuesses.length} isWinner={!!isWinner}/>
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
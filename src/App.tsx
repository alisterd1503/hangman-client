import { SetStateAction, useCallback, useEffect, useState } from "react"
import Confetti from 'react-confetti'
import { jwtDecode } from "jwt-decode"

import './styles.css';

//Hangman//
import { HangmanDrawing } from "./components/hangman/HangmanDrawing.tsx"
import { HangmanWord } from "./components/hangman/HangmanWord"
import { HangmanGuess } from "./components/hangman/HangmanGuess"
import { WrongGuesses } from './components/hangman/WrongGuesses';
import { Keyboard } from "./components/hangman/Keyboard"
import { Points } from './components/hangman/Points';
import { PlayAgain } from './components/hangman/PlayAgain';

//Pages//
import { Settings } from './components/pages/Settings';
import { LeaderboardTable } from './components/pages/LeaderboardTable';
import { StartScreen } from "./components/pages/StartScreen"
import { Login } from "./components/pages/Login.tsx";
import { RegisterPage } from "./components/pages/RegisterPage.tsx";
import { Records } from "./components/pages/Records.tsx";

//Icons//
import { HomeIcon } from './components/icons/HomeIcon';
import { SettingsIcon } from './components/icons/SettingsIcon';
import { LeaderboardIcon } from './components/icons/LeaderboardIcon';
import { LoginIcon } from "./components/icons/LoginIcon.tsx";
import { RegisterIcon } from "./components/icons/RegisterIcon.tsx";
import { LogoutIcon } from "./components/icons/LogoutIcon.tsx";
import { RecordsIcon } from "./components/icons/RecordsIcon.tsx";
import { AdminIcon } from "./components/icons/AdminIcon.tsx";
import { RulesIcon } from "./components/icons/RulesIcon.tsx";

//SOUNDS//
import { play } from './components/sounds/generalSFX.ts'
import { BgMusic } from './components/sounds/BgMusic.tsx';
import correct from './sounds/correct.mp3'
import wrong from './sounds/wrong.mp3'
import won from './sounds/win.mp3'
import lost from './sounds/lost.mp3'

//Functions//
import { getWord } from './components/functions/getWord.ts';

//API CALLS//
import { addScore } from "./api/addScore.ts";
import { Typography } from "@mui/material";

//MODELS//
import { Game } from "./models/Game.ts";
import { Admin } from "./components/pages/Admin.tsx";
import { Rules } from "./components/pages/Rules.tsx";

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

type Page = 'home' | 'settings' | 'leaderboard' | 'login' | 'game' | 'register' | 'records' | 'admin' | 'rules';

function App() {
  const [difficulty, setDifficulty] = useState<string | null>(null);
  const [chosenWord, setChosenWord] = useState<string | null>(null);
  const [userGuesses, setUserGuesses] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [usersPoints, setUsersPoints] = useState(0);
  const [volume, setVolume] = useState(0.5)
  const [mute, setMute] = useState(true)
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [result , setResult] = useState(false)
  const [gameOver, setGameOver] = useState(false)

  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);

  const sendPacket = async () => {
    if (currentUser && difficulty && chosenWord) {
      const body: Game = {
        score: usersPoints,
        difficulty: difficulty,
        word: chosenWord,
        result: result,
        guesses: userGuesses.length
      }
      await addScore(body)
    }
  }

  const navigateTo = (page: Page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
        const decodedToken = jwtDecode<{ username: string, role: string }>(token);
        setCurrentUser(decodedToken.username);
        setUserRole(decodedToken.role);
    }
  }, []);

  const navigateToHome = () => {
    navigateTo('home');
    window.location.href = window.location.href;
  };

  const navigateToLogin = () => {
    navigateTo('login');
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
          play(correct)
        if (difficulty === 'easy') {
            setUsersPoints(prev => prev + 10);
        } else if (difficulty === 'hard') {
            setUsersPoints(prev => prev + 20);
        } else {
            setUsersPoints(prev => prev + 15);
        }
      } else {
        play(wrong)
      }
      return newGuesses;
    });
  }, [userGuesses, isLoser, isWinner, chosenWord]);

  // Resets game when play again button pressed
  const resetGame = () => {
      if (currentUser) {sendPacket()}
      setUserGuesses([]);
      setChosenWord(getWord(difficulty!));
      setInputValue('');
      setGameOver(false)
      setUsersPoints(0)
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

  // Resets game if the user clicks on the home screen
  const stopGame = () => {
    if (gameOver) {sendPacket()}
    setUserGuesses([]);
    setChosenWord(null);
    setInputValue('');
    setDifficulty(null);
    setGameOver(false)
    navigateTo('home')
  };

  useEffect(() => {
    if (isWinner) {
      play(won)
        setResult(true)
        setGameOver(true)
        if (difficulty === 'easy') {
            setUsersPoints(prev => prev + 20);
        } else if (difficulty === 'hard') {
            setUsersPoints(prev => prev + 40);
        } else {
            setUsersPoints(prev => prev + 50);
        }
    } else if (isLoser) {
      play(lost)
        setGameOver(true)
        if (difficulty === 'easy') {
            setUsersPoints(prev => prev - 10);
        } else if (difficulty === 'hard') {
            setUsersPoints(prev => prev - 20);
        } else {
            setUsersPoints(prev => prev - 15);
        }

    }
    }, [isWinner, isLoser, difficulty]);

    const renderPage = () => {
      switch (currentPage) {
        case 'home':
          return (
            <>
              <StartScreen
                onStart={() => { handleStartGame(); navigateTo('game'); }} 
                onDifficultySelect={setDifficulty}
              />
              <SettingsIcon settingsScreen={() => navigateTo('settings')} />
              <LeaderboardIcon LeaderboardScreen={() => navigateTo('leaderboard')} />
              <RulesIcon rulesScreen={() => navigateTo('rules')} />
    
              {userRole === 'admin' && <AdminIcon AdminScreen={() => navigateTo('admin')} />}

              <div style={{height: '50px'}}>
                {currentUser ? 
                (<> 
                  <Typography
                    style={{ 
                        fontFamily: "'Indie Flower',cursive",
                        fontWeight: "bold",
                        fontSize: "2rem",
                    }}>Welcome, {currentUser}! Ready to play?
                  </Typography>
                  <LogoutIcon/>
                  <RecordsIcon RecordsScreen={() => navigateTo('records')} />
                </>) 
                : 
                (<LoginIcon LoginScreen={() => navigateTo('login')} />)}
              </div>
            </>
          );
        case 'settings':
          return (
            <>
              <Settings 
                volume={volume} 
                mute={mute} 
                setVolume={setVolume} 
                setMute={setMute} 
                navigateToLogin={navigateToLogin}
              />
              <HomeIcon homeScreen={() => navigateTo('home')} />
            </>
          );
        case 'leaderboard':
          return (
            <>
              <LeaderboardTable />
              <HomeIcon homeScreen={() => navigateTo('home')} />
            </>
          );
        case 'records':
          return (
            <>
              <Records />
              <HomeIcon homeScreen={() => navigateTo('home')} />
            </>
          );
        case 'rules':
            return (
              <>
                <Rules />
                <HomeIcon homeScreen={() => navigateTo('home')} />
              </>
            );
        case 'login':
          return (
            <>
              <Login navigateToHome={navigateToHome}/>
              <RegisterIcon RegisterScreen={() => navigateTo('register')}/>
              <HomeIcon homeScreen={() => navigateTo('home')} />
            </>
          );
        case 'register':
          return (
            <>
              <RegisterPage navigateToLogin={navigateToLogin}/>
              <LoginIcon LoginScreen={() => navigateTo('login')} />
              <HomeIcon homeScreen={() => navigateTo('home')} />
            </>
          );
        case 'admin':
          return (
            <>
              <Admin/>
              <HomeIcon homeScreen={() => navigateTo('home')} />
            </>
          );
        case 'game':
          return (
            <>
            {/* Home screen button */}
            <HomeIcon homeScreen={stopGame} />
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
          );
        default:
          return null;
      }
    };

    return (
      <div className="main">
        <BgMusic volume={volume} mute={mute}/>
        {renderPage()}
      </div>
    );
}

export default App;
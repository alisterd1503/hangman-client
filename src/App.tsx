import { SetStateAction, useCallback, useEffect, useState } from "react"
import { jwtDecode } from "jwt-decode"
import { Typography } from "@mui/material";
import Confetti from 'react-confetti'

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
import { Settings } from './components/pages/SettingsPage.tsx';
import { LeaderboardTable } from './components/pages/LeaderboardTable';
import { StartScreen } from "./components/pages/StartPage.tsx"
import { Login } from "./components/pages/LoginPage.tsx";
import { RegisterPage } from "./components/pages/RegisterPage.tsx";
import { Records } from "./components/pages/RecordsPage.tsx";
import { Admin } from "./components/pages/AdminPage.tsx";
import { Rules } from "./components/pages/RulesPage.tsx";

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

//UTILS//
import { getWord } from './utils/getWord.ts';

//API CALLS//
import { addScore } from "./api/addScore.ts";
import { getScores } from "./api/getScores.ts";
import { getRecords } from "./api/getRecords.ts";

//MODELS//
import { Game } from "./models/Game.ts";
import { Record } from "./models/Record.ts";

//CONSTANTS//
import {
  EASY_CORRECT_LETTER, 
  EASY_INCORRECT_LETTER, 
  EASY_WORD_GUESSED, 
  EASY_WORD_NOT_GUESSED, 
  HARD_CORRECT_LETTER, 
  HARD_INCORRECT_LETTER, 
  HARD_WORD_GUESSED, 
  HARD_WORD_NOT_GUESSED, 
  MEDIUM_CORRECT_LETTER, 
  MEDIUM_INCORRECT_LETTER, 
  MEDIUM_WORD_GUESSED, 
  MEDIUM_WORD_NOT_GUESSED, 
  REGEX 
} from "./utils/constants.ts";

type Page = 'home' | 'settings' | 'leaderboard' | 'login' | 'game' | 'register' | 'records' | 'admin' | 'rules';

type DB_Packet = {
  id: number
  username: string | null,
  score: number,
  location: string
}

//TODO: ADD USEEFFECT TO RBING IN LEADERBOARD AND RECORDS DATA

function App() {
  const [difficulty, setDifficulty] = useState<string | null>(null);
  const [chosenWord, setChosenWord] = useState<string | null>(null);
  const [letterGuesses, setLetterGuesses] = useState<string[]>([]);
  const [wordGuesses, setWordGuesses] = useState('');
  const [usersPoints, setUsersPoints] = useState(0);
  const [volume, setVolume] = useState(0.5)
  const [mute, setMute] = useState(true)
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [result , setResult] = useState(false)
  const [gameOver, setGameOver] = useState(false)
  const [pointsToShow, setPointsToShow] = useState<number | null>(null);
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [scores, setScores] = useState<DB_Packet[]>([]);
  const [records, setRecords] = useState<Record[]>([]);
    
    useEffect(() => {
        const fetchScores = async () => {
            const data = await getRecords();
            setRecords(data);
        };
        fetchScores();
    }, []);


  // Function that adds the score to the database
  const sendPacket = async () => {
    if (currentUser && difficulty && chosenWord) {
      const body: Game = {
        score: usersPoints,
        difficulty: difficulty,
        word: chosenWord,
        result: result,
        guesses: letterGuesses.length
      }
      await addScore(body)
    }
  }

  useEffect(() => {
      const fetchScores = async () => {
          const data = await getScores();
          setScores(data);
      };

      fetchScores();
  }, []);

  // Function to navigate to relevant pages
  const navigateTo = (page: Page) => {
    setCurrentPage(page);
  };

  // Setting the logged in user's name and role
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
        const decodedToken = jwtDecode<{ username: string, role: string }>(token);
        setCurrentUser(decodedToken.username);
        setUserRole(decodedToken.role);
    }
  }, []);

  // Function that tracks the incorrect letter guesses
  const getIncorrectGuesses = () => {
      return letterGuesses.filter(guess => {
          if (guess.length === 1) {
              return !chosenWord!.includes(guess);
          }
          return guess !== chosenWord;
      });
  };

  const incorrectGuesses = getIncorrectGuesses();

  // Function to start the game
  const handleStartGame = () => {
      setChosenWord(getWord(difficulty!));
      setUsersPoints(0);
  };

  // Variable to track if player lost
  const isLoser = incorrectGuesses.length >= 10;

  // Variable to track if player won
  const isWinner = chosenWord && (letterGuesses.includes(chosenWord) || chosenWord
      .split("")
      .every((letter: string) => letterGuesses.includes(letter)))

  // Displaying the points when user guesses
  useEffect(() => {
    if (pointsToShow !== null) {
      const timer = setTimeout(() => {
        setPointsToShow(null);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [pointsToShow]);

  // Adding users guesses to an array
  const addUserGuess = useCallback((letter: string) => {
    if (letterGuesses.includes(letter) || isLoser || isWinner) {
      return;
    }
    setLetterGuesses(currentLetters => {
      const newGuesses = [...currentLetters, letter];

      // Adding points of the guess is correct
      if ((chosenWord!.includes(letter) && letter.length === 1) 
        || chosenWord && letterGuesses.includes(chosenWord)) {
          play(correct)
        if (difficulty === 'easy') {
            setUsersPoints(prev => prev + EASY_CORRECT_LETTER);
            setPointsToShow(EASY_CORRECT_LETTER);
        } else if (difficulty === 'hard') {
            setUsersPoints(prev => prev + HARD_CORRECT_LETTER);
            setPointsToShow(HARD_CORRECT_LETTER)
        } else {
            setUsersPoints(prev => prev + MEDIUM_CORRECT_LETTER);
            setPointsToShow(MEDIUM_CORRECT_LETTER)
        }
      // Deducting points of the guess is correct
      } else {
        play(wrong)
        if (difficulty === 'easy') {
          setUsersPoints(prev => prev + EASY_INCORRECT_LETTER);
          setPointsToShow(EASY_INCORRECT_LETTER);
        } else if (difficulty === 'hard') {
            setUsersPoints(prev => prev + HARD_INCORRECT_LETTER);
            setPointsToShow(HARD_INCORRECT_LETTER)
        } else {
            setUsersPoints(prev => prev + MEDIUM_INCORRECT_LETTER);
            setPointsToShow(MEDIUM_INCORRECT_LETTER)
        }
      }
      return newGuesses;
    });
  }, [letterGuesses, isLoser, isWinner, chosenWord]);

  // Resets game when play again button pressed
  const resetGame = () => {
      if (currentUser) {sendPacket()}
      setLetterGuesses([]);
      setChosenWord(getWord(difficulty!));
      setWordGuesses('');
      setGameOver(false)
      setUsersPoints(0)
  };

  // TODO: PUT ALL THIS INTO HANGMAN COMPONENT
  const handleInputChange = (event: { target: { value: SetStateAction<string> } }) => {
      setWordGuesses(event.target.value);
  };

  // Sets the input value when the submit button is clicked
  const handleButtonClick = () => {
      if (wordGuesses.trim() === "" || !(REGEX.test(wordGuesses))) {
          setWordGuesses("");
          return;
      }
      addUserGuess(wordGuesses.toLowerCase());
      setWordGuesses("");
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
    setLetterGuesses([]);
    setChosenWord(null);
    setWordGuesses('');
    setDifficulty(null);
    setGameOver(false)
    navigateTo('home')
  };

  // Adding/deducting points based on if the user gets the word
  useEffect(() => {
    const updatePoints = (wordGuessed: number, wordNotGuessed: number) => {
      if (isWinner) {
        play(won);
        setResult(true);
        setUsersPoints(prev => prev + wordGuessed);
        setPointsToShow(wordGuessed);
      } else if (isLoser) {
        play(lost);
        setUsersPoints(prev => prev - wordNotGuessed);
        setPointsToShow(-wordNotGuessed);
      }
      setGameOver(true);
    };
  
    switch (difficulty) {
      case 'easy':
        updatePoints(EASY_WORD_GUESSED, EASY_WORD_NOT_GUESSED);
        break;
      case 'hard':
        updatePoints(HARD_WORD_GUESSED, HARD_WORD_NOT_GUESSED);
        break;
      default:
        updatePoints(MEDIUM_WORD_GUESSED, MEDIUM_WORD_NOT_GUESSED);
        break;
    }
  }, [isWinner, isLoser, difficulty]);

    // Conditonal rendering of the pages
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
                navigateToLogin={() => navigateTo('login')}
              />
              <HomeIcon homeScreen={() => navigateTo('home')} />
            </>
          );
        case 'leaderboard':
          return (
            <>
              <LeaderboardTable scores={scores}/>
              <HomeIcon homeScreen={() => navigateTo('home')} />
            </>
          );
        case 'records':
          return (
            <>
              <Records records={records}/>
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
              <Login navigateToHome={() => {navigateTo('home'), window.location.reload();}}/>
              <RegisterIcon RegisterScreen={() => navigateTo('register')}/>
              <HomeIcon homeScreen={() => navigateTo('home')} />
            </>
          );
        case 'register':
          return (
            <>
              <RegisterPage navigateToLogin={() => navigateTo('login')}/>
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
            <Points usersPoints={usersPoints} pointsToShow={pointsToShow} />
    
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
                letterGuesses={letterGuesses}
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
                activeLetters={letterGuesses.filter((letter) => chosenWord!.includes(letter))}
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
                  wordGuesses={wordGuesses}
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
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
import { UseIcon } from "./components/reusable/UseIcon.tsx";

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
import { GameModel } from "./models/GameModel.ts";
import { RecordModel } from "./models/RecordModel.ts";
import { LeaderboardModel } from "./models/LeaderboardModel.ts";

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
  REGEX,
  MAX_GUESSES
} from "./utils/constants.ts";

//ICON IMAGES//
import homeIcon from './images/home.png'
import settingsIcon from './images/settings.png'
import leaderboardIcon from './images/leaderboard.png'
import rulesIcon from './images/rules.png'
import adminIcon from './images/admin.png'
import logoutIcon from './images/logout.png'
import recordsIcon from './images/records.png'
import loginIcon from './images/login.png'
import registerIcon from './images/register.png'

type Page = 'home' | 'settings' | 'leaderboard' | 'login' | 'game' | 'register' | 'records' | 'admin' | 'rules';

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
  const [scores, setScores] = useState<LeaderboardModel[]>([]);
  const [records, setRecords] = useState<RecordModel[]>([]);
    
  // Fetching records from the database
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
      const body: GameModel = {
        score: usersPoints,
        difficulty: difficulty,
        word: chosenWord,
        result: result,
        guesses: letterGuesses.length
      }
      await addScore(body)
    }
  }

  // Festhcing leaderboard data from the database
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
  const isLoser = incorrectGuesses.length >= MAX_GUESSES;

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
    // If letter has already been guessed or iswin or islose
    if (letterGuesses.includes(letter) || isLoser || isWinner) {
      return;
    }

    setLetterGuesses(currentLetters => {
        const newGuesses = [...currentLetters, letter];

        // Check if the guess is correct
        const isCorrectGuess = chosenWord!.includes(letter) && letter.length === 1;
        const isWordGuess = chosenWord && letterGuesses.includes(chosenWord);
        
        if (isCorrectGuess || isWordGuess) {
            play(correct);
            // Update points for a correct guess
            if (difficulty === 'easy') {
                setUsersPoints(prev => prev + EASY_CORRECT_LETTER);
                setPointsToShow(EASY_CORRECT_LETTER);
            } else if (difficulty === 'hard') {
                setUsersPoints(prev => prev + HARD_CORRECT_LETTER);
                setPointsToShow(HARD_CORRECT_LETTER);
            } else {
                setUsersPoints(prev => prev + MEDIUM_CORRECT_LETTER);
                setPointsToShow(MEDIUM_CORRECT_LETTER);
            }
        } else {
            play(wrong);
            if (difficulty === 'easy') {
                setUsersPoints(prev => prev - (EASY_CORRECT_LETTER/2));
                setPointsToShow(-EASY_INCORRECT_LETTER);
            } else if (difficulty === 'hard') {
                setUsersPoints(prev => prev - (HARD_INCORRECT_LETTER/2));
                setPointsToShow(-HARD_INCORRECT_LETTER);
            } else {
                setUsersPoints(prev => prev - (MEDIUM_INCORRECT_LETTER/2));
                setPointsToShow(-MEDIUM_INCORRECT_LETTER);
            }
        }

        return newGuesses;
    });
}, [chosenWord]);


  // Resets game when play again button pressed
  const resetGame = () => {
      if (currentUser) {sendPacket()}
      setLetterGuesses([]);
      setChosenWord(getWord(difficulty!));
      setWordGuesses('');
      setGameOver(false)
      setUsersPoints(0)
  };

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

  const clearLocalStorage = () => {
    localStorage.removeItem('token');
    window.location.href = window.location.href;
  };

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
              <UseIcon 
                navigateTo={() => navigateTo('settings')}
                title="settings"
                placement="right"
                top='20px'
                left='20px'
                iconImage={settingsIcon}>
              </UseIcon>

              <UseIcon 
                navigateTo={() => navigateTo('leaderboard')}
                title="leaderboard"
                placement="left"
                top='0px'
                right='20px'
                size='110px'
                iconImage={leaderboardIcon}>
              </UseIcon>

              <UseIcon 
                navigateTo={() => navigateTo('rules')}
                title="rules"
                placement="left"
                top='130px'
                left='20px'
                size='120px'
                iconImage={rulesIcon}>
              </UseIcon>
    
              {userRole === 'admin' && 
                <UseIcon 
                navigateTo={() => navigateTo('admin')}
                title="admin"
                placement="left"
                top='260px'
                left='0px'
                size='120px'
                iconImage={adminIcon}>
                </UseIcon>
              }

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
                    <UseIcon 
                      navigateTo={clearLocalStorage}
                      title="logout"
                      placement="right"
                      bottom='0px'
                      left='20px'
                      size='90px'
                      iconImage={logoutIcon}>
                    </UseIcon>
                    <UseIcon 
                      navigateTo={() => navigateTo('records')}
                      title="history"
                      placement="left"
                      bottom='0px'
                      right='20px'
                      size='100px'
                      iconImage={recordsIcon}>
                    </UseIcon>
                  </>) 
                  : 
                  (<UseIcon 
                    navigateTo={() => navigateTo('login')}
                    title="login"
                    placement="left"
                    bottom='0px'
                    right='20px'
                    size='120px'
                    iconImage={loginIcon}>
                  </UseIcon>)
                }
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
              <UseIcon 
                navigateTo={() => navigateTo('home')} 
                iconImage={homeIcon} 
                title="home" 
                placement="right" 
                bottom='40px' 
                left='20px'>
              </UseIcon>
            </>
          );
        case 'leaderboard':
          return (
            <>
              <LeaderboardTable scores={scores}/>
              <UseIcon 
                navigateTo={() => navigateTo('home')} 
                iconImage={homeIcon} 
                title="home" 
                placement="right" 
                bottom='40px' 
                left='20px'>
              </UseIcon>
            </>
          );
        case 'records':
          return (
            <>
              <Records records={records}/>
              <UseIcon 
                navigateTo={() => navigateTo('home')} 
                iconImage={homeIcon} 
                title="home" 
                placement="right" 
                bottom='40px' 
                left='20px'>
              </UseIcon>
            </>
          );
        case 'rules':
            return (
              <>
                <Rules />
                <UseIcon 
                navigateTo={() => navigateTo('home')} 
                iconImage={homeIcon} 
                title="home" 
                placement="right" 
                bottom='40px' 
                left='20px'>
              </UseIcon>
              </>
            );
        case 'login':
          return (
            <>
              <Login navigateToHome={() => {navigateTo('home'), window.location.reload();}}/>

              <UseIcon 
                navigateTo={() => navigateTo('register')} 
                iconImage={registerIcon} 
                title="register" 
                placement="left" 
                bottom='0px' 
                right='20px'
                size="120px">
              </UseIcon>

              <UseIcon 
                navigateTo={() => navigateTo('home')} 
                iconImage={homeIcon} 
                title="home" 
                placement="right" 
                bottom='40px' 
                left='20px'>
              </UseIcon>
            </>
          );
        case 'register':
          return (
            <>
              <RegisterPage navigateToLogin={() => navigateTo('login')}/>
              <UseIcon 
                navigateTo={() => navigateTo('login')}
                title="login"
                placement="left"
                bottom='0px'
                right='20px'
                size='120px'
                iconImage={loginIcon}>
              </UseIcon>
              <UseIcon 
                navigateTo={() => navigateTo('home')} 
                iconImage={homeIcon} 
                title="home" 
                placement="right" 
                bottom='40px' 
                left='20px'>
              </UseIcon>
            </>
          );
        case 'admin':
          return (
            <>
              <Admin/>
              <UseIcon 
                navigateTo={() => navigateTo('home')} 
                iconImage={homeIcon} 
                title="home" 
                placement="right" 
                bottom='40px' 
                left='20px'>
              </UseIcon>
            </>
          );
        case 'game':
          return (
            <>
              {/* Home screen button */}
              <UseIcon 
                navigateTo={stopGame} 
                iconImage={homeIcon} 
                title="home" 
                placement="right" 
                bottom='40px' 
                left='20px'>
              </UseIcon>
              <Points usersPoints={usersPoints} pointsToShow={pointsToShow} />
    
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
      <>
        {/* Displays confetti */}
        {isWinner && (
          <>
            <Confetti width={window.innerWidth} height={window.innerHeight} recycle={false} initialVelocityY={1} />
          </>
        )}
        <div className="main">
          <BgMusic volume={volume} mute={mute}/>
          {renderPage()}
        </div>
      </>
    );
}

export default App;
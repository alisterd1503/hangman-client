import { useCallback, useEffect, useState } from "react"
import { HangmanDrawing } from "./HangmanDrawing"
import { HangmanWord } from "./HangmanWord"
import { Keyboard } from "./Keyboard"
import words from "./wordList.json"
import Confetti from 'react-confetti'

const HEIGHT = 800;
const WIDTH = 1200;

function getWord() {
  return words[Math.floor(Math.random() * words.length)]
}

function App() {
  const [chosenWord, setChosenWord] = useState(() => getWord())
  console.log(chosenWord)
  const [guessedLetters, setGuessedLetters] = useState<string[]>([])

  const incorrectLetters = guessedLetters.filter( 
    letter => !chosenWord.includes(letter)
  )

  const isLoser = incorrectLetters.length >= 6

  const isWinner = chosenWord
    .split("")
    .every((letter: string) => guessedLetters.includes(letter))

  const addGuessedLetter = useCallback((letter: string) => {
    if (guessedLetters.includes(letter) || isLoser || isWinner) {
      return
    }

    setGuessedLetters(currentLetters => [...currentLetters, letter])
  }, [guessedLetters, isLoser, isWinner])


  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key

      if (!key.match(/^[a-z]$/)) {
        return
      }

      e.preventDefault()
      addGuessedLetter(key)
    }

    document.addEventListener("keypress", handler)

    return () => {
      document.removeEventListener("keypress", handler)
    }
  },[guessedLetters])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key

      if (key !== "Enter") {
        return
      }

      e.preventDefault()
      setGuessedLetters([])
      setChosenWord(getWord())
    }

    document.addEventListener("keypress", handler)

    return () => {
      document.removeEventListener("keypress", handler)
    }
  },[])

  let playAgain = ''

  isWinner != isLoser ? playAgain = "PRESS ENTER TO PLAY AGAIN" : ""

  return (
    <div style={{
      backgroundColor: isWinner != isLoser ? (isWinner ? "#9ADE7B" : "#FF8F8F") : "white",
      display: "flex",
      flexDirection: "column",
      margin: "0 auto",
      alignItems: "center",
      border: "solid black 0.5rem",
      gap: "0rem",
      transform: "scale(0.9)",
      maxHeight: `${HEIGHT.toString()}px`,
      maxWidth: `${WIDTH.toString()}px`
    }}>
      {isWinner && <Confetti width={WIDTH} height={HEIGHT}/>}
      {/* Displays winner loser message */}
      <div 
        style={{
          marginTop: "40px", 
          fontSize: "4rem",
          textAlign: "center", 
          color: isWinner != isLoser ? (isWinner ? "green" : "red") : "black",
          fontWeight: "bold",
          fontFamily: "arial",
          letterSpacing: "0.6rem",
          height: "60px"
        }}
      >
        {isWinner == isLoser && "GUESS THE WORD!"}
        {isWinner && "WINNER!"}
        {isLoser && "LOSER!"}
        <div 
          style={{
            fontSize: "1rem",
            color: "black",
            fontFamily: "arial",
            fontWeight: "100",
            letterSpacing: "0.15rem",
            height: "20px"
          }}>
          {playAgain}
        </div>
      </div>

      {/* Displays the stand and body */}
      <div style={{ transform: "scale(0.6)" }}>
        <HangmanDrawing numOfGuesses={incorrectLetters.length} />
      </div>

      {/* Displays the dashes and letters */}
      <HangmanWord
        reveal={isLoser}
        guessedLetters={guessedLetters} 
        chosenWord={chosenWord} 
      />

      {/* Displays the keyboard */}
      <div style={{ alignSelf: "stretch", transform: "scale(0.6)" }}>
        <Keyboard 
          disabled = {isWinner || isLoser}
          activeLetters={guessedLetters.filter(letter =>
            chosenWord.includes(letter)
          )}
          inactiveLetters = {incorrectLetters}
          addGuessedLetter = {addGuessedLetter}
        />
      </div>

      {/* Displays the guessed letters */}
      <div 
        style={{ 
          fontFamily: "arial",
          fontSize: "1.5rem", 
          textAlign: "center", 
          color: "red",
          fontWeight: "bold",
          textTransform: "uppercase",
          marginBottom: "40px",
          height: "30px" 
        }}
      >
        {
          incorrectLetters.map((letter, index) => (
            <span key={index} style={{ textDecoration: 'line-through', marginRight: '0.5rem' }}>
              {letter}
            </span>
          ))
        }
      </div>

    </div>
  )
}

export default App

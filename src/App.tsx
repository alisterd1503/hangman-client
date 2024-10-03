import { useCallback, useEffect, useState } from "react"
import { HangmanDrawing } from "./HangmanDrawing"
import { HangmanWord } from "./HangmanWord"
import { Keyboard } from "./Keyboard"
import words from "./wordList.json"
import Confetti from 'react-confetti'
import useWindowSize from 'react-use/lib/useWindowSize'

function getWord() {
  return words[Math.floor(Math.random() * words.length)]
}

function App() {
  const { width, height } = useWindowSize()
  const [chosenWord, setChosenWord] = useState(() => getWord())
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

  return (
    <div style={{
      backgroundColor: isWinner != isLoser ? (isWinner ? "#9ADE7B" : "#FF8F8F") : "white",
      maxWidth: "600px",
      display: "flex",
      flexDirection: "column",
      margin: "0 auto",
      alignItems: "center"
    }}>

      {/* Displays winner loser message */}
      <div 
        style={{
          marginTop: "50px", 
          fontSize: isWinner != isLoser ? "6rem" : "3rem", 
          textAlign: "center", 
          color: isWinner != isLoser ? (isWinner ? "green" : "red") : "black",
          fontWeight: "bold",
          fontFamily: "arial"
        }}
      >
        {isWinner == isLoser && "GUESS THE WORD!"}
        {isWinner && "WINNER!"}
        {isLoser && "LOSER!"}

        {isWinner && <Confetti width={width} height={height} />}
      </div>

      {/* Displays the stand and body */}
      <HangmanDrawing numOfGuesses={incorrectLetters.length} />

      {/* Displays the dashes and letters */}
      <HangmanWord
        reveal={isLoser}
        guessedLetters={guessedLetters} 
        chosenWord={chosenWord} 
      />

      {/* Displays the keyboard */}
      <div style={{ alignSelf: "stretch", transform: "scale(0.8)", }}>
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
          fontSize: "2.5rem", 
          textAlign: "center", 
          color: "red",
          fontWeight: "bold",
          textTransform: "uppercase",
          marginBottom: "50px", 
        }}
      >
        {incorrectLetters.length > 0 && 
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

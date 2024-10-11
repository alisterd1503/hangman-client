import { Button, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import '../../styles.css';
import { clickSound } from '../functions/clickSXF'
import { play } from '../functions/generalSFX'
import start from '../../sounds/start.mp3'
import error from '../../sounds/error.mp3'

const secondaryColour = "#db6e37"

type StartScreenProps = {
    onStart: () => void,
    onDifficultySelect: (difficulty: string) => void,
};

export function StartScreen({ 
    onStart, 
    onDifficultySelect,
}: StartScreenProps) {

  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null);
  const [message, setMessage] = useState('');

  const handleDifficultyChange = (difficulty: string) => {
    setSelectedDifficulty(difficulty);
    onDifficultySelect(difficulty);
    setMessage('')
  };

    // Sets the input value when the submit button is clicked
    const handleButtonClick = () => {
        onStart()
    };

  return (
    <>

    <div style={{
      display: "flex", 
      flexDirection: "column", 
      alignItems: "center", 
      justifyContent: "center", 
      height: "100vh"
    }}>

        <Typography variant="h1" style={{ marginBottom: "40px", fontFamily: "'Indie Flower', cursive", fontWeight: "bold", fontSize: "8rem" }}>
            Hangman Game
        </Typography>

        <Typography variant="h5" style={{ marginBottom: "10px", fontFamily: "'Indie Flower', cursive", fontWeight: "bold", fontSize: "3rem" }}>
            Choose Difficulty
        </Typography>

        <Stack direction="row" spacing={2} style={{ marginBottom: "60px" }}>

            <Button
                sx={{ 
                    fontFamily: "'Indie Flower', cursive", 
                    border: `solid ${secondaryColour} 2px`,
                    borderRadius: '10px', 
                    fontSize: '2rem', 
                    fontWeight: 'bold',
                    color: selectedDifficulty === 'easy' ? 'white' : secondaryColour,
                    backgroundColor: selectedDifficulty === 'easy' ? secondaryColour : 'transparent',
                    transition: 'transform 0.3s',
                    '&:hover': {
                        transform: 'scale(1.05)',
                    }
                }}
                variant={selectedDifficulty === 'easy' ? 'contained' : 'outlined'}
                onClick={() => { clickSound(), handleDifficultyChange('easy')}}
                >
                Easy
            </Button>

            <Button 
                sx={{ 
                    fontFamily: "'Indie Flower', cursive", 
                    border: `solid ${secondaryColour} 2px`,
                    borderRadius: '10px',
                    fontSize: '2rem',  
                    fontWeight: 'bold',
                    color: selectedDifficulty === 'medium' ? 'white' : secondaryColour,
                    backgroundColor: selectedDifficulty === 'medium' ? secondaryColour : 'transparent',
                    transition: 'transform 0.3s',
                    '&:hover': {
                        transform: 'scale(1.05)',
                    }
                }}
                variant={selectedDifficulty === 'medium' ? 'contained' : 'outlined'}
                onClick={() => { clickSound(), handleDifficultyChange('medium')}}
                >
                Medium
            </Button>

            <Button 
                sx={{ 
                    fontFamily: "'Indie Flower', cursive", 
                    border: `solid ${secondaryColour} 2px`,
                    borderRadius: '10px',
                    fontSize: '2rem',  
                    fontWeight: 'bold',
                    color: selectedDifficulty === 'hard' ? 'white' : secondaryColour,
                    backgroundColor: selectedDifficulty === 'hard' ? secondaryColour : 'transparent',
                    transition: 'transform 0.3s',
                    '&:hover': {
                        transform: 'scale(1.05)',
                    }
                }}
                variant={selectedDifficulty === 'hard' ? 'contained' : 'outlined'}
                onClick={() => { clickSound(), handleDifficultyChange('hard')}}
                >
                Hard
            </Button>

            <Button 
                sx={{ 
                    fontFamily: "'Indie Flower', cursive", 
                    border: `solid ${secondaryColour} 2px`,
                    borderRadius: '10px',
                    fontSize: '2rem',  
                    fontWeight: 'bold',
                    color: selectedDifficulty === 'random' ? 'white' : secondaryColour,
                    backgroundColor: selectedDifficulty === 'random' ? secondaryColour : 'transparent',
                    transition: 'transform 0.3s',
                    '&:hover': {
                        transform: 'scale(1.05)',
                    }
                }}
                variant={selectedDifficulty === 'random' ? 'contained' : 'outlined'}
                onClick={() => { clickSound(), handleDifficultyChange('random')}}
                >
                Random
            </Button>

        </Stack>

        <span 
            onClick={() => {
                if (selectedDifficulty) {
                    play(start)
                    handleButtonClick()
                } else {
                    play(error)
                    setMessage('Please select a difficulty before starting.');
                }
            }}
            style={{
                color: "green",
                display: "inline-block",
                fontSize: "4rem",
                height: "65px",
                fontFamily: "'Indie Flower', cursive",
                fontWeight: "bold",
                cursor: "pointer",
                transition: "transform 0.3s, background-color 0.3s",
                marginBottom: "80px"
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.color = 'darkgreen',
                e.currentTarget.style.transform = 'scale(1.1)'
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.color = 'green',
                e.currentTarget.style.transform = 'scale(1)'
            }}
            >
            START
        </span>

        <div style={{transition: '0.3s', height: '50px'}}>
        {message &&
            <Typography
                style={{ 
                    fontFamily: "'Indie Flower',cursive",
                    fontWeight: "bold",
                    fontSize: "2rem",
                }}>{message}
            </Typography>
            }
        </div> 

    </div>
    </>
  );
}

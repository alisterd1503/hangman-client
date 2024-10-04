import { Button, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import './styles.css';

type StartScreenProps = {
  onStart: () => void;
  onDifficultySelect: (difficulty: string) => void;
};

const secondaryColour = "#db6e37"

export function StartScreen({ onStart, onDifficultySelect }: StartScreenProps) {
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null);

  const handleDifficultyChange = (difficulty: string) => {
    setSelectedDifficulty(difficulty);
    onDifficultySelect(difficulty); // Call parent function to update difficulty in App
  };

  return (
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
                onClick={() => handleDifficultyChange('easy')}
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
                onClick={() => handleDifficultyChange('medium')}
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
                onClick={() => handleDifficultyChange('hard')}
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
                onClick={() => handleDifficultyChange('random')}
                >
                Random
            </Button>

        </Stack>

        <span 
            onClick={selectedDifficulty ? onStart : undefined}
            style={{
                color: "green",
                display: "inline-block",
                fontSize: "4rem",
                height: "65px",
                fontFamily: "'Indie Flower', cursive",
                fontWeight: "bold",
                cursor: "pointer",
                transition: "transform 0.3s, background-color 0.3s",
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
    </div>
  );
}

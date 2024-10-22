import { GameModel } from "../models/GameModel";

const API_URL = 'https://alisters-hangman-d5d887d87847.herokuapp.com/api/addScore';

export const addScore = async (score: GameModel): Promise<void> => {
    try {
        const token = localStorage.getItem('token');
        
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(score),
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }
    } catch (error) {
        console.error('Error adding score:', error);
    }
};
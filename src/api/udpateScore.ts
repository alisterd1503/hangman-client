const API_URL = 'https://alisters-hangman-d5d887d87847.herokuapp.com/api/updateScore';

type NewScore = {
    id: number,
    newScore: number,
}

export const updateScore = async (score: NewScore): Promise<void> => {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
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
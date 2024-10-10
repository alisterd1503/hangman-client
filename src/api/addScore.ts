const API_URL = 'http://localhost:5001/api/addScore';

type Score = {
    username: string,
    score: number,
    difficulty: string
}

export const addScore = async (score: Score): Promise<void> => {
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
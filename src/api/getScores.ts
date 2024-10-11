const API_URL = 'https://alisters-hangman.herokuapp.com/api/getScores';

type DB_Packet = {
    id: number
    username: string | null,
    score: number,
    location: string
}

export const getScores = async (): Promise<DB_Packet[]> => {
    try {
        const response = await fetch(API_URL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        const data: DB_Packet[] = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching scores:', error);
        return []; // Return an empty array on error
    }
};
const API_URL = 'http://localhost:5001/api/getRecords';

type Record = {
    id: number,
    score: number,
    difficulty: string,
    date: string,
    word: string,
    result: boolean,
    guesses: number,
};

export const getRecords = async (username: string): Promise<Record[]> => {
    try {

        const response = await fetch(`${API_URL}?username=${encodeURIComponent(username)}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        const data: Record[] = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching records:', error);
        return [];
    }
};

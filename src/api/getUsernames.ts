const API_URL = 'https://alisters-hangman.herokuapp.com/api/usernames';


export const getUsernames = async (): Promise<string[]> => {
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

        const data: string[] = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching scores:', error);
        return [];
    }
};
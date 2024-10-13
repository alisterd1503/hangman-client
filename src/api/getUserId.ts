const API_URL = 'https://alisters-hangman-d5d887d87847.herokuapp.com/api/getUserId';

export const getUserId = async (username: string): Promise<number> => {
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

        const data = await response.json();
        return data.id;
    } catch (error) {
        console.error('Error fetching records:', error);
        throw error
        return 3;
    }
};

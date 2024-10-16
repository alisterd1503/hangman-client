const API_URL = 'https://alisters-hangman-d5d887d87847.herokuapp.com/api/admin/getUsers';

type Users = {
    id: number,
    username: string,
    score: number,
    location: string,
    password: string
}

export const getUsers = async (): Promise<Users[]> => {
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

        const data: Users[] = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching scores:', error);
        return [];
    }
};
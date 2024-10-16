const API_URL = 'https://alisters-hangman-d5d887d87847.herokuapp.com/api/admin/getUsers';

type Users = {
    id: number,
    username: string,
    score: number,
    location: string,
    role: string
}

export const getUsers = async (): Promise<Users[]> => {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(API_URL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
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
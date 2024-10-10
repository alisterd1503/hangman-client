const API_URL = 'http://localhost:5001/api/passwords';

type Passwords = {
    username: string,
    password: string
}

export const getPasswords = async (): Promise<Passwords[]> => {
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

        const data: Passwords[] = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching passwords:', error);
        return [];
    }
};
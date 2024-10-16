const API_URL = 'https://alisters-hangman-d5d887d87847.herokuapp.com/api/updateName';

export const updateName = async (newName: string): Promise<void> => {
    try {
        const token = localStorage.getItem('token');

        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({newName}),
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }
    } catch (error) {
        console.error('Error updating name:', error);
    }
};
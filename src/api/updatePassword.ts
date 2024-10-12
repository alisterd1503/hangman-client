const API_URL = 'https://alisters-hangman-d5d887d87847.herokuapp.com/api/updatePassword';

type NewPassword = {
    id: number,
    newPassword: string,
}

export const updatePassword = async (password: NewPassword): Promise<void> => {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(password),
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }
    } catch (error) {
        console.error('Error adding password:', error);
    }
};
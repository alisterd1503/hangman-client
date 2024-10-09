const API_URL = 'http://localhost:5001/api/scores';

type Packet = {
    name: string | null,
    score: number,
    location: string
}

export const addScore = async (packet: Packet): Promise<void> => {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(packet),
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();
        console.log('Score added:', data);
    } catch (error) {
        console.error('Error adding score:', error);
    }
};
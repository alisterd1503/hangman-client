const API_URL = 'http://localhost:5001/api/names';


export const getNames = async (): Promise<string[]> => {
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
        return []; // Return an empty array on error
    }
};
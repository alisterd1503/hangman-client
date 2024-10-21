import { LeaderboardModel } from "../models/LeaderboardModel";

const API_URL = 'https://alisters-hangman-d5d887d87847.herokuapp.com/api/getScores';

export const getScores = async (): Promise<LeaderboardModel[]> => {
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

        const data: LeaderboardModel[] = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching leadboard data:', error);
        return [];
    }
};
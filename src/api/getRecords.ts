const API_URL = 'https://alisters-hangman-d5d887d87847.herokuapp.com/api/getRecords';
import { Record } from "../models/Record";

export const getRecords = async (): Promise<Record[]> => {
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

        const data: Record[] = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching records:', error);
        return [];
    }
};
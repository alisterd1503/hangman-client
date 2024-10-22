const API_URL = 'https://alisters-hangman-d5d887d87847.herokuapp.com/api/getRecords';
import { RecordModel } from "../models/RecordModel";

export const getRecords = async (): Promise<RecordModel[]> => {
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

        const data: RecordModel[] = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching records:', error);
        return [];
    }
};
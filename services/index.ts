import axios from 'axios';
import { API_URL, API_KEY } from '../config/config';

export async function get(url: string) {
    let result: { success: boolean; error?: string; data?: any; headers?: any };
    try {
        const response = await axios.get(`${API_URL}${url}/?key=${API_KEY}`);
        result = { success: true, data: response.data, headers: response.headers };
    } catch (error) {
        result = { success: false, error: error.toString() };
    }
    return result;
}

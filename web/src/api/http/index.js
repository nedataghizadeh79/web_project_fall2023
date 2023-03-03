import axios from 'axios';
import { BASE_URL } from '../utils';

export const http = axios.create({
    baseURL: BASE_URL
})
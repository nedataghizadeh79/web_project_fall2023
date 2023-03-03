import axios from 'axios';
import { BASE_URL } from '../utils';

const http = axios.create({
    baseURL: BASE_URL
})

export default http;
import http from './index';

export async function login(body) {
    return http.post('/sign_in', body)
        .then(res => res.data)
}

export function signup(body) {
    return http.post('/sign_up', body);
}
import http from './index';

export async function login(body) {
    return http.post('/login', body)
        .then(res => res.data)
}

export function signup(body) {

}
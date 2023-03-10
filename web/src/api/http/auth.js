import http from './index';

export async function login(body) {
    return http.post('/sign_in', body)
        .then(res => res.data)
}

export function signup(body) {
    return http.post('/sign_up', body);
}

export function getAllUsers() {
    return http.post("/accounts_info", {}, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    }).then(res => res.data);
}

export function getUserById(id) {
    return http.post("/account_info", { id }, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    }).then(res => res.data);
}

export function getUserHistory(id) {
    return http.post('/ta_history', { id }, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    }).then(res => res.data);
}
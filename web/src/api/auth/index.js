import { http } from "../http";

export async function login(body) {
    try {
        const res = await http.post('/login', body, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + '',
            }
        })
    } catch (error) {

    }
}

export function signup(body) {

}
import { USER_LOGIN, USER_LOGOUT } from "./action";
import { login } from "../../api/http/auth";

export async function loginUser(data) {
    try {
        const res = await login(data);
        return { type: USER_LOGIN, payload: res }
    } catch {
        return { type: '' };
    }
}

export function logout() {

    try {
        return { type: USER_LOGOUT }
    } catch {
        return { type: '' }
    }
}
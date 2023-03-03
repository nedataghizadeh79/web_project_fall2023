import { login } from "../../api/auth";
import { USER_LOGIN, USER_LOGOUT } from "./action";

export async function loginUser(data) {
    try {
        const res = await login(data);
        return { type: USER_LOGIN, payload: res }
    } catch {
        return { type: '' };
    }
}

export async function logout() {

    try {
        return { type: USER_LOGOUT }
    } catch {
        return { type: '' }
    }
}
import { login } from "../../api/auth";
import { USER_LOGIN } from "./action";

export async function loginUser(data) {
    try {
        const res = await login(data);
        return { type: USER_LOGIN, payload: res }
    } catch (err) {
        return { type: '' };
    }
}
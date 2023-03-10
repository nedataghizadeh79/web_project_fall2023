import http from ".";

export function changeUserRole(data) {
    return http.post('/change_user_role', { ...data }, {
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem("token"),
        }
    }).then(res => res.data);
}
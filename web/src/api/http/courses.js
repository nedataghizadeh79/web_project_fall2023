import http from ".";

export function getInstructorCourses() {
    http.get('/view_all_course_data', {
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem("token"),
        }
    })
        .then(res => res.data);
}
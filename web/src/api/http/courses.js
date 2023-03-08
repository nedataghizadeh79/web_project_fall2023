import http from ".";

export function getInstructorCourses() {
    return http.post('/view_all_course_data', {}, {
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem("token"),
        }
    })
        .then(res => res.data);
}

export function createNewCourse(courseData) {
    return http.post('/create_course', { ...courseData }, {
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem("token"),
        }
    })
        .then(res => res.data);
}
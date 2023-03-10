import http from ".";

export function getInstructorCourses(instructor_id) {
    return http.post('/view_all_course_data', { instructor_id }, {
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

export function getCourseInfo(course_id) {
    return http.post('/view_course_info', { course_id }, {
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem("token"),
        }
    }).then(res => res.data);
}
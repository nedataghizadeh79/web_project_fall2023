import http from "./index";


export async function createAnnouncement(announcementData) {
    return http.post('/create_announcemnt', announcementData, {
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
        }
    }).then((res => res.data))

}


export function getAllAnnouncements() {
    return http.get('/vew_announcements')
        .then(res => res.data)
}

export function getInstructorAnnouncements(id) {
    return http.post('/view_announcements_by_instructor', { USER_ID: id }, {
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem("token"),
        }
    })
        .then(res => res.data)
}

export function volunteerForAnnouncement(volunteershipData) {
    return http.post("/volunteer", volunteershipData, {
        headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
        }
    })
        .then((res) => {
            return res.data
        })
}

export function getAnnouncementVolunteers(announcment_id) {
    return http.post('/view_volunteers', announcment_id)
        .then(res => res.data)
}
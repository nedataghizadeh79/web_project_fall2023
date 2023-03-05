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

export function getInstructorAnnouncements() {
    return http.get('/vew_announcements_by_instructor', {
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
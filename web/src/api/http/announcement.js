import http from "./index";


export async function createAnnouncement(announcementData) {
    return http.post('/creaet_announcemnt', announcementData, {
        headers: {
            Authorization: 'Bearer ' + '',
        }
    }).then((res => res.data))

}

export function volunteerForAnnouncement(volunteershipData) {
    return http.post("/volunteer", volunteershipData, {
        headers: {
            Authorization: "Bearer " + "",
        }
    })
        .then((res) => {
            return res.data
        })
}
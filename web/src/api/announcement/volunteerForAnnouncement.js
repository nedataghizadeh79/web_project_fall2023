import http from "../http";

export async function volunteerForAnnouncement(volunteershipData) {
    try {
        const res = await http.post("/volunteer", volunteershipData)
    } catch (err) {

    }
}
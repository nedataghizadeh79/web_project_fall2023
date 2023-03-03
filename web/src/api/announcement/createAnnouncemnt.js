import http from "../http";


export async function createAnnouncement(announcementData) {
    try {
        const res = await http.post('/create_announcement', announcementData)
        return res.data;
    } catch (e) {
        return e.errors[0].values()[0];
    }
}
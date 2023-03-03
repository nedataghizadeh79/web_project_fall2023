import http from "../http";

export async function volunteerForAnnouncement(volunteershipData) {
    try {
        const res = await http.post("/volunteer", volunteershipData)
        return res.data;
    } catch (err) {
        return err.errors?.[0].value()[0];
    }
}
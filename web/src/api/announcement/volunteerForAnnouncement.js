import { toast } from "react-toastify";
import http from "../http";

export function volunteerForAnnouncement(volunteershipData) {
    return http.post("/volunteer", volunteershipData)
        .then((res) => {
            return res.data
        })
}
import { toast } from "react-toastify";

export function updateToastToSuccess(id, message) {
    toast.update(id, { id: message, type: "success", isLoading: false, autoClose: 5000, closeButton: true, transition: "flip" });
}

export function updateToastToError(id, message) {
    toast.update(id, { render: message, type: "error", isLoading: false, autoClose: 5000, closeButton: true, transition: "flip" });

}


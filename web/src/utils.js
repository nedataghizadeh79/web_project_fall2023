import { Flip, toast } from "react-toastify";

export function updateToastToSuccess(id, message) {
    toast.update(id, { render: message, type: toast.TYPE.SUCCESS, isLoading: false, autoClose: 5000, closeButton: null, transition: Flip });
}

export function updateToastToError(id, message) {
    toast.update(id, { render: message, type: toast.TYPE.ERROR, isLoading: false, autoClose: 5000, closeButton: null, transition: Flip });

}


export const ROLE = {
    1: "دانشجو",
    2: "استاد",
    3: "ادمین",
}

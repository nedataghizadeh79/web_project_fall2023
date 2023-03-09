import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import UserProvider from "./providers/UserProvider";
import LoaderProvider from "./providers/loaderProvider";
import Loader from "./components/loader/loader";
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const publicVapidKey = 'BBjA76bD2-HNsufU7HT94uyT9Y69rhD5XQlaI1p39wc-TT_yaR_dJgAghsKSXQaJ2ePvdEqVCKbPFN28wYHYUYo';

function urlBase64ToUint8Array(base64String) {
    const padding = "=".repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/\-/g, "+")
        .replace(/_/g, "/");

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

//register the service worker, register our push api, send the notification
async function send() {
    //register service worker
    const register = await navigator.serviceWorker.register('worker.js', {
        scope: '/web_project_fall2023_v2/node-server/client/'
    });

    // register push
    const subscription = await register.pushManager.subscribe({
        userVisibleOnly: true,

        //public vapid key
        applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
    });

    //Send push notification
    await fetch("http://localhost:8080/subscribe", {
        method: "POST",
        body: JSON.stringify(subscription),
        headers: {
            "content-type": "application/json"
        }
    });
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <LoaderProvider>
                <UserProvider>
                    <Loader>
                    </Loader>
                    <App />
                    <ToastContainer rtl position={toast.POSITION.BOTTOM_LEFT} autoClose={5000} />
                </UserProvider>
            </LoaderProvider>
        </BrowserRouter>
    </React.StrictMode>
);



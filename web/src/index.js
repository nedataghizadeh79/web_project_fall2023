import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import UserProvider from "./providers/UserProvider";
import LoaderProvider from "./providers/loaderProvider";
import Loader from "./components/loader/loader";
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

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

if ("Notification" in window) {
    Notification.requestPermission();
}


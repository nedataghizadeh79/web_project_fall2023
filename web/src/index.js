import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
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
                    <ToastContainer position={toast.POSITION.BOTTOM_LEFT} autoClose={5000} />
                </UserProvider>
            </LoaderProvider>
        </BrowserRouter>
    </React.StrictMode>
);

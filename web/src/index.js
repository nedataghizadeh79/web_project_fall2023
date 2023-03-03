import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import UserProvider from "./providers/UserProvider";
import LoaderProvider from "./providers/loaderProvider";
import Loader from "./components/loader/loader";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <LoaderProvider>
                <UserProvider>
                    <Loader>
                    </Loader>
                    <App />
                </UserProvider>
            </LoaderProvider>
        </BrowserRouter>
    </React.StrictMode>
);

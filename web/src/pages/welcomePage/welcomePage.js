import React, { useState, useEffect } from "react";
import "./welcomePage.css";
import LandingPage from "../landingPage/landing";

function WelcomePage() {
    const [showWelcome, setShowWelcome] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowWelcome(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    if (showWelcome) {
        return(
            <div>
                <h2 className='welcomeh2'>به سامانه دستاد خوش آمدید</h2>
                <br/>
                <section className="welcomeImg"></section>
            </div>
        )
    ;
    } else {
        return <LandingPage />;
    }
}

export default WelcomePage;

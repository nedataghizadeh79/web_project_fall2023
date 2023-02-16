import React, { useState, useEffect } from 'react';
import MainPage from "../mainPage/mainPage";
import welcomeImg from '../../assets/images/welcomePage/welcomePage.jpg'
import './welcomePage.css'

function Welcome() {
    const [showWelcome, setShowWelcome] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowWelcome(false);
        }, 100);

        return () => clearTimeout(timer);
    }, []);

    if (showWelcome) {
        return <img src={welcomeImg} className='welcomeImg' alt='welcome img' />;
    } else {
        return <MainPage/>
    }
}

export default Welcome;

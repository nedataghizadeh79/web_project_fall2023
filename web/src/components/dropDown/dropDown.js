import React, { useState, useRef, useEffect } from 'react';
import './dropDown.css'


const DropDown = ({ children, open, onCloseRequest }) => {

    const dropdownRef = useRef(null);

    const handleOutsideClick = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            onCloseRequest && onCloseRequest();
        }
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleOutsideClick);
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        }
    }, []);

    return (
        open &&
        <div className="dropdown" ref={dropdownRef}>
            {children}

        </div>
    );
}

export default DropDown
import React, { useState, useRef, useEffect } from 'react';
import './dropDown.css'


const DropDown =()=>{

    const [selectedOption, setSelectedOption] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const handleOptionSelect = (option) => {
        setSelectedOption(option);
        setIsOpen(false);
    }

    const handleOutsideClick = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleOutsideClick);
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        }
    }, []);

    return (
        <div className="App">
            <div className="dropdown" ref={dropdownRef}>
                <button className="dropdown-toggle" type="button" onClick={() => setIsOpen(!isOpen)}>
                    Select an option
                </button>
                {isOpen && (
                    <ul className="dropdown-menu">
                        <li onClick={() => handleOptionSelect('option1')}>Option 1</li>
                        <li onClick={() => handleOptionSelect('option2')}>Option 2</li>
                        <li onClick={() => handleOptionSelect('option3')}>Option 3</li>
                    </ul>
                )}
            </div>
            <p>Selected option: {selectedOption}</p>
        </div>
    );
}

export default DropDown
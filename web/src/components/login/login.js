import React, {useState} from 'react';
import './login.css'
import loginImg from '../../assets/images/login/login.jpg'

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        // login
    };


    return (

        <div className="makeRow">

            <img src={loginImg} alt="login page"/>

            <div className="loginForm" dir="rtl" onSubmit={handleSubmit}>
                <p>
                    به صفحه لاگین سایت دستاد خوش آمدید!
                </p>

                <label>
                    شماره دانشجویی / کد پرسنلی
                </label>
                <input type="text" value={username} onChange={(event) => setUsername(event.target.value)}/>
                <br/>

                <label>
                    رمز
                </label>
                <input type="text" value={username} onChange={(event) => setPassword(event.target.value)}/>
                <br/>

                <button type="submit">Log In</button>

            </div>
        </div>
    );
}

export default Login;

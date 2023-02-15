import React, {useState} from "react";
import registerImg from "../../assets/images/register/register.png";
import './register.css'


const Register=()=>{
    const [firstname, setFirstname] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');



    const handleSubmit = (event) => {
        event.preventDefault();
        // login
    };


    return (

        <div className="makeRow">

            <img src={registerImg} alt="login page"/>

            <div className="loginForm" dir="rtl" onSubmit={handleSubmit}>
                <p>
                    به صفحه ثبت نام سایت دستاد خوش آمدید!
                </p>

                <label> نقش کاربر </label>
                <select id='role'  className='selectOption' >
                    <option value={'دانشجو'}>دانشجو</option>
                    <option value={'استاد'}>استاد</option>
                </select>
                <br/>


                <label>
                    نام
                </label>
                <input type="text" value={firstname} onChange={(event) => setFirstname(event.target.value)}/>
                <br/>

                <label>
                  نام خانوادگی
                </label>
                <input type="text" value={lastName} onChange={(event) => setLastName(event.target.value)}/>
                <br/>


                <label>
                    شماره دانشجویی / کد پرسنلی
                </label>
                <input type="text" value={username} onChange={(event) => setUsername(event.target.value)}/>
                <br/>


                <label>
                    ایمیل
                </label>
                <input type="text" value={email} onChange={(event) => setEmail(event.target.value)}/>
                <br/>


                <label>
                    رمز
                </label>
                <input type="text" value={password} onChange={(event) => setPassword(event.target.value)}/>
                <br/>

                <label>
                    تکرار رمز
                </label>
                <input type="text" value={password2} onChange={(event) => setPassword2(event.target.value)}/>
                <br/>



                <button type="submit">Log In</button>

            </div>
        </div>
    );
}
export default Register

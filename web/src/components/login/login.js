import React, { useState } from "react";
import "./login.css";
import loginImg from "../../assets/images/login/login.jpg";
import { Link } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="makeRow">

      <div className="loginForm">
        <p>به صفحه لاگین سایت دستاد خوش آمدید!</p>

        <label>شماره دانشجویی / کد پرسنلی</label>
        <input
          type="text"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
        <br />

        <label>رمز</label>
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <br />

        <Link to="/main">
          <button type="submit">ورود به صفحه اصلی</button>{" "}
        </Link>
      </div>
      <img src={loginImg} alt="login page" />

    </div>
  );
}

export default Login;

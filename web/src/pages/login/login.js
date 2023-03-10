import React, { useCallback, useRef, useState } from "react";
import {Link, useNavigate} from 'react-router-dom';
import { toast } from "react-toastify";
import "./login.css";
import loginImg from "../../assets/images/login/login.png";
import { login } from "../../api/http/auth";
import { useUserDispatcher } from "../../providers/UserProvider";
import { USER_LOGIN } from "../../providers/UserProvider/action";
import { updateToastToError, updateToastToSuccess } from "../../utils";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useUserDispatcher();
  const navigate = useNavigate();

  const toastRef = useRef(null);

  const submitLogin = useCallback((event) => {
    event.preventDefault();
    toastRef.current = toast.loading("در حال ارسال")

    login({ username, password })
      .then((data) => {
        dispatch({ type: USER_LOGIN, payload: data })
        localStorage.setItem("user", JSON.stringify(data));
        localStorage.setItem("token", data.token);
        updateToastToSuccess(toastRef.current, "شما با موفقیت وارد حساب کاربری خود شدید")
        navigate('/main');
      }).catch(async (err) => {
        console.log(err);
        const errorMessage = await (err.response?.data.message || err.message);
        updateToastToError(toastRef.current, errorMessage);
      })
  }
    , [dispatch, password, username, navigate])

  return (
    <div className="makeRow">
      <form className="loginForm" onSubmit={submitLogin}>
        <label>شناسه کاربری</label>
        <input
          type="text"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
        <br />

        <label>رمز عبور</label>
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <br />

        <button className="login__button" type="submit">ورود</button>
          <br/>
          <Link className='makeAccount' to='/register' >
              ایجاد حساب کاربری
          </Link>
      </form>
      <img src={loginImg} alt="login page" />
    </div>
  );
}

export default Login;

import React, { useCallback, useRef, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import { signup } from "../../api/http/auth";
import registerImg from "../../assets/images/register/register.png";
import { updateToastToError, updateToastToSuccess } from '../../utils';
import "./register.css";

const Register = () => {
  const [formData, setFormData] = useState({
    role: "1",
    firstname: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    password2: "",
  });

  const toastRef = useRef();
  const navigate = useNavigate();

  // change form data based on the name of target event
  const handleChange = useCallback((event) => {
    setFormData((data) => ({ ...data, [event.target.name]: event.target.value }));
  }, []);



  // send form data to signup function in auth.js
  const handleSubmit = useCallback((event) => {
    event.preventDefault();
    toastRef.current = toast.loading("در حال ارسال اطلاعات ...");
    signup(formData).then(() => {
      updateToastToSuccess(toastRef.current, "ثبت نام با موفقیت انجام شد");
      navigate('/main');
    }).catch((error) => {
      updateToastToError(toastRef.current, "خطا در ثبت نام");
    });
  }, [formData, navigate]);

  return (
    <div className="makeRegisterRow">
      <form className="registerForm" onSubmit={handleSubmit}>
        <p className='khoshOmadid'>به صفحه ثبت نام سایت دستاد خوش آمدید!</p>

        {/* <label> نقش کاربر </label>
          <select id="role" className="selectOption" required onChange={handleChange}>
            <option value="1" selected>دانشجو</option>
            <option value="2">استاد</option>
          </select>
          <br /> */}

        <label>نام</label>
        <input
          type="text"
          name="firstname"
          value={formData.firstname}
          onChange={handleChange}
          required
        />
        <br />

        <label>نام خانوادگی</label>
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          required
        />
        <br />

        <label>شماره دانشجویی / کد پرسنلی</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
          pattern="\d+"
        />
        <br />

        <label>ایمیل</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <br />

        <label>رمز عبور</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          pattern="\w{6,}"
        />
        <br />

        <label>تکرار رمز عبور</label>
        <input
          type="password"
          name="password2"
          value={formData.password2}
          onChange={handleChange}
          required
        />
        <br />

        <button type="submit">تکمیل ثبت نام</button>
      </form>
      <img src={registerImg} alt="login page" />
    </div>
  );
};
export default Register;

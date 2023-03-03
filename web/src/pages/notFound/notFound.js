import React from "react";
import "./notFound.css";
import notFoundfImg from "../../assets/images/notFound/404.png";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="not-found">
      <img src={notFoundfImg} alt="not found your address" />
      <h1 className='booodMaanavi'>شما اگر به بعد معنوی اعتقاد داشتید صفحه تون راحت تر پیدا میشد!</h1>
      <button className='goBack'>
        <Link to="/" className="link">
          برگشت به صفحه اصلی
        </Link>
      </button>
    </div>
  );
}

export default NotFound;

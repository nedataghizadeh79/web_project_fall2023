import React from 'react';
import './notFound.css';
import notFoundfImg from '../../assets/images/notFound/404.jpg'
import {Link} from "react-router-dom";

function NotFound() {
    return (
        <div className="not-found">
            <img src={notFoundfImg} alt='not found your address' />
            <h1>صفحه مورد نظر شما یافت نشد</h1>
            <button>
                <Link to='/' className='link'>
                    برگشت به صفحه اصلی
                </Link>
            </button>
        </div>
    );
}

export default NotFound;

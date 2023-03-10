import "./landing.css";
import back from "../../assets/images/landing/landing2.png";
import { Link } from "react-router-dom";

const LandingPage = () => {
    return (
        <div className="landing padded__container">
            <section className='rightSec'>


                <div className="buttons2">
                    <Link to="/login">
                        <button className='btnnn'> ورود</button>
                    </Link>
                    <Link to="/register">
                        <button className='btnnn'> ثبت نام</button>
                    </Link>
                </div>


                <p className="description">
                    سامانه مدیریت دستیاران آموزشی: در این سامانه دو role خواهیم داشت.
                    اساتید در این سامانه برای درس هایی که نیاز دارند، اعلامیه جذب دستیار
                    را ایجاد می کنند. دانشجویان داوطلب هم می توانند رزومه خود را آپلود
                    کنند و برای هر درسی که تمایل دارند، درخواست دستیاری بدهند. سپس استاد
                    می تواند لیستی از داوطلبان که درخواست داده اند را به همراه رزومه آنها
                    مشاهده کند. همچنین سابقه ی هر داوطلب هم برای استاد قابل مشاهده است.
                    سابقه ی داوطلب شامل درس هایی که قبلا در آنها TA شده، به همراه نظر
                    استاد، head TA، و نظرات دانشجویان (و در صورت وجود، Red Alert برای
                    تقلب) است. سپس از بین دواطلبان تعدادی را به عنوان دستیار انتخاب می
                    کند. نتیجه ی انتخاب شدن و یا رد شدن هم از طریق سامانه برای دستیار قابل
                    مشاهده است. همچنین هر دانشجو می تواند لیست تمام درس های نیم سال به
                    همراه دستیاران آن و نظرات و امتیازات سایر دانشجویان را ببیند و برای
                    دستیاران درس هایی که دارد نظر بدهد. (نظر اساتید و Head TA به دانشجو
                    نشان داده نمی شود) همچنین head TA هر درس هم می تواند برای دستیار نظر و
                    امتیاز ثبت کند و در صورت مشاهده، تقلب دستیار را به اطلاع استاد درس
                    برساند. در صورت تایید تقلب توسط استاد، در سابقه دستیار ثبت می شود.
                </p>


            </section>
            <div className="bg-container">
                <img src={back} alt='bgc' />
            </div>

        </div>
    );
};
export default LandingPage;

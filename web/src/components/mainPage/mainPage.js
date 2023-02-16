import mainPageImg  from '../../assets/images/mainPage/mainpage.jpg'
import './mainPage.css'
import CardCourse from "../cardCourses/cardCourse";
import CardCoursesWrapper from "../cardCoursesWrapper/cardCoursesWrapper";


const MainPage=()=>{
    return(
        <div>

            <img src={mainPageImg} className='sharifLogo' alt='sharif sut logo' />

               <CardCoursesWrapper/>

        </div>
    )

}

export default MainPage
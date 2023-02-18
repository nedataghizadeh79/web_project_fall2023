import mainPageImg  from '../../assets/images/mainPage/mainpage.jpg'
import './mainPage.css'
import CardCoursesWrapper from "../cardCoursesWrapper/cardCoursesWrapper";


const MainPage=()=>{
    return(
        <div className='main'>


            {/*<div style={{*/}
            {/*    backgroundImage: `url('../../assets/images/mainPage/mainpage.jpg')`*/}
            {/*}}>*/}
            {/*    Hello World*/}
            {/*</div>*/}


            <img  src={mainPageImg} className='sharifLogo' alt='sharif sut logo' />

               <CardCoursesWrapper/>

        </div>
    )

}

export default MainPage
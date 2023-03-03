import {Link} from "react-router-dom";
import {useUser} from "../../providers/UserProvider";
import "./navbar.css";
import profileIcone from '../../assets/icons/use.png'
import homePage from '../../assets/icons/home.png'

function Navbar() {
    const {loggedIn} = useUser();
    return (
        <nav className="navbar">
            <div className="navbar__container">
                <section className='group mainIcon'>
                    <Link className='mainButton' to={"/main"}>صفحه اصلی</Link>
                    <img className='Icon mainI' src={homePage} alt='main page'/>
                </section>

                <div className="navbar__left">
                    {loggedIn ? (
                        <section className='group'>
                            <Link className='profileLink' to={`/profile/${12}`}>پروفایل</Link>
                            <img className='Icon prof' src={profileIcone} alt='profile'/>
                        </section>
                    ) : (
                        <>
                            <Link to={"/login"}>ورود</Link>
                            <Link to={"/register"}>ثبت نام</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;

import { Link } from "react-router-dom";
import "./navbar.css";
import profileIcone from "../../assets/icons/use.png";
import homePage from "../../assets/icons/home.png";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar__container">
        <section className="group mainIcon">
          <Link className="mainButton" to={"/main"}>
            صفحه اصلی
          </Link>
          <img className="Icon mainI" src={homePage} alt="main page" />
        </section>

        <div className="navbar__left">
          <section className="group">
            <Link className="profileLink" to={`/profile/${12}`}>
              پروفایل
            </Link>
            <img className="Icon prof" src={profileIcone} alt="profile" />
          </section>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

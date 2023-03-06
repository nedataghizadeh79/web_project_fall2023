import { Link } from "react-router-dom";
import "./navbar.css";
import profileIcone from "../../assets/icons/use.png";
import homePage from "../../assets/icons/home.png";
import DropDown from "../dropDown/dropDown";
import { useState } from "react";

function Navbar() {
  const [isDropdownOpen, setDropDownOpen] = useState(false);
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
            <img
              className="Icon prof"
              src={profileIcone}
              alt="profile"
              onClick={() => setDropDownOpen(true)}
            />
            <DropDown
              open={isDropdownOpen}
              onCloseRequest={() => setDropDownOpen(false)}
            >
              <ul className="dropdown-menu">
                <li>
                  <Link to={`/profile/${12}`}>پروفایل کاربری</Link>
                </li>
                <li>خروج</li>
              </ul>
            </DropDown>
          </section>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

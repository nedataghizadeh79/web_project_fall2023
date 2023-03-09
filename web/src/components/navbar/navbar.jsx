import { Link } from "react-router-dom";
import "./navbar.css";
import profileIcone from "../../assets/icons/use.png";
import homePage from "../../assets/icons/home.png";
import DropDown from "../dropDown/dropDown";
import { useCallback, useState } from "react";
import { useUserDispatcher } from "../../providers/UserProvider";
import { logout } from "../../providers/UserProvider/reducers";

function Navbar() {
  const [isDropdownOpen, setDropDownOpen] = useState(false);

  const dispatch = useUserDispatcher();

  const openDrowndown = useCallback(() => {
    isDropdownOpen || setDropDownOpen(true);
  }, [isDropdownOpen]);

  const closeDrowndown = useCallback(() => {
    isDropdownOpen && setDropDownOpen(false);
  }, [isDropdownOpen]);

  const handleLogout = useCallback(() => {
    dispatch(logout());
    localStorage.removeItem("user");
    window.location.reload();
  }, [dispatch]);

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
              onClick={openDrowndown}
            />
            <DropDown open={isDropdownOpen} onCloseRequest={closeDrowndown}>
              <ul className="dropdown-menu">
                <li>
                  <Link to={`/profile`}>پروفایل کاربری</Link>
                </li>
                <li onClick={handleLogout}>خروج</li>
              </ul>
            </DropDown>
          </section>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

import { Link } from "react-router-dom";
import "./navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar__container">
        <ul>
          <li>
            <Link className="mainButton" to={"/main"}>
              صفحه اصلی
            </Link>
          </li>
        </ul>
        <div className="navbar__left">
          <Link className="profileLink" to={`/profile/${12}`}>
            پروفایل
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

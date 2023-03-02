import { Link } from "react-router-dom";
import "./navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar__container">
        <ul>
          <li>
            <Link to={"/main"}>صفحه اصلی</Link>
          </li>
        </ul>
        <div className="navbar__left">
          <Link to={"/login"}>ورود</Link>
          <Link to={"/register"}>ثبت نام</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

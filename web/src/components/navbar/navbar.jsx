import { Link } from "react-router-dom";
import { useUser } from "../../providers/UserProvider";
import "./navbar.css";

function Navbar() {
  const { loggedIn } = useUser();
  return (
    <nav className="navbar">
      <div className="navbar__container">
        <ul>
          <li>
              <Link className='mainButton' to={"/main"}>صفحه اصلی</Link>
          </li>
        </ul>
        <div className="navbar__left">
          {loggedIn ? (
                <Link className='profileLink' to={`/profile/${12}`}>پروفایل</Link>
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

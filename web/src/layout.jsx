import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <>
      <nav>
        <ul>
          <li>صفحه اصلی</li>
        </ul>
      </nav>
      <Outlet />
    </>
  );
}

export default Layout;

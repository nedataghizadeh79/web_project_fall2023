import "./adminPanel.css";
import UserListRole from "../userList/userListRole";
import { useEffect, useRef, useState } from "react";
import CourseManage from "../courseManage/courseManage";
import { getAllUsers } from "../../api/http/auth";
import { toast } from "react-toastify";
import { changeUserRole } from "../../api/http/users";
import { ROLE, updateToastToError, updateToastToSuccess } from "../../utils";
import { useLoaderDispatcher } from "../../providers/loaderProvider";
import { getAllCourses } from "../../api/http/courses";

function AdminPanel() {
  const [tab, setTab] = useState(0);
  const [users, setUsers] = useState([]);
  const [courses, setCourses] = useState([]);
  const toastRef = useRef(null);

  const dispatch = useLoaderDispatcher();

  const changeRole = (user) => {
    toastRef.current = toast.loading("در حال ارسال...");
    changeUserRole({ user_id: user.id, role: parseInt(user.role) })
      .then(() => {
        setUsers((prev) => prev.map((u) => (u.id === user.id ? user : u)));
        updateToastToSuccess(
          toastRef.current,
          `نقش کاربر ${user.username} به ${ROLE[user.role]} تغییر یافت`
        );
      })
      .catch(() => {
        updateToastToError(toastRef.current, "خطایی رخ داده است");
      });
  };

  useEffect(() => {
    dispatch({ type: "show" });
    getAllUsers()
      .then((res) => {
        setUsers(res);
      })
      .catch(async (err) => {
        const errorMessages = await err.response.data.message;
        toast.error(errorMessages);
      });

    getAllCourses()
      .then((res) => {
        setCourses(res);
      })
      .catch(async (err) => {
        const errorMessages = await err.response.data.message;
        toast.error(errorMessages);
      })
      .finally(() => {
        dispatch({ type: "hide" });
      });
  }, [dispatch]);
  return (
    <main>
      <div className="tabbar">
        <div onClick={() => setTab(0)}>مدیریت کاربران</div>
        <div onClick={() => setTab(1)}>مدیریت دروس</div>
      </div>
      <div className="padded__container">
        {tab === 0 ? (
          <UserListRole users={users} onRoleChange={changeRole} />
        ) : (
          <CourseManage courses={courses} />
        )}
      </div>
    </main>
  );
}

export default AdminPanel;

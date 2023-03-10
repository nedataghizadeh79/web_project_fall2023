import "./adminPanel.css";
import UserListRole from "../userList/userListRole";
import { useState } from "react";
import CourseManage from "../courseManage/courseManage";

function AdminPanel() {
  const [tab, setTab] = useState(0);
  return (
    <main>
      <div className="tabbar">
        <div onClick={() => setTab(0)}>مدیریت کاربران</div>
        <div onClick={() => setTab(1)}>مدیریت دروس</div>
      </div>
      <div className="padded__container">
        {tab === 0 ? (
          <UserListRole
            users={[
              { username: 1, name: "محمد", role: "1" },
              { username: 2, name: "علی", role: "1" },
              { username: 3, name: "محمد", role: "2" },
            ]}
          />
        ) : (
          <CourseManage />
        )}
      </div>
    </main>
  );
}

export default AdminPanel;

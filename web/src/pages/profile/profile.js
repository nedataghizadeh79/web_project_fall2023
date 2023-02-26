import React, { useState } from "react";
import "./profile.css";
import PdfViewer from "../../components/pdfViewer/pdfViewer";

function Profile() {

  const [isEditing, setIsEditing] = useState(false);

  const [userData, setUserData] = useState({
    name: "ندا تقی زاده",
    email: "Nedath1378@gmail.com",
    role: "Student",
    imageUrl: "https://via.placeholder.com/150",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsEditing(false);
  };

  const handleChange = (event) => {
    setUserData({ ...userData, [event.target.name]: event.target.value });
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const renderForm = () => {
    return (
      <form className="form" onSubmit={handleSubmit} dir="rtl">
        <div>
          <label htmlFor="name-input"> نام : </label>
          <input
            id="name-input"
            type="text"
            value={userData.name}
            name="name"
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="email-input">ایمیل : </label>
          <input
            id="email-input"
            type="email"
            value={userData.email}
            name="email"
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="role-input">نقش کاربر : </label>
          <select id="role-input" value={userData.role} onChange={handleChange}>
            <option value="Master">User</option>
            <option value="Student">Admin</option>
          </select>
        </div>
        <div>
          <label htmlFor="image-input"> عکس کاربر : </label>
          <input
            id="image-input"
            type="file"
            accept="image/*"
            onChange={handleChange}
          />
        </div>
        <button className="save" type="submit">
          ذخیره
        </button>
      </form>
    );
  };

  return (
    <main className="profile">
      {
        isEditing ? (
          renderForm()
        ) : (
          <>
            <div className="profile__header">
              <img className="img" src={userData.imageUrl} alt="Profile" />
              <p>{userData.name}</p>
            </div>

            <div className="info">
              <span>
                <i class="fa-regular fa-envelope"></i>
                <p>{userData.email}</p>
              </span>
              <span>
                <i class="fa-regular fa-user"></i>
                <p>{userData.role}</p>
              </span>

              {/* <PdfViewer /> */}

            </div>
            <button onClick={handleEditClick}>ویرایش</button>
          </>
        )
      }
    </main>
  );
}

export default Profile;

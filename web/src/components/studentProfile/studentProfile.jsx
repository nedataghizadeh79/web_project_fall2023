import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faUser } from "@fortawesome/free-regular-svg-icons";
import { useUser } from "../../providers/UserProvider";
import { ROLE } from "../../utils";

function StudentProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const userData = useUser();

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsEditing(false);
  };

  const handleChange = (event) => {
    // setUserData({ ...userData, [event.target.username]: event.target.value });
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
            value={userData.username}
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
          <select
            id="role-input"
            value={userData.roles}
            onChange={handleChange}
          >
            <option value="2">استاد</option>
            <option value="1">دانشجو</option>
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
    <main className="profile padded__container">
      {isEditing ? (
        renderForm()
      ) : (
        <>
          <section className="profile__section profile__section--profile">
            <div className="profile__header">
              {/* <img
                className="img"
                src={userData.imageUrl}
                alt="StudentProfile"
              /> */}
              <h2>{userData.username}</h2>
            </div>

            <div className="info">
              <span>
                <FontAwesomeIcon icon={faEnvelope} />
                <p>{userData.email}</p>
              </span>
              <span>
                <FontAwesomeIcon icon={faUser} />
                <p>{ROLE[userData.roles]}</p>
              </span>
            </div>
            <button onClick={handleEditClick}>ویرایش</button>
          </section>
          <section className="profile__section profile__section--background">
            <h2>سوابق دستیاری</h2>
            <hr />
            <div className="card">
              <div className="data_container">
                <h4>مدارهای منطقی</h4>
                <div className="ta_info">
                  <p>مدرس: دکتر لاله ارشدی</p>
                  <p>ترم: پاییز ۱۴۰۱</p>
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </main>
  );
}

export default StudentProfile;

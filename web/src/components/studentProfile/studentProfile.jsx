import React, { useRef, useState } from "react";
import ReactModal from "react-modal";

function StudentProfile() {
  const [isEditing, setIsEditing] = useState(false);

  const pageRef = useRef(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBackground, setSelectedBackground] = useState(null);

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
    <main className="profile padded__container">
      {isEditing ? (
        renderForm()
      ) : (
        <>
          <section className="profile__section profile__section--profile">
            <div className="profile__header">
              <img
                className="img"
                src={userData.imageUrl}
                alt="StudentProfile"
              />
              <h2>{userData.name}</h2>
            </div>

            <div className="info">
              <span>
                <i className="fa-regular fa-envelope"></i>
                <p>{userData.email}</p>
              </span>
              <span>
                <i className="fa-regular fa-user"></i>
                <p>{userData.role}</p>
              </span>
            </div>
            <button onClick={handleEditClick}>ویرایش</button>
          </section>
          <section
            ref={pageRef}
            className="profile__section profile__section--background"
          >
            <h2>سوابق دستیاری</h2>
            <hr />
            <div className="card" onClick={() => setIsModalOpen(true)}>
              <div className="data_container">
                <h4>مدارهای منطقی</h4>
                <div className="ta_info">
                  <p>مدرس: دکتر لاله ارشدی</p>
                  <p>ترم: پاییز ۱۴۰۱</p>
                </div>
              </div>
            </div>
          </section>
          <ReactModal
            isOpen={isModalOpen}
            onRequestClose={() => setIsModalOpen(false)}
            appElement={pageRef.current}
            className="react_modal"
          >
            <div className="modal__body">
              <h2>مدارهای منطقی</h2>
              <p>پاییز ۱۴۰۱ - دستیار آموزشی</p>
              <div className="background__data">
                <label htmlFor="instructorFeedback">بازخورد استاد:</label>
                <textarea
                  id="instructorFeedback"
                  value={selectedBackground?.instructorFeedback}
                  disabled
                />
              </div>
              <div className="background__data">
                <label htmlFor="headTaFeedback">بازخورد هد دستیار:</label>
                <textarea
                  id="headTaFeedback"
                  value={selectedBackground?.headTaFeedback}
                  disabled
                />
              </div>
            </div>
          </ReactModal>
        </>
      )}
    </main>
  );
}

export default StudentProfile;

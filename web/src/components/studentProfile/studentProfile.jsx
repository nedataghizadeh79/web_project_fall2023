import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faUser } from "@fortawesome/free-regular-svg-icons";
import { useUser } from "../../providers/UserProvider";
import { ROLE, TERM } from "../../utils";
import ReactModal from "react-modal";
import { getUserHistory } from "../../api/http/auth";
import { toast } from "react-toastify";

function StudentProfile({ userData }) {
  const [isEditing, setIsEditing] = useState(false);
  const [history, setHistory] = useState([]);

  const { user_id } = useParams();
  const pageRef = useRef(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBackground, setSelectedBackground] = useState(null);

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

  useEffect(() => {
    getUserHistory(userData.id)
      .then((res) => {
        setHistory(res);
      })
      .catch(async (err) => {
        const res = await err.response.data.message;
        toast.error(res);
      });
  }, [userData]);

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
            {!user_id && <button onClick={handleEditClick}>ویرایش</button>}
          </section>
          <section
            ref={pageRef}
            className="profile__section profile__section--background"
          >
            <h2>سوابق دستیاری</h2>
            <hr />
            {history.map((item) => (
              <div className="card">
                <div className="data_container">
                  <h4>{item.course_name}</h4>
                  <div className="ta_info">
                    {/* <p>مدرس: دکتر لاله ارشدی</p> */}
                    <p>
                      ترم: {TERM[item.term]}
                      {item.year}
                    </p>
                  </div>
                </div>
              </div>
            ))}
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

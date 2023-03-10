import { useRef, useState } from "react";
import ReactModal from "react-modal";
import AnnouncementList from "../../pages/announcementList/announcementList";

const initialCourseForm = {
  courseName: "",
  year: "1401",
  term: "1",
};

function InstructorProfile() {
  const container = useRef();
  const [isCreatingCourse, setIsCreatingCourse] = useState(false);

  const [courseForm, setCourseForm] = useState(initialCourseForm);

  const updateCourseForm = (e) => {
    setCourseForm((form) => ({ ...form, [e.target.name]: e.target.value }));
  };

  const closeCourseModal = () => {
    setIsCreatingCourse(false);
    setCourseForm(initialCourseForm);
  };

  return (
    <main className="profile padded__container" ref={container}>
      <section>
        <h1>دکتر امید جعفری نژاد</h1>
      </section>
      <section>
        <div className="section__header">
          <h2>اعلان‌ها</h2>
          <button>ایجاد اعلان جدید</button>
        </div>
        <hr />
        <AnnouncementList />
      </section>
      <section>
        <div className="section__header">
          <h2>دروس ارائه شده</h2>
          <button onClick={() => setIsCreatingCourse(true)}>
            ایجاد درس جدید
          </button>
        </div>
        <hr />
      </section>
      <ReactModal
        isOpen={isCreatingCourse}
        onRequestClose={closeCourseModal}
        appElement={container.current}
        className="react_modal right_float_modal"
      >
        <h3>ایجاد درس جدید</h3>
        <div className="modal__body">
          <div>
            <label htmlFor="courseName">نام درس:</label>
            <input
              value={courseForm.courseName}
              onChange={updateCourseForm}
              id="courseName"
              name="courseName"
              type="text"
            />
          </div>
          <div>
            <label htmlFor="presentYear">سال ارائه:</label>
            <input
              value={courseForm.year}
              onChange={updateCourseForm}
              id="presentYear"
              name="year"
              type="number"
            />
          </div>
          <div>
            <label htmlFor="term">نیم‌سال تحصیلی:</label>
            <select
              value={courseForm.term}
              onChange={updateCourseForm}
              id="term"
              name="term"
            >
              <option value="1">پاییز</option>
              <option value="2">بهار</option>
              <option value="3">تابستان</option>
            </select>
          </div>
        </div>
        <div className="modal__footer">
          <button>ثبت</button>
          <button onClick={closeCourseModal} className="cancel">
            لغو
          </button>
        </div>
      </ReactModal>
    </main>
  );
}

export default InstructorProfile;

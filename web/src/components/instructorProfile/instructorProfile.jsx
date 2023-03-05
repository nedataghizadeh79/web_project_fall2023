import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import ReactModal from "react-modal";
import { toast } from "react-toastify";
import { getInstructorAnnouncements } from "../../api/http/announcement";
import { getInstructorCourses } from "../../api/http/courses";
import { JafarinezhadData } from "../../data/courses.data";
import AnnouncementList from "../../pages/announcementList/announcementList";
import { useLoaderDispatcher } from "../../providers/loaderProvider";

const initialCourseForm = {
  courseName: "",
  year: "",
  term: "1",
};

const initialAnnouncementForm = {
  course_id: "",
  description: "",
};

function InstructorProfile() {
  const container = useRef();
  const [isCreatingCourse, setIsCreatingCourse] = useState(false);
  const [courses, setCourses] = useState({});
  const [announcements, setAnnouncements] = useState(JafarinezhadData);

  const [courseForm, setCourseForm] = useState(initialCourseForm);

  const dispatch = useLoaderDispatcher();

  const { user_id } = useParams();

  const updateCourseForm = (e) => {
    setCourseForm((form) => ({ ...form, [e.target.name]: e.target.value }));
  };

  const closeCourseModal = () => {
    setIsCreatingCourse(false);
    setCourseForm(initialCourseForm);
  };

  useEffect(() => {
    dispatch({ type: "show" });

    let error = null;

    getInstructorCourses()
      .then((data) => {
        setCourses(data);
      })
      .catch(async (err) => {
        error = await err.response.data.message;
      });

    getInstructorAnnouncements()
      .then((data) => {
        setAnnouncements(data);
      })
      .catch(async (err) => {
        error = await err.response.data.message;
      });

    dispatch({ type: "hide" });
    error && toast.error(error);
  }, [dispatch]);

  return (
    <main className="profile padded__container" ref={container}>
      <section>
        <h1>دکتر امید جعفری نژاد</h1>
      </section>
      <section>
        <div className="section__header">
          <h2>اعلان‌ها</h2>
          {!user_id && <button>ایجاد اعلان جدید</button>}
        </div>
        <hr />
        <AnnouncementList announcements={announcements} />
      </section>
      <section>
        <div className="section__header">
          <h2>دروس ارائه شده</h2>
          {!user_id && (
            <button onClick={() => setIsCreatingCourse(true)}>
              ایجاد درس جدید
            </button>
          )}
        </div>
        <hr />
        <div>{courses}</div>
      </section>
      <ReactModal
        isOpen={isCreatingCourse}
        onRequestClose={closeCourseModal}
        appElement={container.current}
        className="react_modal right_float_modal"
      >
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

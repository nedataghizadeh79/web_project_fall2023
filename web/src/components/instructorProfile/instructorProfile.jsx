import { useCallback, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import ReactModal from "react-modal";
import { toast } from "react-toastify";
import { getInstructorAnnouncements } from "../../api/http/announcement";
import { createNewCourse, getInstructorCourses } from "../../api/http/courses";
import { JafarinezhadData } from "../../data/courses.data";
import AnnouncementList from "../../pages/announcementList/announcementList";
import { useLoaderDispatcher } from "../../providers/loaderProvider";
import { useUser } from "../../providers/UserProvider";
import { updateToastToError, updateToastToSuccess } from "../../utils";

const initialCourseForm = {
  course_name: "",
  year: "1401",
  term: "1",
};

const initialAnnouncementForm = {
  course_id: "",
  description: "",
};

function InstructorProfile({ userData }) {
  const container = useRef();
  const toastRef = useRef();
  const [isCreatingCourse, setIsCreatingCourse] = useState(false);
  const [courses, setCourses] = useState([]);
  const [announcements, setAnnouncements] = useState([]);

  const [courseForm, setCourseForm] = useState(initialCourseForm);

  const user = useUser();

  const dispatch = useLoaderDispatcher();

  const { user_id } = useParams();

  const updateCourseForm = (e) => {
    setCourseForm((form) => ({ ...form, [e.target.name]: e.target.value }));
  };

  const closeCourseModal = () => {
    setIsCreatingCourse(false);
    setCourseForm(initialCourseForm);
  };

  const createCourse = useCallback(() => {
    toastRef.current = toast.loading("در حال ایجاد درس...");
    createNewCourse({
      ...courseForm,
      USER_ROLE: 2,
      professor_id: user?.id || user_id,
    })
      .then(() => {
        setCourses((courses) => [...courses, { ...courseForm }]);
        closeCourseModal();
        updateToastToSuccess(toastRef.current, "درس با موفقیت ایجاد شد.");
      })
      .catch((err) => {
        console.log(err);
        updateToastToError(toastRef.current, "خطایی در ایجاد درس رخ داد.");
      });
  }, [courseForm, user, user_id]);

  useEffect(() => {
    dispatch({ type: "show" });

    let error = null;

    getInstructorCourses(user.id)
      .then((data) => {
        data && setCourses(data);
      })
      .catch(async (err) => {
        error = await err.response.data.message;
      });

    getInstructorAnnouncements(user?.id || user_id)
      .then((data) => {
        data && setAnnouncements(data);
      })
      .catch(async (err) => {
        error = await err.response.data.message;
      });

    dispatch({ type: "hide" });
    error && toast.error(error);
  }, [dispatch, user_id, user]);

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
        <div>
          {courses.map((course) => (
            <div key={course.id} className="card">
              <div className="card__body"></div>
            </div>
          ))}
        </div>
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
            <label htmlFor="course_name">نام درس:</label>
            <input
              value={courseForm.course_name}
              onChange={updateCourseForm}
              id="course_name"
              name="course_name"
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
          <button onClick={createCourse}>ثبت</button>
          <button onClick={closeCourseModal} className="cancel">
            لغو
          </button>
        </div>
      </ReactModal>
    </main>
  );
}

export default InstructorProfile;

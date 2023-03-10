import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ReactModal from "react-modal";
import { toast } from "react-toastify";
import {
  getInstructorAnnouncements,
  createAnnouncement,
} from "../../api/http/announcement";
import { getInstructorCourses } from "../../api/http/courses";
import AnnouncementList from "../../pages/announcementList/announcementList";
import { useLoaderDispatcher } from "../../providers/loaderProvider";
import { useUser } from "../../providers/UserProvider";
import { TERM, updateToastToError, updateToastToSuccess } from "../../utils";

const initialAnnouncementForm = {
  course_id: "",
  description: "",
};

function InstructorProfile({ userData }) {
  const container = useRef();
  const toastRef = useRef();
  const [isCreatingAnnouncement, setIsCreatingAnnouncement] = useState(false);
  const [courses, setCourses] = useState([]);
  const [announcements, setAnnouncements] = useState([]);

  const [announcementForm, setAnnouncementForm] = useState(
    initialAnnouncementForm
  );

  const user = useUser();

  const dispatch = useLoaderDispatcher();

  const { user_id } = useParams();

  const updateAnnouncementForm = (e) => {
    setAnnouncementForm((form) => ({
      ...form,
      [e.target.name]: e.target.value,
    }));
  };

  const closeAnnouncementModal = () => {
    setIsCreatingAnnouncement(false);
    setAnnouncementForm(initialAnnouncementForm);
  };

  const buildAnnouncement = useCallback(() => {
    toastRef.current = toast.loading("در حال ایجاد اعلان...");
    createAnnouncement({
      ...announcementForm,
      course_id: parseInt(announcementForm.course_id),
    })
      .then((data) => {
        console.log(data);
        setAnnouncements((announcements) => [
          ...announcements,
          { ...announcementForm },
        ]);
        closeAnnouncementModal();
        updateToastToSuccess(toastRef.current, "اعلانیه با موفقیت ایجاد شد.");
      })
      .catch((err) => {
        console.log(err);
        updateToastToError(toastRef.current, "خطایی در ایجاد اعلانیه رخ داد.");
      });
  }, [announcementForm]);

  useEffect(() => {
    dispatch({ type: "show" });

    let error = null;

    setTimeout(() => {
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
    }, 2000);
  }, [dispatch, user_id, user]);

  return (
    <main className="profile padded__container" ref={container}>
      <section>
        <h1>دکتر امید جعفری نژاد</h1>
      </section>
      <section>
        <div className="section__header">
          <h2>اعلان‌ها</h2>
          {!user_id && (
            <button onClick={() => setIsCreatingAnnouncement(true)}>
              ایجاد اعلان جدید
            </button>
          )}
        </div>
        <hr />
        <AnnouncementList announcements={announcements} />
      </section>
      <section>
        <div className="section__header">
          <h2>دروس ارائه شده</h2>
        </div>
        <hr />
        <div className="announcements_wrapper">
          {courses.map((course) => (
            <Link
              to={`/course/${course.course_id}`}
              key={course.course_id}
              className="card"
            >
              <div className="data_container">
                <h3>{course.course_name}</h3>
                <p>
                  {TERM[course.term]}&nbsp;{course.year}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <ReactModal
        isOpen={isCreatingAnnouncement}
        onRequestClose={closeAnnouncementModal}
        appElement={container.current}
        className="react_modal"
      >
        <h3>ایجاد درس جدید</h3>
        <div className="modal__body announcement_form">
          <div>
            <label>درس مربوطه: </label>
            <select
              value={announcementForm.course_id}
              name="course_id"
              onChange={updateAnnouncementForm}
            >
              <option value={""} disabled>
                -- درس مربوط به اعلان را انتخاب کنید --
              </option>
              {courses.map((course) => (
                <option key={course.course_id} value={course.course_id}>
                  {course.course_name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label>توضیحات اضافه:</label>
            <textarea
              name="description"
              value={announcementForm.description}
              onChange={updateAnnouncementForm}
            />
          </div>
        </div>
        <div className="modal__footer">
          <button onClick={buildAnnouncement}>ثبت</button>
          <button onClick={closeAnnouncementModal} className="cancel">
            لغو
          </button>
        </div>
      </ReactModal>
    </main>
  );
}

export default InstructorProfile;

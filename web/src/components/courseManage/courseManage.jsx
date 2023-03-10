import { useRef, useState } from "react";
import ReactModal from "react-modal";
import { Link } from "react-router-dom";
import { TERM } from "../../utils";

const initialCourseForm = {
  course_name: "",
  year: "1402",
  term: 2,
  professor_id: 0,
};

function CourseManage({ courses, professors, onCreateCourse }) {
  const containerRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [courseForm, setCourseForm] = useState(initialCourseForm);

  const handleCourseFormChange = (e) => {
    setCourseForm((form) => ({
      ...form,
      [e.target.name]: e.target.value,
    }));
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCourseForm(initialCourseForm);
  };

  return (
    <>
      <div ref={containerRef}>
        <div className="section__header">
          <h2>مدیریت دروس</h2>
          <button onClick={() => setIsModalOpen(true)}>ایجاد درس جدید</button>
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
      </div>
      <ReactModal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        className="react_modal"
        appElement={containerRef.current}
      >
        <h3>ایجاد درس جدید</h3>
        <div className="modal__body announcement_form">
          <div>
            <label htmlFor="course_name">نام درس</label>
            <input
              id="course_name"
              name="course_name"
              value={courseForm.course_name}
              onChange={handleCourseFormChange}
            />
          </div>
          <div>
            <label htmlFor="professor_id">استاد مدرس:</label>
            <select
              id="professor_id"
              value={courseForm.professor_id}
              onChange={handleCourseFormChange}
              name="professor_id"
            >
              <option value={0}>-- لطفا مدرس را انتخاب کنید --</option>
              {professors.map((professor) => (
                <option value={professor.id}>{professor.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="year">سال تحصیلی:</label>
            <input
              id="year"
              name="year"
              value={courseForm.year}
              onChange={handleCourseFormChange}
            />
          </div>
          <div>
            <label htmlFor="term">ترم</label>
            <select
              id="term"
              name="term"
              value={courseForm.term}
              onChange={handleCourseFormChange}
            >
              {Object.entries(TERM).map(([key, value]) => (
                <option value={key}>{value}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="modal__footer">
          <button onClick={() => onCreateCourse && onCreateCourse(courseForm)}>
            ثبت
          </button>
          <button onClick={closeModal} className="cancel">
            لغو
          </button>
        </div>
      </ReactModal>
    </>
  );
}

export default CourseManage;

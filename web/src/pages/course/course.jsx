import "./course.css";
import { Link, useParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { useUser } from "../../providers/UserProvider";
import { getCourseInfo } from "../../api/http/courses";
import { TERM } from "../../utils";

function Course() {
  const { course_id } = useParams();
  const [courseData, setCourseData] = useState(null);
  const { id } = useUser();

  const canEdit = useMemo(() => {
    return courseData.course.professor_id === id;
  }, [courseData, id]);

  useEffect(() => {
    getCourseInfo(course_id).then((res) => {
      setCourseData(res);
    });
  }, [course_id]);
  return (
    courseData && (
      <div className="padded__container course__container">
        <section>
          <h1>{courseData.course_info.course_name}</h1>
          <h3>{courseData.course_info.professor_name}</h3>
          <p>
            ترم {TERM[courseData.course_info.term]}{" "}
            {courseData.course_info.year}
          </p>
        </section>
        {/* <section>
        <h2>سر‌ دستیار آموزشی</h2>
        <hr />
        <div>
          <div className="card" />
        </div>
      </section> */}
        <section>
          <h2>دستیاران آموزشی</h2>
          <hr />
          <ul className="ta__container">
            {courseData.tas.map((ta) => (
              <li key={ta.ta_id} className="card text__bold announcementCard">
                <Link to={`/student/${ta.ta_id}`} className="">
                  {ta.ta_name}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    )
  );
}

export default Course;

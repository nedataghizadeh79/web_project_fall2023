import "./course.css";
import { VOLUNTEERS } from "../../data/volunteers.data";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCourseInfo } from "../../api/http/courses";

function Course() {
  const { course_id } = useParams();
  const [courseData, setCourseData] = useState({});

  useEffect(() => {
    getCourseInfo(course_id).then((res) => {
      setCourseData(res);
    });
  }, [course_id]);
  return (
    <div className="padded__container course__container">
      <section>
        <h1>طراحی الگوریتم‌ها</h1>
        <h3>دکتر حمید ضرابی‌زاده</h3>
        <p>ترم پاییز ۱۴۰۱</p>
      </section>
      <section>
        <h2>سر‌ دستیار آموزشی</h2>
        <hr />
        <div>
          <div className="card" />
        </div>
      </section>
      <section>
        <h2>دستیاران آموزشی</h2>
        <hr />
        <div className="ta__container">
          {VOLUNTEERS.map((volunteer) => (
            <Link to={`/profile/${volunteer.id}`} className="card">
              <div className="data_container">{volunteer.name}</div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Course;

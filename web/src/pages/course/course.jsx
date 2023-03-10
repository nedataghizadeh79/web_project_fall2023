import "./course.css";
import { VOLUNTEERS } from "../../data/volunteers.data";
import { Link } from "react-router-dom";

function Course() {
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

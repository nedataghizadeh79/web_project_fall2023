import "./cardCourses.css";

const CardCourse = ({ courseName, masterName, status }) => {
  return (
    <div className="card">
      <div className="data">
        <span className="mainSpan"> نام درس: </span>{" "}
        <span className="dataSpan"> {courseName} </span>
      </div>
      <div className="data">
        <span className="mainSpan"> استاد درس: </span>{" "}
        <span className="dataSpan"> {masterName} </span>
      </div>
      <div className="data">
        <span className="mainSpan"> وضعیت درخواست دستیار آموزشی: </span>{" "}
        <span
          className={
            status === "فاقد ظرفیت"
              ? "dataSpan red-text"
              : "dataSpan green-text"
          }
        >
          {" "}
          {status}{" "}
        </span>
      </div>
    </div>
  );
};

export default CardCourse;

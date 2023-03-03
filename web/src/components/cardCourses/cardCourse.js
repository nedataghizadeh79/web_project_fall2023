import "./cardCourses.css";

const CardCourse = ({ courseName, masterName, status, clickHandler }) => {
  return (
    <div className="card">
      <div className="data_container">
        <div className="data">
          <span className="mainSpan"> نام درس: </span>{" "}
          <span className="dataSpan"> {courseName} </span>
        </div>
        <div className="data">
          <span className="mainSpan"> استاد درس: </span>{" "}
          <span className="dataSpan"> {masterName} </span>
        </div>
        {/* <div className="data">
          <span className="mainSpan"> وضعیت: </span>{" "}
          <span
            className={status ? "dataSpan green-text" : "dataSpan red-text"}
          >
            {status ? "باز" : "فاقد ظرفیت"}
          </span>
        </div> */}
      </div>
      <div className="footer_container">
        <button type="button" onClick={clickHandler}>
          ارسال
        </button>
      </div>
    </div>
  );
};

export default CardCourse;

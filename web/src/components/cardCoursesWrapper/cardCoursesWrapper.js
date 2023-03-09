import CardCourse from "../cardCourses/cardCourse";
import "./cardCoursesWrapper.css";

const CardCoursesWrapper = ({ handleClick, cardItems }) => {
  return (
    <div className="cardCoursesWrapper padded__container">
      {cardItems.map((course) => (
        <CardCourse
          key={course.course_id}
          courseName={course.course_name}
          masterName={course.professor_name}
          status={course.description}
          clickHandler={() => handleClick(course)}
        />
      ))}
    </div>
  );
};

export default CardCoursesWrapper;

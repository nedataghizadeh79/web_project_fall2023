import { fakeData } from "../../data/courses.data";
import CardCourse from "../cardCourses/cardCourse";
import "./cardCoursesWrapper.css";

const CardCoursesWrapper = ({ handleClick }) => {
  return (
    <div className="cardCoursesWrapper padded__container">
      {fakeData.map((course) => (
        <CardCourse
          key={course.id}
          courseName={course.name}
          masterName={course.instructor}
          status={course.isOpen}
          clickHandler={() => handleClick(course)}
        />
      ))}
    </div>
  );
};

export default CardCoursesWrapper;

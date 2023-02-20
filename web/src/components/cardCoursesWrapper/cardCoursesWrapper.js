import CardCourse from "../cardCourses/cardCourse";
import "./cardCoursesWrapper.css";

const fakeData = [
  {
    id: 1,
    name: "طراحی وب سایت",
    instructor: "دکتر جعفری نژاد",
    isOpen: true,
  },
  {
    id: 2,
    name: "طراحی سیستم‌های عامل خیلی سخت و پیشرفته",
    instructor: "دکتر اسدی بزرگ",
    isOpen: false,
  },
  {
    id: 3,
    name: "برنامه‌نویسی موبایل",
    instructor: "دکتر جعفری نژاد",
    isOpen: true,
  },
  {
    id: 4,
    name: "برنامه‌نویسی موبایل",
    instructor: "دکتر جعفری نژاد",
    isOpen: true,
  },
  {
    id: 5,
    name: "برنامه‌نویسی موبایل",
    instructor: "دکتر جعفری نژاد",
    isOpen: false,
  },
  {
    id: 6,
    name: "برنامه‌نویسی موبایل",
    instructor: "دکتر جعفری نژاد",
    isOpen: true,
  },
  {
    id: 7,
    name: "برنامه‌نویسی موبایل",
    instructor: "دکتر جعفری نژاد",
    isOpen: true,
  },
  {
    id: 8,
    name: "برنامه‌نویسی موبایل",
    instructor: "دکتر جعفری نژاد",
    isOpen: true,
  },
];

const CardCoursesWrapper = ({ handleClick }) => {
  return (
    <div className="cardCoursesWrapper">
      {fakeData.map((course) => (
        <CardCourse
          key={course.id}
          courseName={course.name}
          masterName={course.instructor}
          status={course.isOpen}
          clickHandler={() => handleClick(course.id)}
        />
      ))}
    </div>
  );
};

export default CardCoursesWrapper;

import { useRef } from "react";

function CourseManage() {
  const containerRef = useRef(null);
  return (
    <div ref={containerRef}>
      <h2>مدیریت دروس</h2>
      <hr />
      <div></div>
    </div>
  );
}

export default CourseManage;

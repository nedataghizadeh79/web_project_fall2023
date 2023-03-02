import { Link } from "react-router-dom";

function InstructorProfile() {
  return (
    <main className="profile padded__container">
      <section>
        <h1>دکتر امید جعفری نژاد</h1>
      </section>
      <section>
        <h2>دروس ارائه شده</h2>
        <hr />
      </section>
      <section>
        <h2>اعلان‌ها</h2>
        <hr />
        <div>
          <Link to={"/announcements"}>مشاهده همه اعلان‌ها</Link>
        </div>
      </section>
    </main>
  );
}

export default InstructorProfile;

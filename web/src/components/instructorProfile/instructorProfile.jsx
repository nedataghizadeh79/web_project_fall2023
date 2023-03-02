import { Link } from "react-router-dom";
import { JafarinezhadData } from "../../data/courses.data";
import AnnouncementList from "../../pages/announcementList/announcementList";
import AnnouncementCard from "../announcementCard/announcementCard";

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
        <AnnouncementList />
      </section>
    </main>
  );
}

export default InstructorProfile;

import { useCallback } from "react";
import AnnouncementCard from "../../components/announcementCard/announcementCard";
import { JafarinezhadData } from "../../data/courses.data";
import "./announcementList.css";

function AnnouncementList({ announcements }) {
  const handleDelete = useCallback((id) => {
    // delete the announcement
    console.error("delete", id);
  }, []);

  const handleUpdate = useCallback((id) => {
    // update the announcement
    console.warn("update", id);
  }, []);

  const handleClick = useCallback((id) => {
    // redirect to announcement
    console.log("clicked", id);
  }, []);
  return (
    <main className="announcements">
      <div className="announcements_wrapper">
        {JafarinezhadData.map((announcement) => (
          <AnnouncementCard
            key={announcement.id}
            course={announcement.name}
            createDate={announcement.createDate}
            onDelete={() => handleDelete(announcement.id)}
            onUpdate={() => handleUpdate(announcement.id)}
            onClick={() => handleClick(announcement.id)}
          />
        ))}
      </div>
    </main>
  );
}

export default AnnouncementList;

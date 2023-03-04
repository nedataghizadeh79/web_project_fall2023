import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import AnnouncementCard from "../../components/announcementCard/announcementCard";
import { JafarinezhadData } from "../../data/courses.data";
import "./announcementList.css";

function AnnouncementList({ announcements }) {
  const navigate = useNavigate();
  const handleDelete = useCallback((id) => {
    // delete the announcement
    console.error("delete", id);
  }, []);

  const handleUpdate = useCallback((id) => {
    // update the announcement
    console.warn("update", id);
  }, []);

  const handleClick = useCallback(
    (id) => {
      // redirect to announcement
      navigate(`/announcement/${id}`);
    },
    [navigate]
  );
  return (
    <div className="announcements_wrapper">
      {announcements &&
        announcements.map((announcement) => (
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
  );
}

export default AnnouncementList;

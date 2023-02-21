import { useCallback } from "react";
import "./announcementCard.css";

function AnnouncementCard({ course, createDate, onClick, onDelete, onUpdate }) {
  const handleDelete = useCallback(
    (e) => {
      e.stopPropagation();
      onDelete && onDelete();
    },
    [onDelete]
  );

  const handleUpdate = useCallback(
    (e) => {
      e.stopPropagation();
      onUpdate && onUpdate();
    },
    [onUpdate]
  );
  return (
    <div className="card announcementCard" onClick={onClick}>
      <div className="data_container announcementCard__body">
        <p>نام درس: {course}</p>
        <p>تاریخ ایجاد: {createDate}</p>
      </div>
      <div className="footer_container announcementCard__footer">
        <button type="button" className="cancel" onClick={handleDelete}>
          حذف
        </button>
        <button type="button" onClick={handleUpdate}>
          ویرایش
        </button>
      </div>
    </div>
  );
}

export default AnnouncementCard;

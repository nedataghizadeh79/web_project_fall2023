import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getAnnouncementVolunteers } from "../../api/http/announcement";
import { VOLUNTEERS } from "../../data/volunteers.data";
import { useLoaderDispatcher } from "../../providers/loaderProvider";
import "./volunteerList.css";

function VolunteerList() {
  const { id } = useParams();

  // get announcements from server using announcment_id
  const [volunteers, setVolunteers] = useState({});
  const dispatch = useLoaderDispatcher();
  useEffect(() => {
    // call http request to get announcement
    dispatch({ type: "show" });
    getAnnouncementVolunteers({ USER_ROLE: 2, announcement_id: parseInt(id) })
      .then((res) => {
        setVolunteers(res.data);
      })
      .catch(async (err) => {
        const errMessage = await err.response.data.message;
        toast.error(errMessage);
      })
      .finally(() => {
        dispatch({ type: "hide" });
      });
  }, [id, dispatch]);

  return (
    <div className="volunteer__container padded__container">
      {VOLUNTEERS.map((volunteer) => (
        <div className="card" key={volunteer.id}>
          <div className="data_container">
            <Link to={`/profile/${volunteer.id}`} className="volunteer__name">
              {volunteer.name}
            </Link>
            <hr />
            <div className="extra-info">
              <span>توضیحات اضافه:&nbsp;</span>
              <span>ریکام میخوام!!!</span>
            </div>
          </div>
          <div className="footer_container">
            <button>تایید</button>
            <button className="cancel">رد</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default VolunteerList;

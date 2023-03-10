import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  changeVolunteerState,
  getAnnouncementVolunteers,
} from "../../api/http/announcement";
import { useLoaderDispatcher } from "../../providers/loaderProvider";
import { updateToastToError, updateToastToSuccess, TERM } from "../../utils";
import "./volunteerList.css";

function VolunteerList() {
  const { id } = useParams();
  const toastRef = useRef(null);

  // get announcements from server using announcment_id
  const [volunteers, setVolunteers] = useState([]);
  const dispatch = useLoaderDispatcher();

  const getFooter = (volunteer) => {
    switch (volunteer.status) {
      case "selected":
        return <span className="badge accepted_volunteer">تایید شده</span>;
      case "rejected":
        return <span className="badge rejected_volunteer">رد شده</span>;
      default:
        return (
          <>
            <button onClick={() => resolveVolunteer(volunteer, "selected")}>
              تایید
            </button>
            <button
              className="cancel"
              onClick={() => resolveVolunteer(volunteer, "rejected")}
            >
              رد
            </button>
          </>
        );
    }
  };

  const resolveVolunteer = (volunteer, selected) => {
    // call http request to accept volunteer
    toastRef.current = toast.loading("در حال ارسال درخواست ...");
    changeVolunteerState({ id: volunteer.id, selected })
      .then((res) => {
        toast.success(res.message);
        setVolunteers((prev) =>
          prev.map((vol) =>
            vol.id === volunteer.id ? { ...vol, status: selected } : vol
          )
        );
        updateToastToSuccess(toastRef.current, "عملیات با موفقیت انجام شد");
      })
      .catch(async (err) => {
        const errMessage = await err.response.data.message;
        updateToastToError(toastRef.current, errMessage);
      });
  };

  useEffect(() => {
    // call http request to get announcement
    dispatch({ type: "show" });
    getAnnouncementVolunteers({ announcement_id: parseInt(id) })
      .then((res) => {
        setVolunteers(res);
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
    <>
      <header className="volunteer__header padded__container">
        {volunteers.length && (
          <>
            <h3>{volunteers[0].course_name}</h3>
            <h4>
              {TERM[volunteers[0].term]}&nbsp;{volunteers[0].year}
            </h4>
          </>
        )}
      </header>
      <div className="volunteer__container padded__container">
        {volunteers.map((volunteer) => (
          <div className="card" key={volunteer.id}>
            <div className="data_container">
              <Link
                to={`/user/${volunteer.student_id}`}
                className="volunteer__name"
              >
                {volunteer.student_name}
              </Link>
              <hr />
              <div className="extra-info">
                <span className="text__bold">توضیحات اضافه:&nbsp;</span>
                <span>{volunteer.extra_info || "-"}</span>
              </div>
            </div>
            <div className="footer_container">{getFooter(volunteer)}</div>
          </div>
        ))}
      </div>
    </>
  );
}

export default VolunteerList;

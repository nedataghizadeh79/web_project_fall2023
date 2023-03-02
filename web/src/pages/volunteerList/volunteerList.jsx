import { Link, useParams } from "react-router-dom";
import { VOLUNTEERS } from "../../data/volunteers.data";
import "./volunteerList.css";

function VolunteerList() {
  const { id } = useParams();

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

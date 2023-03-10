import "./mainPage.css";
import CardCoursesWrapper from "../../components/cardCoursesWrapper/cardCoursesWrapper";
import ReactModal from "react-modal";
import { useCallback, useEffect, useState } from "react";
import { useRef } from "react";
import { toast } from "react-toastify";
import { getAllAnnouncements, volunteerForAnnouncement } from '../../api/http/announcement';
import { updateToastToError, updateToastToSuccess } from "../../utils";

const MainPage = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [extraInfo, setExtraInfo] = useState("");
  const [isModalOpen, setIsOpen] = useState(false);
  const container = useRef();

  const toastRef = useRef(null);

  const handleClick = useCallback((course) => {
    setSelectedCourse(course);
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setSelectedCourse(null);
    setExtraInfo("");
    setIsOpen(false);
  }, []);

  useEffect(() => {
    getAllAnnouncements()
      .then(data => {
        data && setAnnouncements(data);
      }).catch(err => {
        console.log(err);
      })
  }, [])

  const volunteerForCourse = useCallback(async () => {
    toastRef.current = toast.loading("در حال ارسال...")
    volunteerForAnnouncement({ course_id: selectedCourse.id, extra_info: extraInfo })
      .then((res) => {
        closeModal();
        updateToastToSuccess(toastRef.current, "درخواست با موفقیت ارسال شد.");
      })
      .catch(async (err) => {
        const data = await err.response.data.message;
        updateToastToError(toastRef.current, data);
      })
  }, [closeModal, extraInfo, selectedCourse]);

  return (
    <div ref={container}>
      <section className="header"></section>
      <CardCoursesWrapper handleClick={handleClick} cardItems={announcements} />
      <ReactModal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        className="react_modal"
        appElement={container.current}
      >
        <div className="modal__body">
          <h2>{selectedCourse?.name}</h2>
          <p><span className="text__bold">توضیحات استاد:&nbsp;</span>{selectedCourse?.description}</p>
          <textarea
            value={extraInfo}
            id="extraInfo"
            onChange={(e) => setExtraInfo(e.target.value)}
            placeholder="در صورتی که توضیح اضافه‌ای برای استاد دارید در اینجا وارد کنید"
            className="extra_info"
          />
        </div>

        <div className="modal__footer">
          <button onClick={volunteerForCourse}>ارسال</button>
          <button onClick={closeModal} className="cancel">
            لغو
          </button>
        </div>
      </ReactModal>
    </div>
  );
};

export default MainPage;

import "./mainPage.css";
import CardCoursesWrapper from "../../components/cardCoursesWrapper/cardCoursesWrapper";
import ReactModal from "react-modal";
import { useCallback, useState } from "react";
import { useRef } from "react";
import { volunteerForAnnouncement } from "../../api/announcement/volunteerForAnnouncement";
import { toast } from "react-toastify";
import { updateToastToError, updateToastToSuccess } from "../../utils";

const MainPage = () => {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [extraInfo, setExtraInfo] = useState("");
  const [isModalOpen, setIsOpen] = useState(false);
  const container = useRef();

  const handleClick = useCallback((course) => {
    setSelectedCourse(course);
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setSelectedCourse(null);
    setExtraInfo("");
    setIsOpen(false);
  }, []);

  const volunteerForCourse = useCallback(async () => {
    // toast.promise(volunteerForAnnouncement({ course_id: selectedCourse.course_id, extra_info: extraInfo }),
    //   {
    //     pending: "در حال ارسال...",
    //     success: {
    //       render() {
    //         closeModal();
    //         return "درخواست با موفقیت ارسال شد"
    //       }
    //     },
    //     error: {
    //       async render({ data }) {
    //         const message = await data.response.data.message;
    //         return message
    //       }
    //     }
    //   })
    const pend = toast.loading("در حال ارسال...")
    volunteerForAnnouncement({ course_id: selectedCourse.course_id, extra_info: extraInfo })
      .then((res) => {
        closeModal();
        updateToastToSuccess(pend, "درخواست با موفقیت ارسال شد.");
      })
      .catch(async (err) => {
        const data = await err.response.data.message;
        updateToastToError(pend, data);
      })
  }, [closeModal, extraInfo, selectedCourse]);

  return (
    <div ref={container}>
      <section className="header"></section>
      <CardCoursesWrapper handleClick={handleClick} />
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

import { useCallback, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getUserById } from "../../api/http/auth";
import AdminPanel from "../../components/adminPanel/adminPanel";
import InstructorProfile from "../../components/instructorProfile/instructorProfile";
import StudentProfile from "../../components/studentProfile/studentProfile";
import { useUser } from "../../providers/UserProvider";
import "./profile.css";

function Profile() {
  const [userData, setUserData] = useState({})
  const loggedUser = useUser();
  const { user_id } = useParams();


  useEffect(() => {
    if (user_id) {
      getUserById(user_id).then(res => {
        setUserData(res);
      }).catch(async (err) => {
        const res = await err.response.data.message;
        toast.error(res);
      })
    } else {
      setUserData(loggedUser);
    }
  }, [user_id, loggedUser])

  // useEffect(() => {
  //   setUserData(loggedUser);
  // }, []);



  const getProfile = useCallback(() => {
    if (user_id) {
      return <StudentProfile userData={userData} />
    }
    switch (userData.roles) {
      case 1:
        return <StudentProfile userData={userData} />;
      case 2:
        return <InstructorProfile userData={userData} />
      case 3:
        return <AdminPanel userData={userData} />
      default:
        return null
    }
  }, [userData]);

  return getProfile();
}

export default Profile;
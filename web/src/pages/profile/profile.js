import { useCallback, useMemo } from "react";
import { useParams } from "react-router-dom";
import AdminPanel from "../../components/adminPanel/adminPanel";
import InstructorProfile from "../../components/instructorProfile/instructorProfile";
import StudentProfile from "../../components/studentProfile/studentProfile";
import { useUser } from "../../providers/UserProvider";
import "./profile.css";

function Profile() {
  const userData = useUser();
  const { user_id } = useParams();

  const profileRole = useMemo(() => {
    return user_id || userData.roles;
  }, [userData, user_id]);

  const getProfile = useCallback(() => {
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
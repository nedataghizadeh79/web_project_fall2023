import { useCallback, useMemo } from "react";
import { useParams } from "react-router-dom";
import InstructorProfile from "../../components/instructorProfile/instructorProfile";
import StudentProfile from "../../components/studentProfile/studentProfile";
import { useUser } from "../../providers/UserProvider";
import "./profile.css";

function Profile() {
  const { roles } = useUser();
  const { user_id } = useParams();

  const profileRole = useMemo(() => {
    return user_id || roles;
  }, [roles, user_id]);

  const getProfile = useCallback(() => {
    switch (roles) {
      case 1:
        return <StudentProfile />;
      case 2:
        return <InstructorProfile />
      default:
        return null
    }
  }, [roles]);

  return getProfile();
}

export default Profile;
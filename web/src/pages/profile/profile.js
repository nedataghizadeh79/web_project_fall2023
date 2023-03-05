import { useCallback } from "react";
import InstructorProfile from "../../components/instructorProfile/instructorProfile";
import StudentProfile from "../../components/studentProfile/studentProfile";
import { useUser } from "../../providers/UserProvider";
import "./profile.css";

function Profile() {
  const { roles } = useUser();
  // return <StudentProfile />

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
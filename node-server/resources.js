export const messages = {
  teaching_assistant_accept: (course_name, acception_status) => {return acception_status?
    "your request to become TA for course {$course_name} has been accepted":
    "your request to become TA for course {$course_name} has been rejected";
  }
}
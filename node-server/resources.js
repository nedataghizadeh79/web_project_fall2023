export const messages = {
  teaching_assistant_accept: (course_name, acception_status) => {return acception_status?
    "your request to become TA for course {$course_name} has been accepted":
    "your request to become TA for course {$course_name} has been rejected";
  }
}

export const constants = {
  course_does_not_exist:
  "این درس وجود ندارد",
  voluntary_request_created:
  "درخواست دستیاری با موفقیت ثبت شد",
  internal_server_error:
  "مشکلی در پردازش درخواست شما وجود داشت",
  announcement_created:
  "اعلامیه جذب دستیار با موفقیت منتشر شد",
  role_does_not_match:
  "شما مجاز به ارسال این درخواست نیستید",
}
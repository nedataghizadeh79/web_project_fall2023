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
  not_signed_in:
  "برای استفاده از سرویس باید وارد حساب کاربری خود شوید",
  token_expired:
  "اعتبار نشست شما تمام شده است. برای استفاده از سرویس لازم است دوباره وارد شوید.",
  user_not_found:
  "حساب کاربری وجود ندارد.",
  account_created:
  "حساب کاربری شما با موفقیت ساخته شد",
  success:
  "عملیات با موفقیت انجام شد",
  user_already_exists:
  "حسابی با این نام کاربری وجود دارد"
}

export const responseUtils = {
  server_error: function (error, res) {
    console.log(error);
    res.status(500).send(constants.internal_server_error);
  },
  request_error: function (error, res) {
    // ???
    res.status(404).send(error);
  },
  forbidden: function (res) {
    res.status(403).send({
      message: constants.role_does_not_match,
    });
  },
  unauthorized: function (res){
    res.status(401).send({
      message: constants.not_signed_in
    })
  },
  not_found: function (res, description){
    res.status(404).send({
      message: description || constants.user_not_found
    });
  }

}
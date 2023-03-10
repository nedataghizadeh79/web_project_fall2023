export const messages = {
  teaching_assistant_accept: (course_name, acception_status) => {return acception_status?
    `درخواست دستیاری شما برای درس ${course_name} توسط استاد پذیرفته شد.`:
    `درخواست دستیاری شما برای درس ${course_name} پذیرفته نشد.`;
  },
  head_ta_selected: (course_name) => {
    return `شما به عنوان سردستیار درس ${course_name} انتخاب شدید.`
  },
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
  "حسابی با این نام کاربری وجود دارد",
  wrong_user_password:
  "نام کاربری یا رمز عبور وارد شده اشتباه است",
  not_your_volunteer:
  "این درخواست مربوط به درس شما نیست!",
  ta_selection_push_title:
  "دستاد: انتخاب تی ای"
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
  },
  conflict: function (res, existing_entity_name){
    res.status(409).send({
      message:
      `${existing_entity_name || 'موجودیت'} از قبل وجود دارد`
    })
  }

}
import * as handlers from "./handlers.js";
import express from "express";
import bodyParser from "body-parser";
import webpush from "web-push";
import {
  sign_in_validation_rules,
  sign_up_validation_rules,
  create_announcement_validation_rules,
  voluntary_validation_rules,
  change_user_role_validation_rules,
  write_comment_validation_rules,
  validate,
} from "./validators.js";
import * as validators from "./validators.js";
import { sign_in, sign_up, logout, authJwt } from "./auth.js";
import cookieSession from "cookie-session";
import cors from 'cors';
import { responseUtils } from "./resources.js";
const app = express();
const port = 8080;
//storing the keys in variables
const publicVapidKey = 'BBjA76bD2-HNsufU7HT94uyT9Y69rhD5XQlaI1p39wc-TT_yaR_dJgAghsKSXQaJ2ePvdEqVCKbPFN28wYHYUYo';
const privateVapidKey = '8hSrDUxDosJ6SU9GU67JhOzw7Z2fQQyGyDfmO8AOPcU';

//setting vapid keys details
webpush.setVapidDetails('mailto:shhm3834@gmail.com', publicVapidKey, privateVapidKey);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cookieSession({
    name: "bezkoder-session",
    secret: "COOKIE_SECRET", // should use as secret environment variable
    httpOnly: true
  })
);
app.use(cors({
  origin: "*",
}));

const ignore_auth = ["/sign_up", "/sign_in"];

const check_user = async function (req, res, next) {
  if (ignore_auth.includes(req.url)) {
    req.body.USER_ID = -1;
    req.body.USER_ROLE = -1;
  } else {
    try{
      const user = await authJwt.verifyToken(req, res);
      req.body.USER_ID = user.id;
      req.body.USER_ROLE = user.role;
    }catch (error){
      return responseUtils.unauthorized(res);
    }
  }
  next();
};

app.post("*", check_user);

// test database connection
app.get("/runs", handlers.test_runs);

app.post("/sign_up", sign_up_validation_rules(), validate, sign_up);

app.post("/sign_in", sign_in_validation_rules(), validate, sign_in);

// not implemented
app.post("/logout", logout);

app.post('/create_announcement', create_announcement_validation_rules(), validate, handlers.create_announcement);

app.post('/edit_announcement', validators.edit_announcement_validation_rules(), validate, handlers.edit_announcement);

app.post('/delete_announcement', validators.delete_announcement_validation_rules(), validate, handlers.delete_announcement);

app.post('/volunteer', voluntary_validation_rules(), validate, handlers.volunteer);

app.get('/view_announcements', handlers.view_announcements);

app.post('/view_announcements_by_instructor', handlers.view_announcements_by_instructor);

app.post('/view_all_course_data', handlers.view_all_course_data);

app.post('/change_user_role', change_user_role_validation_rules(), validate, handlers.change_role);

app.post('/write_comment', write_comment_validation_rules(), validate, handlers.write_comment);

app.post('/comments', validators.find_comments_by_ta_validation_rules(), validate, handlers.find_comments);

app.post('/view_volunteers', validators.view_volunteers_validation_rules(), validate, handlers.view_volunteers);

app.post('/create_course', validators.create_course_validation_rules(), validate, handlers.create_course);

// create readAlert - ta
app.post('/create_red_alert', validators.create_red_alert_validation_rules(), validate, handlers.create_red_alert);

app.post('/view_red_alerts', validators.view_red_alerts_validation_rules(), validate, handlers.view_red_alerts);

app.post('/view_red_alert_docs', validators.view_red_alert_docs_validation_rules(), validate, handlers.view_red_alert_docs);

app.post('/approve_red_alert', validators.approve_red_alert_validation_rules(), validate, handlers.approve_red_alert);

app.post('/select_ta', validators.select_ta_validation_rules(), validate, handlers.select_ta);

app.post('/select_head_ta', validators.select_head_ta_validation_rules(), validate, handlers.select_head_ta);

app.post('/view_student_comments', validators.view_student_comments_validation_rules(), validate, handlers.view_student_comments);

app.post('/view_course_info', validators.view_course_info_validation_rules(), validate, handlers.view_course_info);

// app.post('/ta_history', handlers.student_resume);

app.post('/upload', handlers.upload_file);

app.get('/media/:name', handlers.get_file);
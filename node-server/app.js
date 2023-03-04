import * as handlers from "./handlers.js";
import express from "express";
import bodyParser from "body-parser";
import {
  sign_in_validation_rules,
  sign_up_validation_rules,
  create_announcement_validation_rules,
  voluntary_validation_rules,
  change_user_role_validation_rules,
  validate,
} from "./validators.js";
import { sign_in, sign_up, logout, authJwt } from "./auth.js";
import cookieSession from "cookie-session";
import cors from 'cors';
const app = express();
const port = 8080;

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

const get_user_from_auth = function (token, res) {
  authJwt.verifyToken(token, res);
};
const check_user = function (req, res, next) {
  if (ignore_auth.includes(req.url)) {
    req.header.USER_ID = -1;
    req.header.USER_ROLE = -1;
  }
  else {
    get_user_from_auth(req, res);
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

app.post('/volunteer', voluntary_validation_rules(), validate, handlers.volunteer);

app.get('/view_announcements', handlers.view_announcements);

app.post('/view_announcements_by_instructor', handlers.view_announcements_by_instructor);

app.post('/view_all_course_data', handlers.view_all_course_data);

app.post('/change_user_role', change_user_role_validation_rules(), validate, handlers.change_role);







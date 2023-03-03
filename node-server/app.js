import * as handlers from "./handlers.js";
import express from "express";
import bodyParser from "body-parser";
import {
  sign_in_validation_rules,
  sign_up_validation_rules,
  create_announcement_validation_rules,
  validate,
} from "./validators.js";
import { sign_in, sign_up, user, logout } from "./auth.js";
const app = express();
const port = 3000;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const ignore_auth = ["/sign_up", "/sign_in", "/create_announcement", "/volunteer", "/view_announcements"];

const get_user_from_auth = async function (token) {
    let user_result = await user();
    if (user_result.status !== 200){
        return -1;
    }
    return parseInt(user_result.body.userId);
};
const check_user = function (req, res, next) {
  console.log("bypass token");
  if (ignore_auth.includes(req.url)) {
    req.body.USER = 1;
    req.body.ROLE = 'instructor';
    next();
  }
};

app.post("*", check_user);

// test database connection
app.get("/runs", handlers.test_runs);

app.post("/sign_up", sign_up_validation_rules(), validate, sign_up);

app.post("/sign_in", sign_in_validation_rules(), validate, sign_in);

app.post("/logout", logout);

// create_announcement_validation_rules, validate
app.post('/create_announcement', handlers.create_announcement);

app.post('/volunteer', handlers.volunteer);

app.get('/view_announcements', handlers.view_announcements);










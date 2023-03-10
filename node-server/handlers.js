import {
  test_database,
  create_announcement_database,
  get_all_announcements,
  get_announcements_by_professor_id,
  find_all_course_data,
  find_user_by_id,
  change_user_role,
  Account, Course, CourseTA, CourseInfo, CourseTAView,
} from "./model.js";
import * as model from "./model.js";
import { validationResult } from "express-validator";
import webpush from "web-push";
import axios from "axios";
import { messages, responseUtils } from "./resources.js";
import { constants } from "./resources.js";

import multer from 'multer';
import path from 'path';


const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'media/');
  },

  // By default, multer removes file extensions so let's add them back
  filename: function(req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const validation = function (req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
};

const server_error = function (error, res) {
  console.log(error);
  res.status(500).send(constants.internal_server_error);
};

const request_error = function (error, res) {
  res.status(404).send(error);
};

export const test_runs = function (req, res) {
  let result = test_database();
  result.then(
    (value) => {
      res.send("database connection success!");
    },
    (error) => {
      server_error(error, res);
    }
  );
};

export const view_accounts_info = async function (req, res){
  try{
    const accounts = await model.AccountInfoView.findAll();
    res.send(accounts);
  }catch (error){
    responseUtils.server_error(error, res);
  }
}

export const create_announcement = async function (req, res) {
  try {
    const {USER_ID, course_id, description} = req.body;
    const course = await model.Course.findOne({where: {id: course_id, professor_id: USER_ID}});
    if (!course) {
      return responseUtils.not_found(res, constants.course_does_not_exist);
    }
    const existing_announcement = await model.AnnouncementView.findOne({where: {course_id: course_id, professor_id: USER_ID}});
    if (existing_announcement){
      return responseUtils.conflict(
        res,
        'اعلامیه جذب دستیار'
      );
    }
    const announcement = await create_announcement_database(
      course_id,
      description
    );
    res.send(announcement);
  } catch (error) {
    server_error(error, res)
  }
}

export const edit_announcement = async function (req, res){
  try {
    const {USER_ID, id, description} = req.body;
    const existing_announcement = await model.AnnouncementView.findOne({where: {id: id, professor_id: USER_ID}});
    if (! existing_announcement){
      return responseUtils.not_found(
        res,
        'اعلامیه وجود ندارد'
      );
    }
    const announcement = await model.Announcement.findByPk(id);
    announcement.description = description;
    await announcement.save();
    res.send(announcement);
  } catch (error) {
    server_error(error, res)
  }
}

export const delete_announcement = async function (req, res){
  try{
    const {USER_ID, id} = req.body;
    const existing_announcement = await model.AnnouncementView.findOne({where: {id: id, professor_id: USER_ID}});
    if (! existing_announcement){
      return responseUtils.not_found(
        res,
        'اعلامیه وجود ندارد'
      );
    }
    const announcement = await model.Announcement.findByPk(id);
    await announcement.destroy();
    res.send(constants.success);
  }catch (error){
    responseUtils.server_error(error, res);
  }
}

export const volunteer = async function (req, res) {
  try {
    const {course_id, USER_ID, extra_info} = req.body;
    const announcement = await model.Announcement.findByPk(course_id);
    if (!announcement) {
      return responseUtils.not_found(res);
    }
    const voluntary = await model.create_volunteer_database(
      USER_ID,
      course_id,
      extra_info
    );
    res.send(voluntary);
  } catch (error) {
    server_error(error, res);
  }
}

export const professor_accept_reject = async function (req, res) {
  try {
    const volunteers = await db.get_volunteer(req.body.volunteer_id);
    if (volunteers.length === 0 || !volunteers[0].presentation_id in professor_presentations_ids) {
      return request_error("invalid volunteer", res);
    }
    const volunteer = volunteers[0];
    const presentations = db.get_presentation(req.body.presentation_id);
    const presentation = presentations[0];
    if (presentation.professor_id !== req.USER.id) {
      return request_error("invalid volunteer", res);
    }
    const courses = db.get_course(presentation.course_id);
    const course = courses[0];
    const professor_presentations = await db.get_professor_presentations(req.USER.id);
    const professor_presentations_ids = professor_presentations.reduce(function (accumulator, curValue) { return accumulator.concat(curValue.presentation_id) });
    await db.change_volunteer_status(volunteer.student_id, req.body.acception_status);
    send_push(volunteer.student_id, messages.teaching_assistant_accept(course.name, req.body.acception_status));
    res.send("success!");
  } catch (error) {
    server_error(error, res);
  }
}

export const view_announcements = async function (req, res) {
  try {
    const announcements = await get_all_announcements();
    res.send(announcements);
  } catch (error) {
    server_error(error, res);
  }
}

export const view_announcements_by_instructor = async function (req, res) {
  try {
    const announcements = await get_announcements_by_professor_id(req.body.USER_ID);
    res.send(announcements);
  } catch (error) {
    server_error(error, res);
  }
}

export const view_all_course_data = async function (req, res) {
  // todo: instructor_id does not exist
  try {
    const course_datas = await find_all_course_data(req.body.instructor_id);
    res.send(course_datas);
  } catch (error) {
    server_error(error, res);
  }
}

export const change_role = async function (req, res) {
  try {
    const account = await find_user_by_id(req.body.user_id);
    if (account) {
      await change_user_role(req.body.user_id, req.body.role);
      res.send(constants.success);
    }
    else {
      return responseUtils.not_found(res, constants.user_not_found);
    }
  } catch (error) {
    server_error(error, res)
  }
}

export const write_comment = async function (req, res) {
  try {
    const ta = await model.get_ta_by_id(req.body.ta_id);
    if (!ta) {
      responseUtils.not_found(res, "TA not found");
    }
    const course = model.get_course_by_id(req.body.course_id);
    if (!course) {
      responseUtils.not_found(res, "Course not found");
    }
    const { ta_id, comment, rate } = req.body;
    if (course.instructor === req.body.USER_ID) {
      await model.insert_instructor_feedback(
        course.instructor, course.id, ta_id, comment, rate
      );
    }
    else if (course.head_ta === req.body.USER_ID) {
      await model.insert_head_ta_feedback(
        course.head_ta, course.id, ta_id, comment, rate
      );
    }
    else {
      responseUtils.forbidden(res);
    }
  } catch (error) {
    responseUtils.server_error(error, res);
  }
}

export const find_comments = async function (req, res) {
  const { ta_id } = req.body;
  const head_comments = model.HeadFeedback.findAll(
    {
      where: {
        ta_id: ta_id
      }
    }
  );
  const instructor_comments = model.ProfessorFeedback.findAll(
    {
      where: {
        ta_id: ta_id
      }
    }
  );
  const comments = [...(await head_comments), ...(await instructor_comments)];
  res.send(comments);
}

export const view_volunteers = async function (req, res) {
  let query;
  const {announcement_id, USER_ROLE, USER_ID} = req.body;
  if (USER_ROLE === 3) {
    query = {
      where: {
        announcement_id: announcement_id
      }
    }
  }
  else if (USER_ROLE === 2) {
    query = {
      where: {
        announcement_id: announcement_id,
        professor_id: USER_ID,
      }
    }
  }
  else if (USER_ROLE === 1) {
    query = {
      where: {
        announcement_id: announcement_id,
        student_id: USER_ID,
      }
    }
  }
  const volunteers = await model.VoluntaryList.findAll(query);
  res.send(volunteers);
}

export const create_course = async function (req, res) {
  try {
    const { year, term, professor_id, course_name } = req.body;
    model.create_course(year, term, professor_id, course_name).then(
      (value) => {
        res.send(value);
      }, (error) => {
        res.send(error);
      }
    );
  } catch (error) {
    responseUtils.server_error(error, res);
  }
}

export const create_red_alert = async function (req, res) {
  try {
    const { course_id, ta_id, comment, documents } = req.body;
    await model.create_red_alert(course_id, ta_id, comment, documents);
    res.send(constants.success);
  } catch (error) {
    responseUtils.server_error(error, res);
  }
}

export const view_red_alerts = async function (req, res) {
  try {
    const role = req.body.USER_ROLE;
    let query;
    if (role === 2) {
      query = {
        where: {
          professor_id: req.body.USER_ID
        }
      }
    }
    if (role === 3) {
      query = {
        where: {

        }
      }
    }
    const red_alerts = await model.find_red_alerts(query);
    res.send(red_alerts);
  } catch (error) {
    responseUtils.server_error(error, res);
  }
}

export const view_red_alert_docs = async function (req, res) {
  try {
    const red_alert_docs = await model.view_red_alert_docs(req.body.red_alert_id);
    res.send(red_alert_docs);
  } catch (error) {
    responseUtils.server_error(error, res);
  }
}

export const approve_red_alert = async function (req, res) {
  try {
    const red_alert = await model.find_red_alert_by_id(req.body.red_alert_id);
    if (!red_alert) {
      return responseUtils.not_found(res);
    }
    red_alert.professor_approval = true;
    await red_alert.save();
    res.send(red_alert);
  } catch (error) {
    responseUtils.server_error(error, res);
  }
}

export const select_ta = async function (req, res){
  try {
    const {id, USER_ID, selected} = req.body;
    const voluntary_view = await model.VoluntaryList.findOne({where:{id: id, professor_id: USER_ID}});
    if (!voluntary_view){
      return responseUtils.not_found(res, constants.not_your_volunteer);
    }
    const voluntary = await model.Voluntary.findByPk(id);
    voluntary.status = selected;
    await voluntary.save();
    res.send(constants.success);
    push_to_user(voluntary_view.student_id, constants.ta_selection_push_title, messages.teaching_assistant_accept(voluntary_view.course_name, selected==='selected'));
  }catch (error){
    responseUtils.server_error(error, res);
  }
}

export const select_head_ta = async function (req, res){
  try{
    const {id, USER_ID} = req.body;
    const voluntary_view = await model.VoluntaryList.findOne({where:{id: id, professor_id: USER_ID}});
    if (!voluntary_view){
      return responseUtils.not_found(res, constants.not_your_volunteer);
    }
    const voluntary = await model.Voluntary.findByPk(id);
    voluntary.status = 'selected';
    const course = await Course.findByPk(voluntary_view.course_id);
    course.head_ta = voluntary_view.student_id;
    await course.save();
    await voluntary.save();
    res.send(constants.success);
    push_to_user(voluntary_view.student_id, constants.ta_selection_push_title, messages.head_ta_selected(voluntary_view.course_name));
  }catch (error){
    responseUtils.server_error(error, res);
  }
}

export const view_student_comments = async function (req, res){
  try{
    const{id} = req.body;
    const head_comments = await model.HeadCommentView.findAll({where: {id: id}});
    const instructor_comments = await model.InstructorCommentView.findAll({where: {id: id}});
    res.send({'head_comments': head_comments, 'instructor_comments': instructor_comments});
  }catch (error){
    responseUtils.server_error(error, res);
  }
}

export const upload_file = async function (req, res) {
  let upload = multer({ storage: storage }).single('file');

  upload(req, res, function(err) {
    // req.file contains information of uploaded file
    // req.body contains information of text fields, if there were any
    if (err instanceof multer.MulterError) {
      return res.send(err);
    }
    else if (err) {
      return res.send(err);
    }

    // Display uploaded image for user validation
    res.send(`You have uploaded this image: <hr/><img src="${req.file.path}" width="500"><hr /><a href="./">Upload another image</a>`);
  });
}

export const get_file = async function (req, res) {
  const options = {
    root: path.join("./")
  };
  return res.sendFile("./media/" + req.params.name, options);
}

export const student_resume = async function (req, res){
  try {

  }catch (error) {
    responseUtils.server_error(error, res);
  }
}

export const view_course_info = async function (req, res) {
  try {
    const {course_id} = req.body;
    const course = await model.Course.findByPk(course_id);
    if (!course){
      return responseUtils.not_found(
        res,
        'درس وجود ندارد'
      );
    }
    const tas = await CourseTAView.findAll({where: {course_id: course_id}});
    const course_info = await model.CourseInfo.findByPk(course_id);
    res.send({
      course_info,
      tas
    })
   } catch (error) {
    responseUtils.server_error(error, res);
  }
}

const push_client = async function (client, title, body) {
  //get push subscription object from the request
  console.log(client);
  const subscription = JSON.parse(client);
  console.log(subscription);

  //create paylod: specified the detals of the push notification
  const payload = JSON.stringify({ title: title, customBody: body });

  //pass the object into sendNotification fucntion and catch any error
  webpush.sendNotification(subscription, payload).catch(err => console.error(err));
}

export const push_to_user = async function (user_id, subject, body) {
  try {
    const receiver = await model.PushReceiver.findOne(
      {
        where: {
          user_id: user_id
        }
      }
    );
    if (!receiver){
      return;
    }
    // dont need await
    push_client(receiver.body, subject, body);
  } catch (error) {
    console.log(error);
  }
}
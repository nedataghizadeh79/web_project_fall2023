import {
  test_database,
  getCoursesById,
  create_announcement_database,
  create_volunteer_database,
  get_all_announcements,
  get_announcements_by_professor_id,
  find_all_course_data,
  find_user_by_id,
  change_user_role,
  Account,
} from "./model.js" ;
import * as model from "./model.js";
import { validationResult } from "express-validator";
import axios from "axios";
import {messages, responseUtils} from "./resources.js";
import {constants} from "./resources.js";

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

/*
  a professor
  defines an announcement
  for a course that they teach
  with a description


  req: description, presentation_id, USER(set in request){id, ROLE}
 */
export const create_announcement = async function (req, res){
  try{
    const courses = await getCoursesById(req.body.course_id);
    if (courses.length === 0){
      return request_error(constants.course_does_not_exist, res);
    }
    create_announcement_database(
      req.body.course_id,
      req.body.description
    ).then(
      (value) => {
        res.send(constants.announcement_created);
      },
      (error) => {
        throw error;
      }
    );
  }catch (error){
    server_error(error, res)
  }
}

/*
  a student
  requests to become ta
  for a presentation

  req: presentation,
*/

export const volunteer = async function (req, res) {
  try{
    const courses = await getCoursesById(req.body.course_id);
    if (courses.length === 0){
      return request_error(constants.course_does_not_exist, res);
    }
    create_volunteer_database(
      req.body.USER,
      req.body.course_id,
    ).then(
      (value) => {
        res.send(constants.voluntary_request_created);
      },
      (error) => {
        throw error;
      }
    );
  }catch (error){
    server_error(error, res);
  }
}

/*


req: volunteer_id, result
 */
export const professor_accept_reject = async function (req, res){
  try {
    const volunteers = await db.get_volunteer(req.body.volunteer_id);
    if (volunteers.length === 0 || ! volunteers[0].presentation_id in professor_presentations_ids){
      return request_error("invalid volunteer", res);
    }
    const volunteer = volunteers[0];
    const presentations = db.get_presentation(req.body.presentation_id);
    const presentation = presentations[0];
    if (presentation.professor_id !==  req.USER.id){
      return request_error("invalid volunteer", res);
    }
    const courses = db.get_course(presentation.course_id);
    const course = courses[0];
    const professor_presentations = await db.get_professor_presentations(req.USER.id);
    const professor_presentations_ids = professor_presentations.reduce(function (accumulator, curValue) {return accumulator.concat(curValue.presentation_id)});
    await db.change_volunteer_status(volunteer.student_id, req.body.acception_status);
    send_push(volunteer.student_id, messages.teaching_assistant_accept(course.name, req.body.acception_status));
    res.send("success!");
  } catch (error){
    server_error(error, res);
  }
}

export const view_announcements = async function (req, res){
  try{
    const announcements = await get_all_announcements();
    res.send(announcements);
  }catch (error){
    server_error(error, res);
  }
}
/*

  logic:
    a professor
    writes feedback

 */

export const student_write_feedback = async function (req, res){

}


export const view_announcements_by_instructor = async function (req, res){
  try{
    const announcements = await get_announcements_by_professor_id(req.body.USER);
    res.send(announcements);
  }catch (error){
    server_error(error, res);
  }
}

export const view_all_course_data = async function (req, res) {
  try {
    const course_datas = await find_all_course_data();
    res.send(course_datas);
  }catch (error){
    server_error(error, res);
  }
}

export const change_role = async function (req, res){
  try{
    const account = await find_user_by_id(req.body.user_id);
    if (account){
      await change_user_role(req.body.user_id, req.body.role);
      res.send(constants.success);
    }
    else{
      return responseUtils.not_found(res, constants.user_not_found);
    }
  }catch (error){
    server_error(error, res)
  }
}

export const write_comment = async function (req, res){
  try{
    const ta = await model.get_ta_by_id(req.body.ta_id);
    if (! ta){
      responseUtils.not_found(res, "TA not found");
    }
    const course = model.get_course_by_id(req.body.course_id);
    if (! course){
      responseUtils.not_found(res, "Course not found");
    }
    const {ta_id, comment, rate} = req.body;
    if (course.instructor === req.body.USER_ID){
      await model.insert_instructor_feedback(
        course.instructor, course.id, ta_id, comment, rate
      );
    }
    else if (course.head_ta === req.body.USER_ID){
      await model.insert_head_ta_feedback(
        course.head_ta, course.id, ta_id, comment, rate
      );
    }
    else{
      responseUtils.forbidden(res);
    }
  }catch (error){
    responseUtils.server_error(error, res);
  }
}

export const find_comments = async function (req, res){
  const {ta_id} = req.body;
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

export const view_volunteers = async function (req, res){
  let query;
  if (req.body.USER_ROLE === 3){
    query = {
      where: {
      }
    }
  }
  else if (req.body.USER_ROLE === 2){
    query = {
      where: {
        professor_id: req.body.USER_ID
      }
    }
  }
  else if (req.body.USER_ROLE === 1){
    query = {
      where: {
        student_id: req.body.USER_ID
      }
    }
  }
  const volunteers = await model.VoluntaryList.findAll(query);
  res.send(volunteers);
}

export const create_course = async function (req, res){
  try {
    const {year, term, professor_id, course_name} = req.body;
    model.create_course(year, term, professor_id, course_name).then(
      (value) => {
        res.send(value);
      }, (error) => {
        res.send (error);
      }
    );
  }catch (error){
    responseUtils.server_error(error, res);
  }
}
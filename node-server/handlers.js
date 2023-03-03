import {
  test_database,
  getCoursesById,
  create_announcement_database,
  create_volunteer_database,
  get_all_announcements
} from "./model.js";
import { validationResult } from "express-validator";
import axios from "axios";
import {messages} from "./resources.js";
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

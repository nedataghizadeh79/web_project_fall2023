import {DataTypes, Op, Sequelize, where} from 'sequelize';

/*
voluntary status:
[pending, rejected, accepted]
*/

/*
user roles: 
[student, instructor, admin]
*/

const sequelize = new Sequelize('postgres://postgres:postgres@localhost:5432/dastad') // Example for postgres

const dbOpts = function (db_name) {
    return {
        tableName: db_name, createdAt: false, updatedAt: false,
    }
};

export const Announcement = sequelize.define('announcement', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    course_id: DataTypes.INTEGER,
    description: DataTypes.STRING,
}, dbOpts('announcement'));

export const Semester = sequelize.define('semester', {
    year: {
        type: DataTypes.STRING,
        primaryKey: true
    }, term: {
        type: DataTypes.STRING,
        primaryKey: true
    }
}, dbOpts('semester'));

export const Account = sequelize.define('account', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    name: DataTypes.STRING,
    role: DataTypes.STRING,
}, dbOpts('account'));

export const Course = sequelize.define('course', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    year: DataTypes.STRING,
    term: DataTypes.STRING,
    professor_id: DataTypes.INTEGER,
    course_name: DataTypes.STRING,
    head_ta: DataTypes.INTEGER,
}, dbOpts('course'));

export const CourseTA = sequelize.define('course_ta', {
    course_id: { type: DataTypes.INTEGER, primaryKey: true },
    ta: { type: DataTypes.INTEGER, primaryKey: true },
}, dbOpts('course_ta'));

export const ProfessorFeedback = sequelize.define('professor_feedback', {
    professor_id: DataTypes.INTEGER,
    course_id: DataTypes.INTEGER,
    ta_id: DataTypes.INTEGER,
}, dbOpts('professor_feedback'));

export const HeadFeedback = sequelize.define('head_feedback', {
    head_id: DataTypes.INTEGER,
    course_id: DataTypes.INTEGER,
    ta_id: DataTypes.INTEGER
}, dbOpts('head_feedback'));


export const RedAlert = sequelize.define('red_alert', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    course_id: DataTypes.INTEGER,
    ta_id: DataTypes.INTEGER,
    comment: DataTypes.STRING,
    Professor_approval: DataTypes.BOOLEAN,
}, dbOpts('red_alert'));


export const RedAlertDocuments = sequelize.define('red_alert_documents', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    red_alert: DataTypes.INTEGER,
    document: DataTypes.BLOB, // todo: this might not work with the current database...
}, dbOpts('red_alert_documents'));


export const Voluntary = sequelize.define('voluntary', {
    id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
    announcement_id: DataTypes.INTEGER,
    student_id: DataTypes.INTEGER,
    status: DataTypes.STRING, // todo: this might not work with the current database...
}, {
    tableName: 'voluntary', createdAt: false, updatedAt: false
});

export const AnnouncementView = sequelize.define('announcement_clean_list', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    course_id: DataTypes.INTEGER,
    description: DataTypes.STRING,
    course_name: DataTypes.STRING,
    professor_id: DataTypes.INTEGER
}, {
    tableName: 'announcement_clean_list', createdAt: false, updatedAt: false
});


export const test_database = async function () {
    return sequelize.authenticate();
}

export const getCoursesById = async function (id) {
    return Course.findAll(
      {
          where:{
              id: id
          }
      }
    )
}

export const create_announcement_database = async function (course_id, description){
    return Announcement.create(
      {
          course_id: course_id,
          description: description
      }
    )
}

export const create_volunteer_database = async function (student_id, course_id){
    return Voluntary.create(
      {
            student_id: student_id,
            course_id: course_id,
            status: "pending"
      }
    )
}

export const get_all_announcements = async function() {
    return AnnouncementView.findAll();
}
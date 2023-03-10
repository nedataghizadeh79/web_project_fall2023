import { DataTypes, Op, Sequelize, where } from 'sequelize';

/*
voluntary status:
[pending, rejected, accepted]
*/

/*
user roles: 
[student, instructor, admin]
*/

/*
course term:
[1, 2, 3]
*/

const sequelize = new Sequelize('postgres://postgres:postgres@localhost:5432/dastad') // Example for postgres

const dbOpts = function (db_name) {
  return {
    tableName: db_name, createdAt: false, updatedAt: false,
  }
};

export const Role = sequelize.define("roles", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING
  }
}, dbOpts('roles'));

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
  email: DataTypes.STRING,
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
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  professor_id: DataTypes.INTEGER,
  course_id: DataTypes.INTEGER,
  ta_id: DataTypes.INTEGER,
  comment: DataTypes.STRING,
  rate: DataTypes.INTEGER
}, dbOpts('professor_feedback'));

export const HeadFeedback = sequelize.define('head_feedback', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  head_id: DataTypes.INTEGER,
  course_id: DataTypes.INTEGER,
  ta_id: DataTypes.INTEGER,
  comment: DataTypes.STRING,
  rate: DataTypes.INTEGER,
}, dbOpts('head_feedback'));


export const RedAlert = sequelize.define('red_alert', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  course_id: DataTypes.INTEGER,
  ta_id: DataTypes.INTEGER,
  comment: DataTypes.STRING,
  professor_approval: DataTypes.BOOLEAN,
}, dbOpts('red_alert'));


export const RedAlertDocuments = sequelize.define('red_alert_documents', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  red_alert: DataTypes.INTEGER,
  document: DataTypes.BLOB, // todo: this might not work with the current database...
}, dbOpts('red_alert_documents'));


export const Voluntary = sequelize.define('voluntary', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
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
  professor_id: DataTypes.INTEGER,
  professor_name: DataTypes.STRING,
}, {
  tableName: 'announcement_clean_list', createdAt: false, updatedAt: false
});

export const CourseData = sequelize.define('course_data', {
  course_id: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  year: DataTypes.STRING,
  term: DataTypes.STRING,
  course_name: DataTypes.STRING,
  instructor_id: DataTypes.INTEGER,
  instructor: DataTypes.STRING,
  head_ta_id: DataTypes.INTEGER,
  head_ta_name: DataTypes.STRING,
}, {
  tableName: 'course_data', createdAt: false, updatedAt: false
});

export const VoluntaryList = sequelize.define('voluntary_clean_list', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  announcement_id: DataTypes.INTEGER,
  student_id: DataTypes.INTEGER,
  status: DataTypes.STRING,
  extra_info: DataTypes.STRING,
  course_id: DataTypes.INTEGER,
  year: DataTypes.STRING,
  term: DataTypes.STRING,
  professor_id: DataTypes.INTEGER,
  course_name: DataTypes.STRING,
}, dbOpts('voluntary_clean_list'));

export const RedAlertView = sequelize.define('red_alert_view', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  course_id: DataTypes.INTEGER,
  comment: DataTypes.STRING,
  professor_approval: DataTypes.BOOLEAN,
  year: DataTypes.STRING,
  term: DataTypes.STRING,
  course_name: DataTypes.STRING,
  professor_id: DataTypes.INTEGER,
  ta_name: DataTypes.STRING
}, dbOpts('red_alert_view'));

export const PushReceiver = sequelize.define('push_receiver',{
  id: {
    type: DataTypes.INTEGER,
    body: DataTypes.STRING,
    primaryKey: true,
  },
  body: DataTypes.STRING,
}, dbOpts('push_receiver'));


export const HeadCommentView = sequelize.define('head_comment_view', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: DataTypes.STRING,
  course_name: DataTypes.STRING,
  term: DataTypes.STRING,
  year: DataTypes.STRING,
  comment: DataTypes.STRING,
  rate: DataTypes.INTEGER
}, dbOpts('head_comment_view'));

// export const InstructorCommentView;
export const InstructorCommentView = sequelize.define('instructor_comment_view', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: DataTypes.STRING,
  course_name: DataTypes.STRING,
  term: DataTypes.STRING,
  year: DataTypes.STRING,
  comment: DataTypes.STRING,
  rate: DataTypes.INTEGER
}, dbOpts('instructor_comment_view'));

export const CourseInfo = sequelize.define('course_info', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  term: DataTypes.STRING,
  year: DataTypes.STRING,
  course_name: DataTypes.STRING,
  professor_name: DataTypes.STRING,
  head_ta_name: DataTypes.STRING,
  professor_id: DataTypes.INTEGER,
  head_ta: DataTypes.INTEGER,
}, dbOpts('course_info'));

export const CourseTAView = sequelize.define('course_ta_view', {
  course_id: { type: DataTypes.INTEGER, primaryKey: true },
  ta_id: { type: DataTypes.INTEGER, primaryKey: true },
  ta_name: DataTypes.STRING
}, dbOpts('course_ta_view'));

export const test_database = async function () {
  return sequelize.authenticate();
}

export const get_user_by_username = async function (username) {
  return Account.findOne(
    {
      where: {
        username: username
      }
    }
  )
}

export const create_user = function (username, password, email, name, role) {
  return Account.create(
    {
      username: username,
      password: password,
      email: email,
      name: name,
      role: role,
    }
  )
}

export const find_user_by_username = function (username) {
  return Account.findOne({
    where: {
      username: username,
    },
  });
}

export const find_user_by_id = async function (id) {
  return Account.findOne({
    where: {
      id: id
    }
  });
}

export const get_ta_by_id = async function (id) {
  return CourseTA.findOne({
    where: {
      id: id
    }
  });
}

export const get_course_by_id = async function (id) {
  return Course.findOne({
    where: {
      id: id
    }
  });
}

export const insert_instructor_feedback = async function (
  professor_id, course_id, ta_id, comment, rate
) {
  return ProfessorFeedback.create(
    {
      professor_id: professor_id,
      course_id: course_id,
      ta_id: ta_id,
      comment: course_id,
      rate: rate,
    }
  )
}

export const insert_head_ta_feedback = async function (
  head_id, course_id, ta_id, comment, rate
) {
  return HeadFeedback.create(
    {
      head_id: professor_id,
      course_id: course_id,
      ta_id: ta_id,
      comment: course_id,
      rate: rate,
    }
  )
}

export const change_user_role = async function (id, role) {
  const account = await find_user_by_id(id);
  account.role = role;
  await account.save();
}

export const getCoursesById = async function (id) {
  return Course.findAll(
    {
      where: {
        id: id
      }
    }
  )
}

export const create_announcement_database = async function (course_id, description) {
  return Announcement.create(
    {
      course_id: course_id,
      description: description
    }
  )
}

export const create_volunteer_database = async function (student_id, course_id, extra_info) {
  return Voluntary.create(
    {
      student_id: student_id,
      announcement_id: course_id,
      status: "pending",
      extra_info: extra_info,
    }
  )
}

export const get_all_announcements = async function () {
  return AnnouncementView.findAll();
}

export const get_announcements_by_professor_id = async function (professor_id) {
  return AnnouncementView.findAll(
    {
      where: {
        professor_id: professor_id
      }
    }
  )
}

export const create_course = async function (year, term, professor_id, course_name, head_ta) {
  return Course.create(
    {
      year: year,
      term: term,
      professor_id: professor_id,
      course_name: course_name,
      head_ta: head_ta || null
    }
  )
}

export const create_red_alert = async function (course_id, ta_id, comment, documents) {
  const red_alert = await RedAlert.create(
    {
      course_id: course_id,
      ta_id: ta_id,
      comment: comment,
      professor_approval: false
    }
  );
  for (let i = 0; i < documents.length; i++) {
    await RedAlertDocuments.create(
      {
        red_alert: red_alert.id,
        document: documents[i]
      }
    )
  }
}

export const find_red_alerts = async function (query) {
  return RedAlertView.findAll(query);
}

export const view_red_alert_docs = async function (id) {
  return RedAlertDocuments.findAll(
    {
      where: {
        red_alert: id
      }
    }
  );
}

export const find_red_alert_by_id = async function (id) {
  return RedAlert.findOne(
    {
      where: { id: id }
    }
  );
}
export const find_all_course_data = async function (id) {
  return CourseData.findAll(
    {
      where: {
        instructor_id: id
      }
    }
  )
}
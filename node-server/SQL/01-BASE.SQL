DROP TABLE IF EXISTS semester;

CREATE TABLE IF NOT EXISTS semester (
	year VARCHAR(4) NOT NULL,
	term VARCHAR(1) NOT NULL,
PRIMARY KEY (year, term)
);

DROP TABLE IF EXISTS account;

-- firstName, lastName, should be added to this
CREATE TABLE IF NOT EXISTS account (
	id SERIAL PRIMARY KEY,
	username VARCHAR(60) UNIQUE NOT NULL,
	password VARCHAR(60) UNIQUE NOT NULL,
	name VARCHAR(60) NOT NULL,
	email VARCHAR(60),
	role INTEGER NOT NULL
);

DROP TABLE IF EXISTS course;

CREATE TABLE IF NOT EXISTS course(
 	id SERIAL PRIMARY KEY,
	year VARCHAR(4) NOT NULL,
	term VARCHAR(1) NOT NULL,
	professor_id INTEGER NOT NULL,
	course_name VARCHAR(120) NOT NULL ,
	head_ta INTEGER REFERENCES account(id),
	FOREIGN KEY (year, term) REFERENCES semester (year, term)
);

DROP TABLE IF EXISTS course_ta;

CREATE TABLE IF NOT EXISTS course_ta (
	course_id INTEGER REFERENCES course(id),
	ta INTEGER REFERENCES account(id),
	PRIMARY KEY (course_id, ta)
);

DROP TABLE IF EXISTS professor_feedback;

CREATE TABLE IF NOT EXISTS professor_feedback(
	professor_id INTEGER REFERENCES account(id),
	course_id INTEGER NOT NULL,
	ta_id INTEGER NOT NULL,
	FOREIGN KEY (course_id, ta_id) REFERENCES course_ta(course_id, ta)
);

DROP TABLE IF EXISTS head_feedback;

CREATE TABLE IF NOT EXISTS head_feedback(
	head_id INTEGER REFERENCES account(id),
	course_id INTEGER NOT NULL,
	ta_id INTEGER NOT NULL,
	FOREIGN KEY (course_id, ta_id) REFERENCES course_ta(course_id, ta)
);

DROP TABLE IF EXISTS red_alert;

CREATE TABLE IF NOT EXISTS red_alert(
	id SERIAL PRIMARY KEY,
	course_id INTEGER,
	ta_id INTEGER,
	FOREIGN KEY (course_id, ta_id) REFERENCES course_ta(course_id, ta),
	comment VARCHAR(500)  NOT NULL,
	Professor_approval BOOLEAN
);

DROP TABLE IF EXISTS red_alert_documents;

CREATE TABLE IF NOT EXISTS red_alert_documents(
	id SERIAL PRIMARY KEY,
	red_alert INTEGER REFERENCES red_alert(id),
	document BYTEA
);


DROP TABLE IF EXISTS announcement;

CREATE TABLE announcement(
                             id SERIAL PRIMARY KEY,
                             course_id INTEGER REFERENCES course(id),
                             description VARCHAR(500)
);

DROP TABLE IF EXISTS voluntary;

CREATE TABLE IF NOT EXISTS voluntary(
    id SERIAL PRIMARY KEY,
	announcement_id INTEGER REFERENCES announcement(id),
	student_id INTEGER REFERENCES account(id),
	status VARCHAR(10),
	extra_info VARCHAR(500)
);

DROP TABLE IF EXISTS roles;

CREATE TABLE IF NOT EXISTS roles(
    id SERIAL PRIMARY KEY,
    name VARCHAR(20)
);

INSERT INTO roles (id, name) VALUES (1, 'STUDENT');
INSERT INTO roles (id, name) VALUES (2, 'INSTRUCTOR');
INSERT INTO roles (id, name) VALUES (3, 'ADMIN');

INSERT INTO semester (year, term) VALUES ('1402', '2');
INSERT INTO account (username, password, role, name) VALUES ('shahab', 'shahab', '1', 'شهاب حسینی');
INSERT INTO account (username, password, role, name) VALUES ('omid', 'jafari', '2', 'امید جعفری');

INSERT INTO course (year, term, professor_id, course_name, head_ta) VALUES
            (1402, 2, 2,
             'برنامه نویسی وب',
             null
             );

/* views */

DROP VIEW IF EXISTS course_data;

CREATE VIEW course_data AS
	SELECT course.id AS course_id,
	course.year AS year,
	course.term AS term,
	course.course_name AS course_name,
	course.professor_id AS instructor_id,
	(SELECT account.name
	FROM account WHERE account.id = course.professor_id) AS instructor,
	course.head_ta AS head_ta_id,
	(SELECT account.name
	FROM account WHERE account.id = course.head_ta) AS head_ta_name
	FROM course;

DROP VIEW IF EXISTS course_ta_view;

CREATE VIEW course_ta_view AS
	SELECT course_ta.course_id AS course_id,
	course_ta.ta AS ta_id,
	(SELECT account.name
	FROM account WHERE account.id = course_ta.ta) AS ta_name
	FROM course_ta;

DROP VIEW IF EXISTS volunteer_data;

CREATE VIEW volunteer_data AS
	SELECT voluntary.student_id AS student_id,
	(SELECT account.name
	FROM account WHERE account.id = voluntary.student_id) AS student_name,
	voluntary.extra_info AS extra_info,
	voluntary.status AS status
	FROM voluntary;

DROP VIEW IF EXISTS announcement_clean_list;

CREATE VIEW announcement_clean_list AS
SELECT announcement.id AS id, announcement.course_id, announcement.description, a.name AS professor_name,
       c.course_name, c.professor_id AS professor_id
        FROM announcement JOIN course c on c.id = announcement.course_id
        JOIN account a on a.id = c.professor_id;

ALTER TABLE professor_feedback ADD COLUMN rate INTEGER;
ALTER TABLE professor_feedback ADD COLUMN comment VARCHAR(500);
ALTER TABLE professor_feedback ADD COLUMN id SERIAL PRIMARY KEY;

ALTER TABLE head_feedback ADD COLUMN rate INTEGER;
ALTER TABLE head_feedback ADD COLUMN comment VARCHAR(500);
ALTER TABLE head_feedback ADD COLUMN id SERIAL PRIMARY KEY;

DROP VIEW IF EXISTS voluntary_clean_list;

CREATE VIEW voluntary_clean_list AS
    SELECT v.id, v.announcement_id, v.student_id, v.status, v.extra_info,
           a.course_id,
           c.year, c.term, c.professor_id, c.course_name
    FROM announcement a JOIN course c on a.course_id = c.id
    JOIN voluntary v on a.id = v.announcement_id;

DROP VIEW IF EXISTS red_alert_view;

CREATE VIEW red_alert_view AS
    SELECT r.id, r.course_id, r.comment, r.professor_approval,
           c.year, c.term, c.course_name, c.professor_id,
           a.name AS ta_name
    FROM red_alert r JOIN course c on r.course_id = c.id JOIN account a on a.id = r.ta_id;

DROP TABLE IF EXISTS push_receiver;

CREATE TABLE push_receiver(
    id  SERIAL PRIMARY KEY,
    user_id INTEGER,
    body    VARCHAR(1000)
);

DROP VIEW IF EXISTS head_comment_view;

CREATE VIEW head_comment_view AS
SELECT h.rate, h.comment,
       c.term, c.year, c.course_name,
       a.name, a.id
FROM head_feedback h JOIN course_ta ct on h.course_id = ct.course_id and h.ta_id = ct.ta
                     JOIN course c on c.id = h.course_id
                     JOIN account a on ct.ta = a.id;


DROP VIEW IF EXISTS instructor_comment_view;

CREATE VIEW instructor_comment_view AS
SELECT p.rate, p.comment,
       c.term, c.year, c.course_name,
       a.name, a.id
FROM professor_feedback p JOIN course_ta ct on p.course_id = ct.course_id and p.ta_id = ct.ta
                     JOIN course c on c.id = p.course_id
                     JOIN account a on ct.ta = a.id;

DROP VIEW IF EXISTS ta_history;

CREATE VIEW ta_history AS
    SELECT a.id,
           c2.course_name, c2.term, c2.year
        FROM course_ta c JOIN account a on c.ta = a.id
            JOIN course c2 on c2.id = c.course_id;

DROP VIEW IF EXISTS course_info;

CREATE VIEW course_info AS
    SELECT c.id, c.term, c.year, c.course_name, c.professor_id, c.head_ta,
           a1.name AS professor_name,
           a2.name AS head_ta_name
        FROM course c JOIN account a1 ON c.professor_id = a1.id
            JOIN account a2 ON c.head_ta = a2.id;

DROP VIEW IF EXISTS account_info_for_admin_view;

CREATE VIEW account_info_for_admin_view AS
    SELECT id, username, name, email, role
        FROM account;
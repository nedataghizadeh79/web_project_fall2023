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
	role VARCHAR(10) UNIQUE NOT NULL
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

DROP TABLE IF EXISTS voluntary;

CREATE TABLE IF NOT EXISTS voluntary(
	announcement_id INTEGER REFERENCES announcement(id),
	student_id INTEGER REFERENCES account(id),
	status VARCHAR(10)
);

DROP TABLE IF EXISTS announcement;

CREATE TABLE announcement(
    id SERIAL PRIMARY KEY,
    course_id INTEGER REFERENCES course(id),
    description VARCHAR(500)
);

INSERT INTO semester (year, term) VALUES ('1402', '2');
INSERT INTO account (username, password, role) VALUES ('shahab', 'shahab', 'student');
INSERT INTO account (username, password, role) VALUES ('omid', 'jafari', 'instructor');

ALTER TABLE voluntary ADD COLUMN id SERIAL PRIMARY KEY;

/* views */

CREATE VIEW course_data AS
	SELECT course.id AS course_id,
	course.year AS year,
	course.term AS term,
	(SELECT account.name
	FROM account WHERE account.id = course.professor_id) AS instructor,
	course.head_ta AS head_ta_id,
	(SELECT account.name
	FROM account WHERE account.id = course.head_ta) AS head_ta_name
	FROM course;

CREATE VIEW course_ta_view AS
	SELECT course_ta.course_id AS course_id,
	course_ta.ta AS ta_id,
	(SELECT account.name
	FROM account WHERE account.id = course_ta.ta) AS ta_name
	FROM course_ta;

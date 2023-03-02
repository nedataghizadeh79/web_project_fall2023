DROP TABLE IF EXISTS semester;

CREATE TABLE IF NOT EXISTS semester (
	year VARCHAR(4) NOT NULL,
	term VARCHAR(1) NOT NULL,
PRIMARY KEY (year, term)
);

DROP TABLE IF EXISTS account;

CREATE TABLE IF NOT EXISTS account (
	id SERIAL PRIMARY KEY,
	username VARCHAR(60) UNIQUE NOT NULL,
	password VARCHAR(60) UNIQUE NOT NULL,
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

CREATE TABLE IF NOT EXISTS  red_alert(
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
	course_id INTEGER REFERENCES course(id),
	student_id INTEGER REFERENCES account(id),
	status VARCHAR(10)
);


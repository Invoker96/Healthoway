CREATE TABLE `soen6841`.`users` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `FULLNAME` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL,
  `USERNAME` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL,
  `PASSWORD` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL,
  `USER_ROLE` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL,
  `ROLE_ID` varchar(255) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `EMAIL` varchar(255) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `ADDRESS` varchar(255) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `DOB` date DEFAULT NULL,
  `PNUM` varchar(255) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`ID`)
);

INSERT INTO `soen6841`.`users`
(`FULLNAME`,`USERNAME`,`PASSWORD`,`USER_ROLE`,`ROLE_ID`,`EMAIL`,`ADDRESS`,`DOB`,
`PNUM`)
VALUES
('Jon Wick','jonWick','dog','Doctor','D561344','jon52@hotmail.com','',
'1982-03-19','2144661245'),
('GUSTAVO FRING','gus','busns','Counsellor','S341344','gustavo.fring@gmail.com','123 Driver Lane',
'1965-10-22','2144661245');

INSERT INTO `soen6841`.`users`(`FULLNAME`, `USERNAME`,`PASSWORD`, `USER_ROLE`,`PNUM`) 
VALUES('Manager','admin','admin123','Manager','00000000');


-------------------------NEW 2-NOV-2022-----------------------------------------------

CREATE TABLE `soen6841`.`ques_eval` (
  `NUM` varchar(5) NOT NULL,
  `QUESTION` varchar(1000) COLLATE utf8mb3_unicode_ci NOT NULL,
  `OPTION1` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL,
  `OPTION2` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL,
  `OPTION3` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL,
  `OPTION4` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL,
  PRIMARY KEY (`NUM`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;


INSERT INTO SOEN6841.QUES_EVAL (OPTION1,OPTION2,OPTION3,OPTION4,NUM, QUESTION)
VALUES('Not At all','Several Days','More Than Half of the Days','Nearly Every Day','Ques1','Over the past 2 weeks, how often have you been bothered by any of the following problems: Little interest or pleasure in doing things?'),
('Not At all','Several Days','More Than Half of the Days','Nearly Every Day','Ques2','Over the past 2 weeks, how often have you been bothered by any of the following problems: Feeling down, depressed or hopless?'),
('Not At all','Several Days','More Than Half of the Days','Nearly Every Day','Ques3','Over the past 2 weeks, how often have you been bothered by any of the following problems: Trouble falling asleep, staying asleep, or sleeping too much?'),
('Not At all','Several Days','More Than Half of the Days','Nearly Every Day','Ques4','Over the past 2 weeks, how often have you been bothered by any of the following problems: Feeling tired or having little energy?'),
('Not At all','Several Days','More Than Half of the Days','Nearly Every Day','Ques5','Over the past 2 weeks, how often have you been bothered by any of the following problems: Poor appetite or overeating?'),
('Not At all','Several Days','More Than Half of the Days','Nearly Every Day','Ques6','Over the past 2 weeks, how often have you been bothered by any of the following problems: Feeling bad about yourself - or that you are a failure or have let yourself or your family down?'),
('Not At all','Several Days','More Than Half of the Days','Nearly Every Day','Ques7','Over the past 2 weeks, how often have you been bothered by any of the following problems: Trouble concentrating on things, such as reading the newspaper or watching television?'),
('Not At all','Several Days','More Than Half of the Days','Nearly Every Day','Ques8','Over the past 2 weeks, how often have you been bothered by any of the following problems: Moving or speaking so slowly that other people could have noticed. Or, the opposite - being so fidgety or restless that you have been moving around a lot more than usual?'),
('Not At all','Several Days','More Than Half of the Days','Nearly Every Day','Ques9','Over the past 2 weeks, how often have you been bothered by any of the following problems: Thoughts that you would be better off dead or of hurting yourself in some way?');
commit;



CREATE TABLE `soen6841`.`patient_requests` (
  `ID` int NOT NULL,
  `REQ` int NOT NULL,
  `USERNAME` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  `EMAIL` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  `QUES1` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  `QUES2` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  `QUES3` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  `QUES4` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  `QUES6` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  `QUES7` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  `QUES8` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  `QUES9` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  PRIMARY KEY (`ID`,`REQ`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

/* 
JAVA CODE TO INSERT INTO PATIENT_REQUESTS FOR AVNEET

INT VARIABLE = SELECT MAX(REQ) FROM SOEN6841.PATIENT_REQUESTS WHERE ID =<ID>;
IF VARIABLE IS NULL THEN VARIABLE =1;
ELSE VARIABLE +=1;

INSERT INTO SOEN6841.PATIENT_REQUESTS(ID,REQ,USERNAME,EMAIL,QUES1,QUES2,QUES3,QUES4,QUES5,QUES6,
QUES7,QUES8,QUES9)
VALUES (ID,VARIABLE,USERNAME,EMAIL,QUES1,QUES2,QUES3,QUES4,QUES5,QUES6,
QUES7,QUES8,QUES9);


*/

--------------------------------------------------------------------------------------

-------------------------NEW 3-NOV-2022-----------------------------------------------

ALTER TABLE SOEN6841.PATIENT_REQUESTS
ADD QUES5 VARCHAR(255) NOT NULL;


CREATE TABLE `soen6841`.`email_table` (
  `ID` int NOT NULL,
  `USERNAME` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  `EMAIL` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  `BODY` varchar(1000) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  `SUBJECT` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;


Delimiter #
CREATE TRIGGER `soen6841`.`patient_requests_AFTER_INSERT` 
AFTER INSERT ON `patient_requests` FOR EACH ROW
BEGIN
	INSERT INTO SOEN6841.EMAIL_TABLE(ID,USERNAME,EMAIL,BODY,SUBJECT)
    VALUES(new.ID,new.USERNAME,new.EMAIL,'Hi '||new.username||', You have requested appointment with a doctor. 
    You will be notified as soon as we process your request.','Requested appointment for'||new.Username);
END#

CREATE TABLE `soen6841`.`appointments` (
  `ID` int NOT NULL,
  `REQ` int NOT NULL,
  `USERNAME` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  `EMAIL` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  `APPOINTMENT` TIMESTAMP NOT NULL,
  `ROLE` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  `COMMENTS` varchar(1000) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  PRIMARY KEY (`ID`,`REQ`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

Delimiter #
CREATE TRIGGER `soen6841`.`appointments_AFTER_INSERT` 
AFTER INSERT ON `appointments` FOR EACH ROW
BEGIN
	INSERT INTO SOEN6841.EMAIL_TABLE(ID,USERNAME,EMAIL,BODY,SUBJECT)
    VALUES(new.ID,new.USERNAME,new.EMAIL,'Hi '||new.username||',   You have a confirmed appointment with '||new.ROLE||' on '||new.appointment||'. 
    Please make sure you attend the appointment.','Appointment confirmed for'||new.USERNAME);
END#

----------------------------------6-nov-2022------------------------------------------

DROP TRIGGER  soen6841.patient_requests_AFTER_INSERT;

Delimiter #
CREATE TRIGGER `soen6841`.`patient_requests_AFTER_INSERT` 
AFTER INSERT ON `patient_requests` FOR EACH ROW
BEGIN
	INSERT INTO SOEN6841.EMAIL_TABLE(ID,USERNAME,EMAIL,BODY,SUBJECT)
    VALUES(new.ID,new.USERNAME,new.EMAIL,'Hi User, You have requested appointment with a doctor. 
    You will be notified as soon as we process your request','Appointment requested ');
END#

DROP TRIGGER  soen6841.appointments_AFTER_INSERT;

Delimiter #
CREATE TRIGGER `soen6841`.`appointments_AFTER_INSERT` 
AFTER INSERT ON `appointments` FOR EACH ROW
BEGIN
	INSERT INTO SOEN6841.EMAIL_TABLE(ID,USERNAME,EMAIL,BODY,SUBJECT)
    VALUES(new.ID,new.USERNAME,new.EMAIL,'Hi User,   You have a confirmed appointment. 
    Please visit your Healthoway portal for more details.','Appointment confirmed');
END#

--------------------------------------------------------------------------------------
-------------------------NEW 11-NOV-2022-----------------------------------------------

ALTER TABLE SOEN6841.PATIENT_REQUESTS
ADD DOCTOR_USERNAME VARCHAR(255);

ALTER TABLE SOEN6841.appointments
ADD PATIENT_USERNAME VARCHAR(255);

ALTER TABLE SOEN6841.appointments MODIFY appointment VARCHAR(255);

ALTER TABLE SOEN6841.appointments CHANGE ID ID INT(100)AUTO_INCREMENT;

ALTER TABLE SOEN6841.PATIENT_REQUESTS
ADD APPOINTMENT_GIVEN VARCHAR(255) DEFAULT 'NO';
---------------------------------------------------------------------------------------

 ALTER TABLE PATIENT_REQUESTS MODIFY ID int AUTO_INCREMENT;

---------------------------11-nov-2022-----------------------------------------------

DELIMITER #
CREATE TRIGGER `soen6841`.`PATIENT_REQUESTS_AFTER_DELETE` 
AFTER DELETE ON `PATIENT_REQUESTS` FOR EACH ROW
BEGIN
	INSERT INTO SOEN6841.EMAIL_TABLE(ID,USERNAME,EMAIL,BODY,SUBJECT)
    VALUES(OLD.ID,OLD.USERNAME,OLD.EMAIL,'Hi User,   Your appointment has been cancelled. 
    Please visit your Healthoway portal to request another appointment.','Appointment cancelled');
END#


DELIMITER #
CREATE TRIGGER `soen6841`.`APPOINTMENTS_AFTER_DELETE` 
AFTER DELETE ON `APPOINTMENTS` FOR EACH ROW
BEGIN
	INSERT INTO SOEN6841.EMAIL_TABLE(ID,USERNAME,EMAIL,BODY,SUBJECT)
    VALUES(OLD.ID,OLD.USERNAME,OLD.EMAIL,'Hi User,   Your appointment has been cancelled. 
    Please visit your Healthoway portal to request another appointment.','Appointment cancelled');
END#

-------------------------------------------------------------------------------------------

ALTER TABLE users ADD IS_ACTIVE VARCHAR(5) NOT NULL DEFAULT 'YES';
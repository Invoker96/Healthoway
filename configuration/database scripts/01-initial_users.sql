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
('GUSTAVO FRING','Gus','busns','Counsellor','S341344','gustavo.fring@gmail.com','123 Driver Lane',
'1965-10-22','2144661245');

INSERT INTO `soen6841`.`users`(`FULLNAME`, `USERNAME`,`PASSWORD`, `USER_ROLE`,`PNUM`) 
VALUES('Manager','admin','admin123','Manager','00000000');
BEGIN TRANSACTION;
DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
	`id`	INTEGER NOT NULL,
	`name`	CHAR(15) NOT NULL,
	`password`	CHAR(20) NOT NULL,
	PRIMARY KEY(`id`)
);

INSERT INTO user(name, password) values('eduardo', 'laquesea');
INSERT INTO user(name, password) values('edgar', 'test');

CREATE TABLE IF NOT EXISTS `event` (
	`id`	INTEGER NOT NULL,
	`name`	CHAR(50) NOT NULL,
	`icon`	CHAR(100) NOT NULL,
	PRIMARY KEY(`id`)
);

INSERT INTO `event`(name, icon) values('Bautismo', 'assets/images/Bautismo.svg');
INSERT INTO `event`(name, icon) values('Confirmación', 'assets/images/Confirmacion.svg');
INSERT INTO `event`(name, icon) values('Matrimonio', 'assets/images/Matrimonio.svg');
INSERT INTO `event`(name, icon) values('Primera comunion', 'assets/images/Comunion.svg');


CREATE TABLE IF NOT EXISTS `bautismo` (
	`id`	INTEGER NOT NULL,
	`name`	CHAR(15) NOT NULL,
    `place`	CHAR(250) NOT NULL,
    `date`	DATE NOT NULL,
    `fatherName`	CHAR(50) NOT NULL,
    `motherName`	CHAR(50) NOT NULL,
	`goodFatherName`	CHAR(50) NOT NULL,
	`goodMotherName`	CHAR(50) NOT NULL,
	`paternalGrandMotherName`	CHAR(50) NOT NULL,
	`paternalGrandFatherName`	CHAR(50) NOT NULL,
	`maternalGrandMotherName`	CHAR(50) NOT NULL,
    `maternalGrandFatherName`	CHAR(50) NOT NULL,
    `priest`	CHAR(50) NOT NULL,
	PRIMARY KEY(`id`)
);

COMMIT;

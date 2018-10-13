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
	`name`	CHAR(35) NOT NULL,
    `place`	CHAR(50) NOT NULL,
    `date`	DATE NOT NULL,
    `fatherName`	CHAR(35) NOT NULL,
    `motherName`	CHAR(35) NOT NULL,
	`goodFatherName`	CHAR(35) NOT NULL,
	`goodMotherName`	CHAR(35) NOT NULL,
	`paternalGrandMotherName`	CHAR(35) NOT NULL,
	`paternalGrandFatherName`	CHAR(35) NOT NULL,
	`maternalGrandMotherName`	CHAR(35) NOT NULL,
    `maternalGrandFatherName`	CHAR(35) NOT NULL,
    `priest`	CHAR(35) NOT NULL,
	PRIMARY KEY(`id`)
);

CREATE TABLE IF NOT EXISTS `comunion` (
	`id`	INTEGER NOT NULL,
	`name`	CHAR(35) NOT NULL,
    `church_bautismo` CHAR(50)
	`place_bautismo`	CHAR(50) NOT NULL,
    `date_bautismo`	DATE NOT NULL,
	`date`	DATE NOT NULL,
    `fatherName`	CHAR(35) NOT NULL,
    `motherName`	CHAR(35) NOT NULL,
	`goodFatherName`	CHAR(35) NULL,
	`goodMotherName`	CHAR(35) NULL,
    `priest`	CHAR(35) NOT NULL,
	PRIMARY KEY(`id`)
);

CREATE TABLE IF NOT EXISTS `confirmacion` (
	`id`	INTEGER NOT NULL,
	`name`	CHAR(35) NOT NULL,
    `church_bautismo` CHAR(50)
	`place_bautismo`	CHAR(50) NOT NULL,
    `date_bautismo`	DATE NOT NULL,
	`date`	DATE NOT NULL,
    `fatherName`	CHAR(35) NOT NULL,
    `motherName`	CHAR(35) NOT NULL,
	`goodFatherName`	CHAR(35) NULL,
	`goodMotherName`	CHAR(35) NULL,
    `priest`	CHAR(35) NOT NULL,
	PRIMARY KEY(`id`)
);

COMMIT;

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

CREATE TABLE IF NOT EXISTS `sacrament` (
	`id`	INTEGER NOT NULL,
	`name`	CHAR(50) NOT NULL,
	`icon`	CHAR(100) NOT NULL,
	PRIMARY KEY(`id`)
);

INSERT INTO `sacrament`(name, icon) values('Bautismo', 'assets/images/Bautismo.svg');
INSERT INTO `sacrament`(name, icon) values('Confirmación', 'assets/images/Confirmacion.svg');
INSERT INTO `sacrament`(name, icon) values('Matrimonio', 'assets/images/Matrimonio.svg');
INSERT INTO `sacrament`(name, icon) values('Comunión', 'assets/images/Comunion.svg');


CREATE TABLE IF NOT EXISTS `sacrament_info` (
	`id`	          INTEGER NOT NULL,
	`sacrament`	      INTEGER NOT NULL,
	`name`	          CHAR(35) NOT NULL,
	`bornPlace`	      CHAR(50),
    `baptismChurch`   CHAR(50),
	`baptismPlace`    CHAR(50),
    `baptismDate`	  DATE,
	`date`	          DATE NOT NULL,
    `fatherName`  	  CHAR(35) NOT NULL,
    `motherName`	  CHAR(35) NOT NULL,
	`godFatherName`	  CHAR(35) NULL,
	`godMotherName`	  CHAR(35) NULL,
	`paternalGrandMotherName`	CHAR(35),
   	`paternalGrandFatherName`	CHAR(35),
   	`maternalGrandMotherName`	CHAR(35),
    `maternalGrandFatherName`	CHAR(35),
    `priest`	CHAR(35) NOT NULL,
	PRIMARY KEY(`id`),
	FOREIGN KEY(`sacrament`) REFERENCES sacramento(`id`)
);

COMMIT;

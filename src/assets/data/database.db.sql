BEGIN TRANSACTION;
DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
	`id`	INTEGER NOT NULL,
	`name`	TEXT NOT NULL,
	`password`	TEXT NOT NULL,
	PRIMARY KEY(`id`)
);

INSERT INTO user(name, password) values('eduardo', 'laquesea');
INSERT INTO user(name, password) values('edgar', '');

CREATE TABLE IF NOT EXISTS `bautismo` (
	`id`	INTEGER NOT NULL,
	`name`	TEXT NOT NULL,
	`password`	TEXT NOT NULL,
	PRIMARY KEY(`id`)
);

COMMIT;

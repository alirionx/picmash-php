PRAGMA foreign_keys=OFF;
BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS "menue" (
	"id"	INTEGER PRIMARY KEY AUTOINCREMENT,
	"txt"	TEXT,
	"typ"	TEXT,
	"lnk"	TEXT,
	"usr"	INTEGER,
	"adm"	INTEGER,
	"odr"	INTEGER
);
INSERT INTO menue VALUES(1,'mash','hash','/',1,1,1);
INSERT INTO menue VALUES(2,'rating','hash','/rating',1,1,2);
INSERT INTO menue VALUES(3,'login','hash','/login',1,0,3);
INSERT INTO menue VALUES(4,'upload','hash','/upload',0,1,4);
INSERT INTO menue VALUES(5,'app mgmt','hash','/mgmt',0,1,5);
INSERT INTO menue VALUES(6,'logout','func','logout',0,1,6);
CREATE TABLE IF NOT EXISTS "mash" (
	"id"	INTEGER PRIMARY KEY AUTOINCREMENT,
	"filename"	INTEGER,
	"win"	INTEGER DEFAULT 0,
	"loss"	INTEGER DEFAULT 0
);
CREATE TABLE IF NOT EXISTS "_mash" (
	"id"	INTEGER PRIMARY KEY AUTOINCREMENT,
	"col"	TEXT,
	"hl"	TEXT,
	"typ"	TEXT,
	"align"	TEXT,
	"width"	TEXT DEFAULT "",
	"usr"	INTEGER,
	"adm"	INTEGER,
	"odr"	INTEGER
);
INSERT INTO _mash VALUES(1,'id','Id','static','center','',0,1,1);
INSERT INTO _mash VALUES(2,'filepath','Thumb','thumb','center','120px',1,1,2);
INSERT INTO _mash VALUES(3,'votes','Votes','static','center','',1,1,3);
INSERT INTO _mash VALUES(4,'win','Wins','static','center','',1,1,4);
INSERT INTO _mash VALUES(5,'loss','Losses','static','center','',1,1,5);
INSERT INTO _mash VALUES(6,'rate','Rate','static','center','',1,1,6);
INSERT INTO _mash VALUES(7,'option','Option','action','center','120px',0,1,7);
CREATE TABLE IF NOT EXISTS "mgmt" (
	"id"	INTEGER PRIMARY KEY AUTOINCREMENT,
	"key"	TEXT,
	"val"	TEXT
);
INSERT INTO mgmt VALUES(1,'adminpwdhash',NULL);
DELETE FROM sqlite_sequence;
INSERT INTO sqlite_sequence VALUES('menue',6);
INSERT INTO sqlite_sequence VALUES('_mash',7);
INSERT INTO sqlite_sequence VALUES('mgmt',1);
COMMIT;

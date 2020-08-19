DROP TABLE IF EXISTS "events";
DROP TABLE IF EXISTS "profile";

CREATE TYPE eventType AS ENUM ('type', 'contact', 'gathering', 'symptom');

CREATE TABLE events (
	id SERIAL PRIMARY KEY,
	type eventType NOT NULL,
	eventDate DATE NOT NULL,
	location TEXT,
	comment TEXT,
	testType TEXT,
	testResult BOOLEAN,
	name TEXT,
	contactList INTEGER[],
	outside BOOLEAN,
	othersAttended INTEGER,
	gatheringSize INTEGER,
	maskPerc INTEGER,
	socDist BOOLEAN,
	confidence INTEGER
);

CREATE TABLE profile (
	id SERIAL PRIMARY KEY,
	name TEXT NOT NULL,
	activeContactList INTEGER[],
	symptomConfidence INTEGER,
	riskLevel INTEGER,
	location TEXT
);

DROP TABLE IF EXISTS "events";
DROP TABLE IF EXISTS "war_list";
DROP TABLE IF EXISTS "profile";
DROP TABLE IF EXISTS "war_desc_profile";
DROP TABLE IF EXISTS "war_power_profile";
DROP TABLE IF EXISTS "war_psyker_profile";
DROP TABLE IF EXISTS "war_stat_profile";
DROP TABLE IF EXISTS "war_weapon_profile";

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

CREATE TABLE war_list (
    id SERIAL UNIQUE,
    userId INT,
    name TEXT NOT NULL,
    points INT,
    faction TEXT NOT NULL,
    rating INT,
    json JSONB,
    PRIMARY KEY (name, userId)
);

CREATE TABLE war_desc_profile (
    name TEXT,
    description TEXT,
    meaning JSONB NOT NULL,
    PRIMARY KEY (name, description)
);

CREATE TABLE war_power_profile (
    name TEXT PRIMARY KEY,
    warp_charge INT,
    range TEXT,
    details TEXT NOT NULL,
    meaning JSONB NOT NULL
);

CREATE TABLE war_psyker_profile (
    name TEXT PRIMARY KEY,
    castNum INT,
    deny INT,
    other TEXT,
    powers_known TEXT
);

CREATE TABLE war_stat_profile (
    name TEXT PRIMARY KEY,
    attacks text,
    ballistics int,
    weapons INT,
    move INT,
    save INT,
    invuln INT,
    toughness INT,
    wounds INT,
    leadership INT 
);

CREATE TABLE war_weapon_profile (
    name TEXT PRIMARY KEY,
    abilities TEXT,
    ap INT,
    damage TEXT,
    range INT,
    strength INT,
    weaponType TEXT,
    meaning JSONB NOT NULL
);
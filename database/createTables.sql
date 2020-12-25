DROP TABLE IF EXISTS "war_list";
DROP TABLE IF EXISTS "profile";
DROP TABLE IF EXISTS "war_desc_profile";
DROP TABLE IF EXISTS "war_power_profile";
DROP TABLE IF EXISTS "war_psyker_profile";
DROP TABLE IF EXISTS "war_stat_profile";
DROP TABLE IF EXISTS "war_weapon_profile";

CREATE TABLE profile (
    id SERIAL PRIMARY KEY,
    userId TEXT,
    name TEXT NOT NULL,
    location TEXT
);

CREATE TABLE war_list (
    id SERIAL UNIQUE,
    userId TEXT,
    name TEXT NOT NULL,
    points INT,
    faction TEXT NOT NULL,
    shoot INT,
    fight INT,
    control INT,
    resil INT,
    rating INT,
    json JSONB,
    PRIMARY KEY (name, userId)
);

CREATE TABLE war_desc_profile (
    name TEXT,
    description TEXT,
    meaning JSONB NOT NULL,
    faction TEXT,
    PRIMARY KEY (name, faction)
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
    strength INT,
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
    strength TEXT,
    weaponType TEXT,
    shots TEXT,
    meaning JSONB NOT NULL
);

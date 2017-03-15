SET FOREIGN_KEY_CHECKS = 0;

DROP TABLE IF EXISTS user;
DROP TABLE IF EXISTS company;
DROP TABLE IF EXISTS market;
DROP TABLE IF EXISTS post;
DROP TABLE IF EXISTS segment;
DROP TABLE IF EXISTS user_segment;
DROP TABLE IF EXISTS user_company;
DROP TABLE IF EXISTS company_admin;
DROP TABLE IF EXISTS message;
DROP TABLE IF EXISTS comment;
DROP TABLE IF EXISTS user_message;
DROP TABLE IF EXISTS post;
DROP TABLE IF EXISTS comment_like;
DROP TABLE IF EXISTS post_like;

-- COMMON USER
CREATE TABLE user(
    user_id INTEGER AUTO_INCREMENT,
    first_name VARCHAR(100),
    last_name VARCHAR(50),
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(1000),
    register_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_page_admin BOOLEAN DEFAULT TRUE,
    removed BOOLEAN DEFAULT FALSE,
    CONSTRAINT pk_user PRIMARY KEY(user_id)
);
-- Make login identifiers unique
ALTER TABLE user ADD UNIQUE INDEX (username);
ALTER TABLE user ADD UNIQUE INDEX (email);

-- MARKETS (ONLY FOR DROPDOWN WHEN CREATING SEGMENTS
CREATE TABLE market(
    market_id INTEGER AUTO_INCREMENT,
    name VARCHAR(40) NOT NULL,
    CONSTRAINT pk_market PRIMARY KEY(market_id)
);

-- SEGMENTS FOR COMPANY
CREATE TABLE segment(
    segment_id INTEGER  AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL UNIQUE,
    description VARCHAR (1000) NOT NULL,
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    removed BOOLEAN DEFAULT FALSE,
    market_id INTEGER NOT NULL,
    CONSTRAINT pk_segment PRIMARY KEY(segment_id)
);

-- USER SUBSCRIPED TO SEGMENT
CREATE TABLE user_segment(
    user_id INTEGER,
    segment_id INTEGER,
    subscription_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT pk_user_segment PRIMARY KEY(user_id, segment_id)
);

CREATE TABLE company(
    ticker VARCHAR(10) NOT NULL,
    name VARCHAR(100) NOT NULL,
    description VARCHAR (1000) NOT NULL,
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    removed BOOLEAN DEFAULT FALSE,
    segment_id INTEGER NOT NULL,
    CONSTRAINT pk_company PRIMARY KEY(ticker)
);
-- USER SUBSCRIBED TO A COMPANY
CREATE TABLE user_company(
    user_id INTEGER,
    ticker VARCHAR(10),
    subscription_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT pk_user_company PRIMARY KEY(user_id, ticker)
);
-- OWN TABLE FOR ADMINS ON COMPANY PAGE
-- CREATED FOR FUTURE ADMIN INFORMATION
CREATE TABLE company_admin(
    company_admin_id INTEGER,
    ticker VARCHAR(10) NOT NULL,
    user_id INTEGER NOT NULL,
    CONSTRAINT pk_company_admin PRIMARY KEY(company_admin_id)
);
-- TEXT OR LINK POSTS
CREATE TABLE post(
    post_id INTEGER AUTO_INCREMENT,
    header VARCHAR(200) NOT NULL,
    content VARCHAR(10000),
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    image_url VARCHAR(200),
    link_url VARCHAR(200),
    removed BOOLEAN DEFAULT FALSE,
    user_id INTEGER,
    ticker VARCHAR(10) NOT NULL,
    CONSTRAINT pk_post PRIMARY KEY(post_id)
);
-- MESSAGE FROM USER
CREATE TABLE message(
    message_id INTEGER AUTO_INCREMENT,
    header VARCHAR(200),
    content VARCHAR(10000),
    time_sent TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    user_id INTEGER,
    CONSTRAINT pk_message PRIMARY KEY(message_id)
);
-- RECIEVED MESSAGE
CREATE TABLE user_message(
    user_id INTEGER,
    message_id INTEGER,
    received DATETIME,
    CONSTRAINT pk_user_message PRIMARY KEY(user_id, message_id)
);


-- LIKE CONNECTED TO POST
CREATE TABLE post_like(
    post_like_id INTEGER,
    user_id INTEGER NOT NULL,
    post_id INTEGER NOT NULL,
    received TIMESTAMP,
    liked BOOLEAN DEFAULT TRUE,
    CONSTRAINT pk_post_like PRIMARY KEY(post_like_id)
);
CREATE TABLE comment(
    comment_id INTEGER AUTO_INCREMENT,
    content VARCHAR(10000),
    posted_datetime TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    post_id INTEGER NOT NULL,
    user_id INTEGER,
    parent_comment_id INTEGER,
    CONSTRAINT pk_post_comment PRIMARY KEY(comment_id)
);
-- LIKE CONNECTED TO COMMENT
CREATE TABLE comment_like(
    comment_like_id INTEGER,
    user_id INTEGER NOT NULL,
    comment_id INTEGER NOT NULL,
    received TIMESTAMP,
    liked BOOLEAN DEFAULT TRUE,
    CONSTRAINT pk_comment_like PRIMARY KEY(comment_like_id)

);


-- SET FOREIGN KEYS
ALTER TABLE user_segment
  ADD CONSTRAINT fk1_user_segment FOREIGN KEY(user_id)
REFERENCES user(user_id),
  ADD CONSTRAINT fk2_user_segment FOREIGN KEY(segment_id)
REFERENCES segment(segment_id);

ALTER TABLE segment
  ADD CONSTRAINT fk_market FOREIGN KEY(market_id)
REFERENCES market(market_id);



ALTER TABLE user_company
  ADD CONSTRAINT fk1_user_company FOREIGN KEY(user_id)
REFERENCES user(user_id),
  ADD CONSTRAINT fk2_user_company FOREIGN KEY(ticker)
REFERENCES company(ticker);


ALTER TABLE company_admin
  ADD CONSTRAINT fk1_company_admin FOREIGN KEY(user_id)
REFERENCES user(user_id),
  ADD CONSTRAINT fk2_company_admin FOREIGN KEY(ticker)
REFERENCES company(ticker);

ALTER TABLE post
  ADD CONSTRAINT fk1_post FOREIGN KEY(user_id)
REFERENCES user(user_id),
  ADD CONSTRAINT fk2_post FOREIGN KEY(ticker)
REFERENCES company(ticker);

ALTER TABLE comment
  ADD CONSTRAINT fk1_comment FOREIGN KEY(user_id)
REFERENCES user(user_id),
  ADD CONSTRAINT fk2_comment FOREIGN KEY(parent_comment_id)
REFERENCES comment(comment_id);


ALTER TABLE post_like
  ADD CONSTRAINT fk_post_like FOREIGN KEY(post_id)
REFERENCES post(post_id) ON DELETE CASCADE,
  ADD CONSTRAINT fk2_post_like FOREIGN KEY(user_id)
REFERENCES user(user_id) ON DELETE CASCADE;


ALTER TABLE comment_like
  ADD CONSTRAINT fk_comment_like FOREIGN KEY(comment_id)
REFERENCES comment(comment_id) ON DELETE CASCADE,
  ADD CONSTRAINT fk2_comment_like FOREIGN KEY(user_id)
REFERENCES user(user_id) ON DELETE CASCADE;

-- Create test data


-- MARKETS
INSERT INTO market VALUES(DEFAULT, 'Oslo Børs');

-- SEGMENTS
INSERT INTO segment VALUES(DEFAULT, 'Shipping', 'Shipping er en viktig del av den norske industrien.',DEFAULT, DEFAULT, 1);
INSERT INTO segment VALUES(DEFAULT, 'Energi', 'Norge er store innen energi, og dette er derfor stort på den norske børsen.', DEFAULT, DEFAULT, 1);
INSERT INTO segment VALUES(DEFAULT, 'Sjømat', 'Oslo Børs har mange sjømatselskaper, dette er en kyst-nasjon.',DEFAULT, DEFAULT, 1);

-- COMPANIES
INSERT INTO company VALUES('FAR', 'Farstad Shipping', 'Farstad Shipping har i dag en flåte på 56 skip (27 AHTS, 22 PSV og 7 SUBSEA). Selskapets aktiviteter drives fra Ålesund, Melbourne, Perth, Singapore, Macaé og Rio de Janeiro. Samlet antall ansatte på land og sjø er 1.500. Selskapets strategi er å være en langsiktig og betydelig leverandør av store, moderne offshore servicefartøyer til oljeindustrien internasjonalt.', DEFAULT, DEFAULT, 1);
INSERT INTO company VALUES('HAVI', 'Havila Shipping ASA','Havila Shipping ASA er en ledende aktør for levering av offshore service fartøy tjenester til oljeselskap. Selskapets flåte består av 26 PSV/ AHTS/SubSea fartøy.

',DEFAULT, DEFAULT, 1);

-- Password = testeste
INSERT INTO user VALUES(DEFAULT, 'Ole', 'Gunnar', 'olegunnar', 'ole@gunnar.no', '$2a$05$yusOM1B331.xPlHglrgNEOfgUEj37F4jeWydMaZ9Rvhtc66NGoIJ2',DEFAULT, DEFAULT, DEFAULT);

INSERT INTO user_company VALUES(1, 1, DEFAULT);

INSERT INTO post VALUES(DEFAULT, 'header', 'content', DEFAULT, null, null, default, 1, 'FAR');

INSERT INTO comment VALUES(DEFAULT, 'content', DEFAULT, 1, 1, null);


-- KEEP ON END OF FILE
SET FOREIGN_KEY_CHECKS = 1;

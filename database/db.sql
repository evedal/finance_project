SET FOREIGN_KEY_CHECKS = 0;

DROP TABLE IF EXISTS user;
DROP TABLE IF EXISTS company;
DROP TABLE IF EXISTS post;
DROP TABLE IF EXISTS segment;
DROP TABLE IF EXISTS user_segment;
DROP TABLE IF EXISTS user_company;
DROP TABLE IF EXISTS company_admin;
DROP TABLE IF EXISTS message;
DROP TABLE IF EXISTS comment;
DROP TABLE IF EXISTS user_message;
DROP TABLE IF EXISTS post;
DROP TABLE IF EXISTS _like;
DROP TABLE IF EXISTS comment_like;
DROP TABLE IF EXISTS post_like;

-- COMMON USER
CREATE TABLE user(
    user_id INTEGER AUTO_INCREMENT,
    first_name VARCHAR(100),
    last_name VARCHAR(50),
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) UNIQUE,
    hash VARCHAR(100),
    salt VARCHAR(100),
    register_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_page_admin BOOLEAN DEFAULT TRUE,
    removed BOOLEAN DEFAULT FALSE,
    CONSTRAINT pk_user PRIMARY KEY(user_id)
);
-- Make login identifiers unique
ALTER TABLE user ADD UNIQUE INDEX (username);
ALTER TABLE user ADD UNIQUE INDEX (email);

-- SEGMENTS FOR COMPANY
CREATE TABLE segment(
    segment_id INTEGER  AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL UNIQUE,
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    removed BOOLEAN DEFAULT FALSE,
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
    content VARCHAR(10000) NOT NULL,
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

-- PARENT LIKE FOR BOTH POSTS AND COMMENTS
CREATE TABLE _like(
    like_id INTEGER AUTO_INCREMENT,
    message_id INTEGER,
    received TIMESTAMP,
    user_id INTEGER,
    CONSTRAINT pk__like PRIMARY KEY(like_id)
);

-- LIKE CONNECTED TO POST
CREATE TABLE post_like(
    like_id INTEGER,
    post_id INTEGER NOT NULL
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
    like_id INTEGER,
    comment_id INTEGER NOT NULL
);

-- SET FOREIGN KEYS
ALTER TABLE user_segment
  ADD CONSTRAINT fk1_user_segment FOREIGN KEY(user_id)
REFERENCES user(user_id),
  ADD CONSTRAINT fk2_user_segment FOREIGN KEY(segment_id)
REFERENCES segment(segment_id);



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

ALTER TABLE _like
  ADD CONSTRAINT fk_like FOREIGN KEY(user_id)
REFERENCES user(user_id);

ALTER TABLE post_like
  ADD CONSTRAINT fk_post_like FOREIGN KEY(post_id)
REFERENCES post(post_id) ON DELETE CASCADE;

ALTER TABLE comment_like
  ADD CONSTRAINT fk_comment_like FOREIGN KEY(comment_id)
REFERENCES comment(comment_id) ON DELETE CASCADE;

-- Create test data

-- SEGMENTS
INSERT INTO segment VALUES(DEFAULT, 'Shipping', DEFAULT, DEFAULT);
INSERT INTO segment VALUES(DEFAULT, 'Energi', DEFAULT, DEFAULT);
INSERT INTO segment VALUES(DEFAULT, 'Sjømat', DEFAULT, DEFAULT);

-- COMPANIES
INSERT INTO company VALUES('FAR', 'Farstad Shipping',DEFAULT, DEFAULT, 1);
INSERT INTO company VALUES('HAVI', 'Havila Shipping ASA',DEFAULT, DEFAULT, 1);

INSERT INTO user VALUES(DEFAULT, 'Ole', 'Gunnar', 'olegunnar', 'ole@gunnar.no', 'hash','salt',DEFAULT, DEFAULT, DEFAULT);

INSERT INTO post VALUES(DEFAULT, 'header', 'content', DEFAULT, null, null, default, 1, 'FAR');

INSERT INTO comment VALUES(DEFAULT, 'content', DEFAULT, 1, 1, null);

-- KEEP ON END OF FILE
SET FOREIGN_KEY_CHECKS = 1;

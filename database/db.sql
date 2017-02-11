SET FOREIGN_KEY_CHECKS = 0;

DROP TABLE IF EXISTS user;
DROP TABLE IF EXISTS company;
DROP TABLE IF EXISTS post;
DROP TABLE IF EXISTS segment;
DROP TABLE IF EXISTS user_segment;
DROP TABLE IF EXISTS user_company;
DROP TABLE IF EXISTS message;
DROP TABLE IF EXISTS user_message;
DROP TABLE IF EXISTS post;
DROP TABLE IF EXISTS like;
DROP TABLE IF EXISTS comment_like;
DROP TABLE IF EXISTS post_like;

-- COMMON USER
CREATE TABLE user(
    user_id INTEGER NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(100),
    last_name VARCHAR(50),
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) UNIQUE,
    hash VARCHAR(100),
    salt VARCHAR(100),
    register_date DATE DEFAULT CURDATE(),
    is_page_admin BOOLEAN DEFAULT 1,
    removed BOOLEAN DEFAULT 0,
    CONSTRAINT pk_user PRIMARY KEY(user_id)
);
-- SEGMENTS FOR COMPANY
CREATE TABLE segment(
    segment_id INTEGER NOT NULL AUTO_INCREMENT,
    ticker VARCHAR(10) NOT NULL,
    name VARCHAR(100) NOT NULL,
    created_date DATE DEFAULT CURDATE(),
    removed BOOLEAN DEFAULT 0,
    CONSTRAINT pk_segment PRIMARY KEY(segment_id)
);

-- USER SUBSCRIPED TO SEGMENT
CREATE TABLE user_segment(
    user_id INTEGER,
    segment_id INTEGER,
    subscription_date DATE DEFAULT CURDATE(),
    CONSTRAINT pk_user_segment PRIMARY KEY(user_id, segment_id)
)

CREATE TABLE company(
    company_id INTEGER NOT NULL AUTO_INCREMENT,
    ticker VARCHAR(10) NOT NULL,
    name VARCHAR(100) NOT NULL,
    created_date DATE DEFAULT CURDATE(),
    removed BOOLEAN DEFAULT 0,
    segment_id INTEGER NOT NULL,
    CONSTRAINT pk_company PRIMARY KEY(company_id)
);
-- USER SUBSCRIBED TO A COMPANY
CREATE TABLE user_company(
    user_id INTEGER,
    company_id INTEGER,
    subscription_date DATE DEFAULT CURDATE(),
    CONSTRAINT pk_user_company PRIMARY KEY(user_id, company_id)
)
-- OWN TABLE FOR ADMINS ON COMPANY PAGE
-- CREATED FOR FUTURE ADMIN INFORMATION
CREATE TABLE company_admin(
    company_admin_id INTEGER,
    company_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    CONSTRAINT pk_company_admin PRIMARY KEY(company_admin_id)
)
-- TEXT OR LINK POSTS
CREATE TABLE post(
    post_id INTEGER NOT NULL AUTO_INCREMENT,
    header VARCHAR(200) NOT NULL,
    content VARCHAR(10000) NOT NULL,
    created_date DATE DEFAULT CURDATE(),
    removed BOOLEAN DEFAULT 0,
    user_id INTEGER,
    company_id INTEGER NOT NULL,
    CONSTRAINT pk_post PRIMARY KEY(post_id)
);
-- MESSAGE FROM USER
CREATE TABLE message(
    message_id INTEGER,
    header VARCHAR(200),
    content VARCHAR(10000),
    time_sent DATETIME NOW(),
    user_id INTEGER,
    CONSTRAINT pk_message PRIMARY KEY(message_id)
)
-- RECIEVED MESSAGE
CREATE TABLE user_message(
    user_id INTEGER,
    message_id INTEGER,
    received DATETIME,
    CONSTRAINT pk_user_message PRIMARY KEY(user_id, message_id)
)
CREATE TABLE comment(
    comment_id INTEGER,
    content VARCHAR(10000),
    posted_datetime DATETIME DEFAULT NOW(),
    post_id INTEGER NOT NULL,
    CONSTRAINT pk_post_like PRIMARY KEY(like_id)
)
-- PARENT LIKE FOR BOTH POSTS AND COMMENTS
CREATE TABLE like(
    like_id INTEGER,
    message_id INTEGER,
    received DATETIME,
    user_id INTEGER,
    CONSTRAINT pk_user_message PRIMARY KEY(user_id, message_id)
)
-- LIKE CONNECTED TO POST
CREATE TABLE post_like(
    like_id INTEGER,
    post_id INTEGER NOT NULL
    CONSTRAINT pk_post_like PRIMARY KEY(like_id)
)
-- LIKE CONNECTED TO COMMENT
CREATE TABLE comment_like(
    like_id INTEGER,
    comment_id INTEGER NOT NULL
    CONSTRAINT pk_post_like PRIMARY KEY(like_id)
)

-- SET FOREIGN KEYS
ALTER TABLE user_segment
  ADD CONSTRAINT fk1_user_segment FOREIGN KEY(user_id)
REFERENCES user(user_id),
  ADD CONSTRAINT fk2_user_segment FOREIGN KEY(segment_id)
REFERENCES segment(segment_id);

ALTER TABLE company
  ADD CONSTRAINT fk_company FOREIGN KEY(user_id)
REFERENCES user(user_id);


ALTER TABLE user_company
  ADD CONSTRAINT fk1_user_company FOREIGN KEY(user_id)
REFERENCES user(user_id),
  ADD CONSTRAINT fk2_user_company FOREIGN KEY(company_id)
REFERENCES company(company_id);


ALTER TABLE company_admin
  ADD CONSTRAINT fk1_company_admin FOREIGN KEY(user_id)
REFERENCES user(user_id),
  ADD CONSTRAINT fk2_company_admin FOREIGN KEY(company_id)
REFERENCES company(company_id);

ALTER TABLE post
  ADD CONSTRAINT fk1_post FOREIGN KEY(user_id)
REFERENCES user(user_id),
  ADD CONSTRAINT fk2_post FOREIGN KEY(company_id)
REFERENCES company(company_id);

ALTER TABLE comment
  ADD CONSTRAINT fk1_post FOREIGN KEY(user_id)
REFERENCES user(user_id),
  ADD CONSTRAINT fk2_post FOREIGN KEY(comment_id)
REFERENCES comment(comment_id);

ALTER TABLE like
  ADD CONSTRAINT fk_like FOREIGN KEY(user_id)
REFERENCES user(user_id);

ALTER TABLE post_like
  ADD CONSTRAINT fk_post_like FOREIGN KEY(post_id)
REFERENCES post(post_id);

ALTER TABLE comment_like
  ADD CONSTRAINT fk_comment_like FOREIGN KEY(comment_id)
REFERENCES comment(comment_id);



-- KEEP ON END OF FILE
SET FOREIGN_KEY_CHECKS = 1;

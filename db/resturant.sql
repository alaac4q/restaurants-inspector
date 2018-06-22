DROP DATABASE IF EXISTS restaurant;
CREATE DATABASE restaurant;
\c restaurant;


DROP TABLE Forum_Comments
CASCADE;
CREATE Table Forum_Comments
(
    comment_id SERIAL UNIQUE ,
    restaurant_id VARCHAR,
    comment_title VARCHAR,
    comment VARCHAR,
    comment_date DATE,
    PRIMARY KEY (comment_id)
);


INSERT INTO Forum_Comments (restaurant_id,comment_title,comment,comment_date)
VALUES('41416921','lololol','tttt','02/02/2018');

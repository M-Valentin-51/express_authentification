CREATE TABLE
    user (
        id int(11) UNSIGNED PRIMARY KEY NOT NULL AUTO_INCREMENT,
        name VARCHAR(20) NOT NULL,
        password VARCHAR (255) NOT NULL
    ) engine = InnoDB DEFAULT charset = utf8;
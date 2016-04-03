CREATE TABLE admins
(
  id serial PRIMARY KEY,
  first_name varchar(60),
  last_name varchar(60),
  username varchar(60),
  email_address varchar(100),
  password varchar(128)
);

CREATE TABLE authors
(
  author_id serial PRIMARY KEY,
  first_name varchar(255),
  last_name varchar(255),
  twitter varchar(255),
  email_address varchar(255),
  bio varchar(500),
  photo varchar(255)
);

CREATE TABLE developer_profiles
(
  id serial PRIMARY KEY,
  article_title varchar(255),
  article_blurb varchar(255),
  author_id int REFERENCES authors (author_id),
  published_by int REFERENCES admins (id),
  date_created timestamp with time zone,
  last_modified timestamp with time zone,
  date_approved timestamp with time zone,
  approved_by int REFERENCES admins (id),
  date_published timestamp with time zone,
  article_photo varchar(255),
  featured boolean,
  status character varying(60),
  comments text,
  small_photo character varying(120),
  content text
);

CREATE TABLE tech_profiles
(
  id serial PRIMARY KEY,
  article_title varchar(255),
  article_blurb varchar(255),
  author_id int REFERENCES authors (author_id),
  published_by int REFERENCES admins (id),
  date_created timestamp with time zone,
  last_modified timestamp with time zone,
  date_approved timestamp with time zone,
  approved_by int REFERENCES admins (id),
  date_published timestamp with time zone,
  article_photo varchar(255),
  featured boolean,
  status varchar(50) NOT NULL,
  nj_what text,
  nj_why text,
  nj_how_new_dev text,
  nj_how_exp_dev text,
  nj_how_sr_dev text,
  nj_controversy text,
  j_what text,
  j_why text,
  j_how_new_dev text,
  j_how_exp_dev text,
  j_how_sr_dev text,
  j_controversy text,
  terms text,
  additional_resources text,
  small_photo character varying(120)
);

CREATE TABLE users (
 id SERIAL PRIMARY KEY,
 username VARCHAR(100) NOT NULL UNIQUE,
 role VARCHAR(100),
 author_id int REFERENCES authors (author_id),
 password VARCHAR(120) NOT NULL
);
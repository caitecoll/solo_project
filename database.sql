
-- Create command for author table
CREATE TABLE authors
(
  id serial PRIMARY KEY,
  first_name varchar(255),
  last_name varchar(255),
  twitter varchar(255),
  email_address varchar(255),
  bio varchar(500),
  photo varchar(255)
);

-- Create command for admin table
CREATE TABLE admins
(
  id serial PRIMARY KEY,
  first_name varchar(60),
  last_name varchar(60),
  username varchar(60),
  email_address varchar(100),
  password varchar(128)
);

-- Create command for developer_profiles table
CREATE TABLE developer_profiles
(
  id serial PRIMARY KEY,
  article_title varchar(255),
  article_blurb varchar(255),
  author_id int REFERENCES authors (id),
  created_by int REFERENCES admins (id),
  date_created timestamp,
  last_modified timestamp,
  article_photo varchar(255),
  featured boolean,
  content text
);

-- Create command for tech_profiles table
CREATE TABLE tech_profiles
(
  id serial PRIMARY KEY,
  article_title varchar(255),
  article_blurb varchar(255),
  author_id int REFERENCES authors (id),
  created_by int REFERENCES admins (id),
  date_created timestamp,
  last_modified timestamp,
  article_photo varchar(255),
  featured boolean,
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
  additional_resources text
);
set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";

create table "public"."login" (
  "userId"         serial,
  "username"       text           not null,
  "hashedPassword" text           not null,
  "createdAt"      timestamptz(6) not null default now(),
  primary key ("userId"),
  unique ("username")
);

create table "public"."files" (
  "fileId"         serial,
  "userId"         integer not null,
  "file"           text           not null,
  "description"    text           not null,
  "tableType"      text           not null,
  "dateUploaded"   timestamptz(6) not null default now(),
  primary key ("fileId"),
  FOREIGN KEY ("userId") REFERENCES "login" ("userId")
);

create table "public"."teachers" (
  "teacherId"         text           not Null,
  "teacherName"       text           not null,
  "fileId"            integer        not null,

  primary key ("teacherId"),
  FOREIGN KEY ("fileId") REFERENCES "files" ("fileId")
);

create table "public"."courses" (
  "courseId"         text           not null,
  "courseName"       text           not null,
  "teacherId"        text           not null,
  "fileId"           integer        not null,

  primary key ("courseId"),
  FOREIGN KEY ("teacherId") REFERENCES "teachers" ("teacherId"),
  FOREIGN KEY ("fileId") REFERENCES "files" ("fileId")
);

create table "public"."students" (
  "studentId"         serial,
  "firstName"         text           not null,
  "lastName"          text           not null,
  "grade"             text           not null,
  "courseId"            text           not null,
  "fileId"            integer        not null,
  primary key ("studentId"),
  FOREIGN KEY ("fileId") REFERENCES "files" ("fileId"),
  FOREIGN KEY ("courseId") REFERENCES "courses" ("courseId")
);

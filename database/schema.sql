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
  "userId"            integer        not null,

  primary key ("teacherId", "userId"),
  FOREIGN KEY ("userId") REFERENCES "login" ("userId"),
  FOREIGN KEY ("fileId") REFERENCES "files" ("fileId") DEFERRABLE INITIALLY DEFERRED
);

create table "public"."courses" (
  "courseId"         text           not null,
  "courseName"       text           not null,
  "teacherId"        text           not null,
  "fileId"           integer        not null,
  "userId"           integer        not null,

  primary key ("courseId", "userId"),
  FOREIGN KEY ("userId") REFERENCES "login" ("userId"),
  FOREIGN KEY ("teacherId", "userId") REFERENCES "teachers" ("teacherId", "userId") DEFERRABLE INITIALLY DEFERRED,
  FOREIGN KEY ("fileId") REFERENCES "files" ("fileId") DEFERRABLE INITIALLY DEFERRED
);

create table "public"."students" (
  "studentId"         serial,
  "firstName"         text           not null,
  "lastName"          text           not null,
  "grade"             text           not null,
  "courseId"          text           not null,
  "fileId"            integer        not null,
  "userId"            integer        not null,

  primary key ("studentId", "userId"),
  FOREIGN KEY ("userId") REFERENCES "login" ("userId"),
  FOREIGN KEY ("fileId") REFERENCES "files" ("fileId") DEFERRABLE INITIALLY DEFERRED,
  FOREIGN KEY ("courseId", "userId") REFERENCES "courses" ("courseId", "userId") DEFERRABLE INITIALLY DEFERRED
);

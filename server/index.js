/* eslint-disable quotes */
require('dotenv/config');
const pg = require('pg');
const express = require('express');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken'); // eslint-disable-line
const staticMiddleware = require('./static-middleware');
const errorMiddleware = require('./error-middleware');
const uploadsMiddleware = require('./uploads-middleware');

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

const app = express();
app.use(staticMiddleware);
app.use(express.json());

app.post('/api/auth/sign-up', (req, res, next) => {
  const { username, password } = req.body;
  argon2
    .hash(password)
    .then((hashedPassword) => {
      const sql = `
        insert into "login" ("username", "hashedPassword")
        values ($1, $2)
        returning *
      `;
      const params = [username, hashedPassword];
      return db.query(sql, params);
    })
    .then((result) => {
      const [user] = result.rows;
      res.status(201).json(user);
    })
    .catch((err) => next(err));
});

app.post('/api/auth/sign-in', (req, res, next) => {
  const { username, password } = req.body;

  const sql = `
        select "userId", "username", "hashedPassword"
          from "login"
            where "username" = $1
      `;
  const params = [username];

  db.query(sql, params)
    .then((result) => {
      if (!result.rows[0]) {
        res.status(401).json('invalid login');
      } else {
        const { userId, hashedPassword } = result.rows[0];
        argon2
          .verify(hashedPassword, password)
          .then((isMatching) => {
            if (isMatching) {
              const payload = {
                userId,
                username
              };
              const token = jwt.sign(payload, process.env.TOKEN_SECRET);
              res.status(200).json({ user: payload, token });
            } else {
              res.status(401).json('invalid login');
            }
          })
          .catch((err) => console.error(err));
      }
    });
});

app.post(('/api/auth/my-files'), uploadsMiddleware, (req, res, next) => {
  const { userId, description, tableType, file } = req.body;
  const params = [userId, description, tableType, file];
  const sql = `
          insert into "files" ("userId", "description", "tableType", "file")
          values ($1, $2, $3, $4)
          returning *
        `;
  db.query(sql, params)
    .then((result) => {
      const [user] = result.rows;
      const { tableType, file, fileId } = user;
      const cells = file.split('\r\n');
      let headers;
      switch (tableType) {
        case 'students':
          headers = '"firstName", "lastName", "course", "grade", "fileId"';
          break;
        case 'courses':
          headers = '"courseId", "courseName", "teacherId", "fileId"';
          break;
        case 'teachers':
          headers = '"teacherName", "teacherId", "fileId"';
          break;
      }

      for (let i = 1; i < cells.length; i++) {
        const param = cells[i].split(',');
        const fileIdStr = fileId.toString();
        const params = [...param, fileIdStr];
        let values = '';
        for (let i = 1; i < params.length + 1; i++) {
          values += `$${i}`;
          if (i !== params.length) {
            values += ', ';
          }

        }
        const sql = `
          insert into "${tableType}" (${headers})
          values (${values})
          returning *
        `;
        db.query(sql, params)
          .then((result) => res.status(201).json());
      }

      res.status(201).json(user);
    })
    .catch((err) => {
      console.error(err);
    });
});

app.get('/api/my-files', (req, res) => {
  res.json({ hello: 'world' });
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  process.stdout.write(`\n\napp listening on port ${process.env.PORT}\n\n`);
});

/* eslint-disable quotes */
require('dotenv/config');
const pg = require('pg');
const express = require('express');
const staticMiddleware = require('./static-middleware');
const errorMiddleware = require('./error-middleware');
const uploadsMiddleware = require('./uploads-middleware');
const SignUp = require('./controllers/sign-up');
const SignIn = require('./controllers/sign-in');
const UploadFiles = require('./controllers/upload-files');

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

const app = express();
app.use(staticMiddleware);
app.use(express.json());

app.post('/api/auth/sign-up', (req, res, next) => SignUp({ req, res, next, db }));

app.post('/api/auth/sign-in', (req, res, next) => SignIn({ req, res, next, db }));

app.post(('/api/auth/my-files'), uploadsMiddleware, (req, res, next) => UploadFiles({ req, res, next, db }));

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  process.stdout.write(`\n\napp listening on port ${process.env.PORT}\n\n`);
});

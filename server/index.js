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
const ViewTables = require('./controllers/view-tables');

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

const app = express();
app.use(staticMiddleware);
app.use(express.json());

/**
 * Takes Sign up form and creates login in Database.
 * @param {string} JSON.stringify({username, password}) from SignIn.jsx.
 * @returns {response} that user was created with user promise result
 * @throws {error} if user has similar login already.
 */
app.post('/api/auth/sign-up', (req, res, next) => SignUp({ req, res, next, db }));

/**
 * Takes Sign in form and checks login in Database.
 * @param {string} JSON.stringify({username, password}) from SignIn.jsx.
 * @returns {response} that user login and password matched with user promise result of userID
 * @throws {error} if login is invalid
 */
app.post('/api/auth/sign-in', (req, res, next) => SignIn({ req, res, next, db }));

/**
 * Takes UserId and uploaded files along with parameters that go into files list.
 * @param {object} req of userId, description, file, and tableType from SignIn.jsx.
 * @returns {response} that file uploaded to database
 * @throws {error} file is not a CSV
 */
app.post(('/api/auth/my-files'), uploadsMiddleware, (req, res, next) => UploadFiles({ req, res, next, db }));

/**
 * Takes UserId and displays relational table grabbing from every file user uploaded
 * @param {object} userId to gather files from which userId matches
 * @returns {response} returns data of files in database and displays tables
 * @throws {error} userId invalid or auth invalid
 */
app.get(('/api/auth/my-tables/:userId'), (req, res, next) => ViewTables({ req, res, next, db }));

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  process.stdout.write(`\n\napp listening on port ${process.env.PORT}\n\n`);
});

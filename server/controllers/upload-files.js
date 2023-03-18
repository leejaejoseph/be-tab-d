const uploadTables = require('./utilities/upload-tables');

/**
 * using the objects packaged in the server's files.jsx page, the object is destructured
 * to append into the database. Taking the userID as a main primary key, and description,
 * tabletype, file as other data, stored, a query is made using upload-tables utilities
 * to actually parse the files into its own tables using tableType as its foreign key.
 */
function UploadFiles(param) {
  const { req, res, db } = param;
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
      uploadTables({ user, db });
      res.status(201).json(user);
    })
    .catch((err) => {
      console.error(err);
    });
}

module.exports = UploadFiles;

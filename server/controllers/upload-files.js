const uploadTables = require('./utilities/upload-tables');

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

function UploadFiles(req, res, next, db) {
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
}

module.exports = UploadFiles;

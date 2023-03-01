const argon2 = require('argon2');

function SignUp(req, res, next, db) {
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
}

module.exports = SignUp;

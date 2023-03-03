const argon2 = require('argon2');
const jwt = require('jsonwebtoken');

function SignIn(param) {
  const { req, res, db } = param;
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
}

module.exports = SignIn;

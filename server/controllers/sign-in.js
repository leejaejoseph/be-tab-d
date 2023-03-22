const argon2 = require('argon2');
const jwt = require('jsonwebtoken');

/**
 * sign-in.js is a server sided module taking the request parameter's and taking
 * the input from SignIn.jsx's form and passing to sql the parameters of username
 * and password.
 */
function signIn(param) {
  const { req, res, db } = param;
  const { username, password } = req.body;

  const sql = `
        select "userId", "username", "hashedPassword"
          from "login"
            where "username" = $1
      `;
  const params = [username];

  /**
 * This query takes the resulting userId and checks if its password hashed is
 * equivalent utilizing argon2's verify. This verification is done by querying the
 * postgreSQL database. It then returns an object containing the username and userId
 * under payload and the token so that it can be stored in window's local storage.
 */
  db.query(sql, params)
    .then((result) => {
      if (!result.rows[0]) {
        return res.status(401).json('invalid login');
      } else {
        const { userId, hashedPassword } = result.rows[0];
        return argon2
          .verify(hashedPassword, password)
          .then((isMatching) => {
            if (isMatching) {
              const payload = {
                userId,
                username
              };
              const token = jwt.sign(payload, process.env.TOKEN_SECRET);
              return res.status(200).json({ user: payload, token });
            } else {
              return res.status(401).json('invalid login');
            }
          })
          .catch((err) => console.error(err));
      }
    });
}

module.exports = signIn;

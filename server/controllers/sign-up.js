const argon2 = require('argon2');

/**
 * sign-up.js is a server sided module taking the request parameter's and taking
 * the input from SignIn.jsx's form and passing to sql the parameters of username
 * and password to signup. It checks to see if there are errors on whether the
 * username already exists.
 */
function SignUp(param) {
  const { req, res, db } = param;
  const { username, password } = req.body;
  return argon2
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
      return res.status(201).json(user);
    })
    .catch((err) => {
      if (err.code === '23505' && err.constraint === 'login_username_key') {
        return res.status(400).json({ error: 'Username already exists' });
      } else {
        return res.status(500).json({ error: 'Internal server error' });
      }
    });
}

module.exports = SignUp;

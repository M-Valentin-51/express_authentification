const database = require("../bdd/database");

const read = (req, res, next) => {
  database
    .query("select * from user where name = ?", [req.body.name])
    .then(([users]) => {
      if (users[0] != null) {
        [req.user] = users;
        next();
      } else {
        res.sendStatus(401);
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    });
};

const getUser = (req, res) => {
  database
    .query("select * from user")
    .then(([users]) => {
      res.json(users);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    });
};

const add = (req, res) => {
  const user = req.body;
  database
    .query(`insert into user (name ,password ) values (? , ? )`, [
      user.name,
      user.hashedPassword,
    ])
    .then(([result]) => {
      const id = result.insertId;

      if (id != null) {
        req.user_id = id;
        res.sendStatus(201);
      } else {
        res.sendStatus(401);
      }
    })
    .catch((err) => {
      console.error(err);

      res.status(500).send(errorMessage(err));
    });
};

module.exports = {
  getUser,
  add,
  read,
};

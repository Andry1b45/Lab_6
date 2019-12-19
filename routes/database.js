var express = require("express");
var router = express.Router();

const db = require("../db.js");
/* GET users listing. */
router.get("/", function(req, res, next) { //download data from server
  db.all("SELECT * FROM data", (err, rows) => res.send(rows));
});

router.post("/", (req, res) => { //write data to db
  const { Name, Surname, Nick } = req.body;
  db.run(`INSERT INTO data VALUES (NULL, '${Name}','${Surname}', '${Nick}')`);
  res.sendStatus(200);
});
module.exports = router;

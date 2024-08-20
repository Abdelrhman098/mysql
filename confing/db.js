const mysql = require("mysql");

const db = mysql.createConnection({
  connectionLimit: 30,
  host: "localhost",
  user: "root",
  password: "",
  database: "mydatabase",
});

db.connect((err, connection) => {
  if (err) throw err;
  console.log("Connected to MySQL database");
});

module.exports = db;

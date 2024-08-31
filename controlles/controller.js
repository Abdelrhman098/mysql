const { query } = require("express");
const db = require("../confing/db");

const getAllUser = (req, res) => {
  const sql = "SELECT * FROM users1";
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ erorr: err.message });
    res.status(200).json(results);
  });
};

const getOneUser = (req, res) => {
  const sql = `SELECT * FROM users1 WHERE id =${req.params.id} `;
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json(results);
  });
};

const createUser = (req, res) => {
  const user = { name: req.body.name, email: req.body.email };
  const sql = `INSERT INTO users1 (name, email) VALUES ('${user.name}', '${user.email}')`;
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json("user created....");
  });
};

const UpdateUser = (req, res) => {
  const user = { name: req.body.name, email: req.body.email };
  const sql = `UPDATE users1 SET name = '${user.name}',email = '${user.email}'WHERE id = '${req.params.id}'`;
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json("user updated....");
  });
};
const deleteUser = (req, res) => {
  const sql = `DELETE FROM users1 WHERE id = ${req.params.id}`;
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).send("DELETE SUCCESS");
  });
};
const createTable = (req, res) => {
  const sql =
    "CREATE TABLE accounts (id INT AUTO_INCREMENT, wallet INT,  user_id  INT,PRIMARY KEY (id),FOREIGN KEY(user_id) REFERENCES users1(id))";
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).send("TABLE CREATED  SUCCESS");
  });
};

const createAccount = (req, res) => {
  const account = { wallet: req.body.wallet, user_id: req.body.user_id };
  const sql = `INSERT INTO accounts (wallet,user_id) VALUES ('${account.wallet}', '${account.user_id}')`;
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json("account created....");
  });
};
const getAllACount = (req, res) => {
  const sql = `SELECT account.*, user1.name FROM account JOIN user1 ON account.user_id = user.id; `;
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json(results);
  });
};

module.exports = {
  getAllUser,
  getOneUser,
  createUser,
  UpdateUser,
  deleteUser,
  createTable,
  createAccount,
  getAllACount,
};

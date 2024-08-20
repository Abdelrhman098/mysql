const { query } = require("express");
const db = require("../confing/db");

const getAllUser = (req, res) => {
  const sql = "SELECT * FROM users1";
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0)
      return res.status(404).json({ error: "No users found" });
    res.status(200).json(results);
  });
};

const getOneUser = (req, res) => {
  const sql = "SELECT * FROM users1 WHERE id = ?";
  db.query(sql, [req.params.id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0)
      return res
        .status(404)
        .json({ error: `User with ID ${req.params.id} not found` });
    res.status(200).json(results[0]);
  });
};

const createUser = (req, res) => {
  const sql = "INSERT INTO users1 (name, email) VALUES (?, ?)";
  db.query(sql, [req.body.name, req.body.email], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: "User created", userId: results.insertId });
  });
};

const UpdateUser = (req, res) => {
  const sql = "UPDATE users1 SET name = ?, email = ? WHERE id = ?";
  db.query(
    sql,
    [req.body.name, req.body.email, req.params.id],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      if (results.affectedRows === 0)
        return res.status(404).json({
          error: `User with ID ${req.params.id} not found or no changes made`,
        });
      res.status(200).json({ message: "User updated" });
    }
  );
};

const deleteUser = (req, res) => {
  const sql = "DELETE FROM users1 WHERE id = ?";
  db.query(sql, [req.params.id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.affectedRows === 0)
      return res
        .status(404)
        .json({ error: `User with ID ${req.params.id} not found` });
    res.status(200).json({ message: "User deleted" });
  });
};

const createTable = (req, res) => {
  const sql = `
    CREATE TABLE IF NOT EXISTS accounts (
      id INT AUTO_INCREMENT,
      wallet INT,
      user_id INT,
      PRIMARY KEY (id),
      FOREIGN KEY (user_id) REFERENCES users1(id)
      ON DELETE SET NULL
    )`;
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json({ message: "Table created successfully" });
  });
};

const createAccount = (req, res) => {
  const sql = "INSERT INTO accounts (wallet, user_id) VALUES (?, ?)";
  db.query(sql, [req.body.wallet, req.body.user_id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res
      .status(201)
      .json({ message: "Account created", accountId: results.insertId });
  });
};

const getAllAccount = (req, res) => {
  const sql = `
    SELECT accounts.*, users1.name, users1.email 
    FROM accounts 
    JOIN users1 ON accounts.user_id = users1.id`;
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0)
      return res.status(404).json({ error: "No accounts found" });
    res.status(200).json(results);
  });
};

const getOneAccount = (req, res) => {
  const sql = `
    SELECT accounts.*, users1.name, users1.email 
    FROM accounts 
    JOIN users1 ON accounts.user_id = users1.id 
    WHERE accounts.id = ?`;
  db.query(sql, [req.params.id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0)
      return res
        .status(404)
        .json({ error: `Account with ID ${req.params.id} not found` });
    res.status(200).json(results[0]);
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
  getAllAccount,
  getOneAccount,
};

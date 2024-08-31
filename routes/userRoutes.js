const express = require("express");
const router = express.Router();
const userController = require("../controlles/controller");
router.get("/users", userController.getAllUser);
router.get("/users/createtable", userController.createTable);
router.get("/users/:id", userController.getOneUser);
router.post("/users", userController.createUser);
router.put("/users/:id", userController.UpdateUser);
router.delete("/users/:id", userController.deleteUser);
router.post("/account", userController.createAccount);
router.get("/account", userController.getAllACount);
module.exports = router;

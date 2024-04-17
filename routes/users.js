const express = require("express");
const { registerCtrl, loginCtrl, logoutCtrl } = require("../controllers/userCtrl");
const userRoutes = express.Router();

userRoutes.post('/register',registerCtrl);
userRoutes.post('/login',loginCtrl);
userRoutes.get("/logout", logoutCtrl);

module.exports = userRoutes;


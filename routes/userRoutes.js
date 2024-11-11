const express = require("express");
const router = express.Router();
const { getHomePage, login, logOut, signUp, getSignUpPage } = require("./../controllers/userController");

router.get("/", getHomePage);

router.get("/sign-up", getSignUpPage);

router.post("/log-in", login);

router.get("/log-out", logOut);

router.post("/sign-up", signUp);

module.exports = router;
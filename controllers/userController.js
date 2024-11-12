const passport = require("passport");
const bcrypt = require("bcryptjs");
const pool = require("./../db/pool")


exports.getHomePage = (req, res) => {
    res.render("index", { user: req.user })
}

exports.getSignUpPage = (req, res) =>{ 
    res.render("sign-up-form")
}

exports.logOut = (req, res, next) => {
    req.logout((err) => {
      if (err) {
        return next(err);
      }
      res.redirect("/");
    });
}

exports.signUp = async (req, res, next) => {

  bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
    // if err, do something
    // otherwise, store hashedPassword in DB
    if(err) {
      return next(err);
    }
    try {
      await pool.query("INSERT INTO users (username, password) VALUES ($1, $2)", [
        req.body.username,
        hashedPassword,
      ]);
      res.redirect("/");
      }catch(err) {
        return next(err);
      }
  });
  
    
  }

exports.login = passport.authenticate("local", {
    successRedirect: "/notes",
    failureRedirect: "/"
  })
const passport = require("passport");


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
    try {
      await pool.query("INSERT INTO users (username, password) VALUES ($1, $2)", [
        req.body.username,
        req.body.password,
      ]);
      res.redirect("/");
    } catch(err) {
      return next(err);
    }
  }

exports.login = passport.authenticate("local", {
    successRedirect: "/notes",
    failureRedirect: "/"
  })
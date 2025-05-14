const express = require("express");
const router = express.Router();
const passport = require("passport");
//import models
const Signup = require("../models/Signup");
router.get("/signingup", (req, res) => {
  res.render("signup");
});

router.post("/signingup", async (req, res) => {
  try {
    const user = new Signup(req.body);
    let existingUser = await Signup.findOne({
      email: req.body.email,
    });
    if (existingUser) {
      return res.status(400).send("Not registererd, Email already in use");
    } else {
      await Signup.register(user, req.body.password, (error) => {
        if (error) {
          throw error;
        }
        res.redirect("/login");
      });
    }
    console.log(user);
  } catch (error) {
    res.status(400).render("signup");
    console.log(error);
  }
});

//login
router.get("/login", (req, res) => {
  res.render("login");
});

router.post(
  "/login",
  passport.authenticate("local", { failureRedirect: "/login" }),
  (req, res) => {
    console.log(req.body);
    req.session.user = req.user;
    res.redirect("/admin");
  }
);

router.get("/logout", (req, res) => {
  if (req.session) {
    req.session.destroy((error) => {
      if (error) {
        return res.status(500).send(error, "Error logging out");
      }
      res.redirect("/");
    });
  }
});


module.exports = router;

const express = require("express");
const router = express.Router();
const connectEnsureLogin =require("connect-ensure-login")
//import models
const Student = require("../models/Student");

router.get("/addition", (req, res) => {
  res.render("addition");
});
router.post("/addition", async (req, res) => {
  try {
    const student = new Student(req.body);

    console.log(student);
    await student.save();

    res.redirect("/studentslist");
  } catch (error) {
    res.status(400).render("addition");
    console.log(error);
  }
});
router.get("/studentslist", async (req, res) => {
  try {
    const students = await Student.find().sort({ $natural: -1 });
    res.render("student_list", {
      students: students  // or just { students } using ES6 shorthand
    });
  } catch (error) {
    console.error(error);  // Always log the error for debugging
    res.status(400).send("unable to find student in the db");
  }
});
router.get("/studentprof/:id", async (req, res) => {
  try {
    const student = await Student.findById(req.params.id).lean(); // lean() gives plain JS object

    if (!student) {
      return res.status(404).send("Student not found");
    }

    res.render("profile", {
      surname: student.surname,
      givenname: student.givenname,
      gender: student.gender,
      dob: student.dob,
      country: student.country,
      residence: student.residence,
      phone: student.phone,
      email: student.email,
      skills: student.skills,
      projects: student.projects
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});
module.exports = router;

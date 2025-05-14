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

    res.redirect("/addition");
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
router.get("/updatechild/:id", async (req, res) => {
  try {
    const updateStudent = await Student.findOne({ _id: req.params.id });
    if (!updateStudent) {
      return res.status(404).send("Child not found");
    }
    res.render("update_child", {
      student: updateStudent  // Keep using 'student' to match your template
    });
  } catch (error) {
    console.error("Update error:", error);
    res.status(400).send("Unable to find this child in the db");
  }
});
router.post("/updatechild/:id", async (req, res) => {
  try {
    await Student.findByIdAndUpdate(req.params.id, req.body);
    res.redirect("/studentslist");
  } catch (error) {
    console.error("Update error:", error);
    res.status(400).send("Unable to update child");
  }
});
router.post("/deletechild", connectEnsureLogin.ensureLoggedIn(), async (req, res) => {
  try {
    await Student.deleteOne({ _id: req.body.id });
    res.redirect("/studentslist");
  } catch (error) {
    res.status(400).send("unable to delete this Child in the db");
  }
});
module.exports = router;

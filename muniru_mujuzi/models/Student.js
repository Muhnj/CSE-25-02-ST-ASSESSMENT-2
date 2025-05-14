const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  surname: {
    type: String,
    required: true,
  },
  givenname: {
    type: String,
    required: true,    
  },
  gender: {
    type: String,    
    required: true
  },
  dob: {
    type: Date,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  residence: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true,   
  },
  email: {
    type: String,
    required: true,
    
  },
  skills: {
    type: String,    
    required: true
  },
  projects: {
    type: String,    
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Student", studentSchema);

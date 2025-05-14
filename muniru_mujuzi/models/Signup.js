
const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const signupSchema = new mongoose.Schema({  
  fname: {
    type: String,
    trim: true,
    required: true,
  },
  lname: {
    type: String,
    trim: true,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  phone: {
    type: String,
    trim: true,
    required: true,
  }, 
  gender: {
    type: String,
    trim: true,
    required: true,
  },
  address: {
    type: String,
    trim: true,
    required: true,
  },      
});

signupSchema.plugin(passportLocalMongoose, { usernameField: "email" });

module.exports = mongoose.model("Signup", signupSchema);

//Dependencies
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const passport = require("passport");
const moment = require("moment");
const expressSession = require("express-session")({
  secret: "secret",
  resave: false,
  saveUninitialized: false,
});

require("dotenv").config();


const Signup = require("./models/Signup"); // import model

//Intatiations
const app = express();
const PORT = 3000;



const additionRoutes = require("./routes/additionRoutes");
const authRoutes = require("./routes/authRoutes");

app.locals.moment = moment;
//configurations
mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection
  .on("open", () => {
    console.log("Mongoose connection open");
  })
  .on("error", (err) => {
    console.log(`Connection error: ${err.message}`);
  });
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

//middle ware
app.use(express.static(path.join(__dirname, "public"))); //specifies a folder for static files
app.use(express.urlencoded({ extended: true }));
// express session configs
app.use(expressSession);
app.use(passport.initialize());
app.use(passport.session());

// // passport configs
passport.use(Signup.createStrategy());
passport.serializeUser(Signup.serializeUser());
passport.deserializeUser(Signup.deserializeUser());

//routes
app.use("/", additionRoutes);
app.use("/", authRoutes);


//redirection to unavailable page
app.get("*url", (req, res) => {
  res.send("oops! page not found");
});

//Bootstrapping Server
app.listen(PORT, () => console.log(`listening on port ${PORT}`));

require('dotenv').config()
const express = require('express');
const app = express();


const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

app.use(cookieParser());

const verifyToken = (req, res, next) => {
  let token = req.cookies.jwt; // COOKIE PARSER GIVES YOU A .cookies PROP, WE NAMED OUR TOKEN jwt

  console.log("Cookies: ", req.cookies.jwt);

  jwt.verify(token, process.env.JWT_SECRET, (err, decodedReader) => {
    if (err || !decodedReader) {
      return res.status(401).json({ error: "Unauthorized Request" });
    }
    req.reader = decodedReader; // ADDS A .user PROP TO REQ FOR TOKEN USER
    console.log(decodedReader);

    next();
  });
};

const methodOverride = require("method-override");
app.use(methodOverride("_method"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.use("/auth", require("./controllers/authController.js"));
app.use("/readers", verifyToken, require("./controllers/readersController.js"));
app.use("/books", require("./controllers/booksController.js"));


// User Login/Signup Page
app.get("/", (req, res) => {
  res.render("readers/index.ejs", {
});
});


app.listen(process.env.PORT, ()=>{
    console.log("Project 2 running!");
});
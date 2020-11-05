const express = require("express");
const router = express.Router();
const Reader = require("../models").Reader;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//Get SignUp Form
router.get('/signup', (req, res) => {
    res.render('readers/signup.ejs');
});

// POST - CREATE NEW USER FROM SIGNUP
router.post("/", (req, res) => {
    bcrypt.genSalt(10, (err, salt) => {
      if (err) return res.status(500).json(err);
      bcrypt.hash(req.body.password, salt, (err, hashedPwd) => {
        if (err) return res.status(500).json(err);
        req.body.password = hashedPwd;
        Reader.create(req.body)
          .then((newReader) => {
            const token = jwt.sign(
              {
              username: foundReader.username,
                    id: foundReader.id
                },
                process.env.JWT_SECRET,
              {
                  expiresIn: "30 days"
                },
            );
            console.log(token)
            res.cookie("jwt", token);
            res.redirect(`/readers/profile/${newReader.id}`);
          })
          .catch((err) => {
            console.log(err);
            res.send(`err ${err}`);
          });
      });
    });
  });

//GET Login Form
router.get('/login', (req, res) => {
    res.render('readers/login.ejs');
});

//POST Login
router.post("/login", (req, res) => {
    Reader.findOne({
      where: {
        username: req.body.username,
      },
    }).then((foundReader) => {
      if (foundReader) {
        bcrypt.compare(req.body.password, foundReader.password, (err, match) => {
          if (match) {
            const token = jwt.sign(
              {
              username: foundReader.username,
                    id: foundReader.id
                },
                process.env.JWT_SECRET,
              {
                  expiresIn: "30 days"
                },
            );
            console.log(token);
	          res.cookie("jwt", token);
            res.redirect(`/readers/profile/${foundReader.id}`);
          } else {
            return res.sendStatus(400);
          }
        });
      }
    });
  });

module.exports = router;
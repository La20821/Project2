const express = require("express");
// const readers = require("../readers");
const router = express.Router();


const Reader = require('../models').Reader;
const Books = require('../models').Books;

// // User Login/Signup Page
// router.get("/", (req, res) => {
//       res.render("readers/index.ejs", {
//     });
//   });

//   //Get SignUp Form
// router.get('/signup', (req, res) => {
//     res.render('readers/signup.ejs');
// });

// //POST Login Form
// router.get('/login', (req, res) => {
//     res.render('readers/login.ejs');
// });

// router.post('/login', (req, res) => {
//     // console.log("login")
//     Reader.findOne({
//         where: {
//             username: req.body.username,
//             password: req.body.password,
//         }
//     }).then((foundReader) => {
//         console.log(foundReader)
//         res.redirect(`/readers/profile/${foundReader.id}`)
//     });
// });

// // POST - CREATE NEW USER FROM SIGNUP
// router.post("/", (req, res) => {
//     Reader.create(req.body).then((newReader) => {
//         res.redirect(`/readers/profile/${newReader.id}`);
//     });
// });

// // GET USERS PROFILE
// router.get("/profile/:id", (req, res) => {
//     // console.log("profile")
//     Reader.findByPk(req.params.id, {
//         include: [
//             {
//                 model: Books,
//                 attributes: ['id', 'title'],
//             }
//         ],
//     }).then((readerProfile) => {
//         res.render("readers/profile.ejs", {
//             reader: readerProfile,
//         });
//     });
// });


// GET USERS PROFILE
router.get("/profile/:id", (req, res) => {
    // IF USER ID FROM TOKEN MATCHES THE REQUESTED ENDPOINT, LET THEM IN
    if (req.reader.id == req.params.id) {
      Reader.findByPk(req.params.id, {
        include: [
          {
            model: Books,
            attributes: ["id", "title"],
          },
        ],
      }).then((readerProfile) => {
        res.render("readers/profile.ejs", {
          reader: readerProfile,
        });
      });
    } else {
      // res.json("unauthorized");
      res.redirect("/");
    }
  });

// EDIT PROFILE
router.put("/profile/:id", (req, res) => {
    Reader.update(req.body, {
        where: {
            id: req.params.id,
        },
        returning: true,
    }).then((updatedReader) => {
        console.log(updatedReader);
        res.redirect(`/readers/profile/${req.params.id}`);
    });
});

// Reader can delete their profile
router.delete("/:id", (req, res) => {
    Reader.destroy({ where: { id: req.params.id} }).then(() => {
        res.redirect('/'); //redirect back to index route
    });
});

module.exports = router;
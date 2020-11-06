const express = require('express');
const router = express.Router();

const books = require("../books");
const Books = require('../models').Books;
const Reader = require('../models').Reader;

// This is the index route. Displays all books.
router.get('/', (req, res) => {
  Books.findAll().then((books) => {
    res.render('index.ejs', {
      books: books
    });
  });
});

//GET - Signed In User can add a book
router.get("/new", (req, res) => {
    res.render("new.ejs");
  });

  //GET - SHOW route. Finds one book.
  router.get("/:id", (req, res) => {
    Books.findByPk(req.params.id, {
      include : [Reader]
    })
    .then((books) => {
      res.render("show.ejs", {
        books: books,
      });
    });
  });

//UPDATE - Reader can edit book info 
router.get("/:id/edit", function(req, res) {
  Books.findByPk(req.params.id).then((books) => {
    res.render("edit.ejs", {
      books: books,
    })

  }) 
  })



  router.put('/:id', (req, res) => {
    books[req.params.index] = req.body;
    Books.update(req.body, {
      where: {id: req.params.id},
      returning: true,
    }).then((books) => {
      res.redirect('/books');
    });
});

// router.put('/:id', (req, res) => {
//   console.log('req.params.id',req.params.id)
//   books[req.params.index] = req.body
//   res.redirect('/books');
// });

// Add A New Book
router.post('/', (req, res) => {
  Books.create(req.body).then((newBooks) => {
    res.redirect('/books')
  });
});


router.delete("/:id", (req, res) => {
  Books.destroy({ where: { id: req.params.id } }).then(() => {
    res.redirect("/books");
  });
});

module.exports = router;
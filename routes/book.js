let express = require('express');
let router = express.Router();
//connect with book model to display the models
let Book = require('../models/book');


/* Read Operation */
/* Get route for book list */

router.get('/', async (req, res) => {
    try {
        const books = await Book.find({});
        res.render('book', { title: 'Book List', books }); 
    }   catch (err) {
        return res.status(500).send("Error getting books");
    }
});
// Add a book
router.get('/add', async(req, res) => {
    res.render('addBook', { title: 'Add Book'});
});      

router.post('/add', async(req, res) => {
    const { name, author, originallyPublished, description } =  req.body;
    try {
        const newBook = new Book ({ name, author, originallyPublished, description});
        await newBook.save();
        res.redirect('/books');
    }   catch (err) {
        res.status(500).send('Error Adding Book');
    }
});
//edit a book
router.get('/book-list/edit/:id', async  (req, res) => {
    const bookId = req.params.id;
    try {
      const book = await Book.findById(bookId);
      if (!book) {
        return res.status(404).send('Book not found.');
      }
      res.render('book/edit', {title: 'Edit Book', book});
    } catch (err) {
      console.error('Error getting book:', err);
      res.status(500).send('Error getting book.');
    }
  });
  //update existing flowers
  router.post('/book-list/edit/:id', async (req, res) => {
    const { name, author, originallyPublished, description } = req.body;
    try {
      const updatedbook = await book.findByIdAndUpdate(req.params.id, {
        name, 
        author, 
        originallyPublished, 
        description 
      }, {new: true});
  
      if (!updatedbook) {
        return res.status(404).send('Book not Found.');
      }
      res.redirect('/book-list');
    } catch (err) {
      console.error("Error updating book", err);
      res.status(500).send('Error updated book.');
    }
  });

// Delete a book
router.get('/delete/:id', async (req, res) => {
    await Book.findByIdAndDelete(req.params.id);
    res.redirect('/books');
});

module.exports = router;



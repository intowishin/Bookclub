const router = require('express').Router();
const Book = require('../models/Book.model');
const User = require('../models/User.model');
const axios = require('axios');
const session = require('express-session');
axios.defaults.headers.common['x-api-key'] = process.env.API_KEY;

//Search get route
apiKey = 'AIzaSyAwMsexndvF71mk8XWHm5Mg44DHfyJXRlY';
router.get('/searched-book', (req, res, next) => {
    const { searchTerm } = req.query;
    axios
        .get('https://www.googleapis.com/books/v1/volumes?q=' + searchTerm)
        .then((responseFromAPI) => {
            res.render('books/searched-book', {books: responseFromAPI.data.items });
        })
        .catch((err) => console.error(err));
});

router.post('/my-books', (req, res, next) => {
    const { bookId } = req.body;
    User.findOneAndUpdate( {_id: req.session.currentUser._id}, { $push: { myBooks: {bookId} } } )
        .then(() => res.redirect('/books/my-books'))
        .catch((err) => console.error(err));
});



//My books get route
router.get('/my-books', (req, res, next) => {
    res.render('books/my-books');
});
module.exports = router;

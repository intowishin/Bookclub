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
            res.render('books/searched-book', {
                books: responseFromAPI.data.items,
            });
        })
        .catch((err) => console.error(err));
});

router.post('/my-books', async (req, res, next) => {
    const { bookId, authors, title, image } = req.body;
    try {
        const user = await User.findById(req.session.currentUser._id);
        const book = { id: bookId, authors, title, image };
        user.myBooks.push(book);
        await user.save()
        res.redirect('/books/my-books')
    } catch (e) {
        console.error(e);
    }
});

//My books get route
router.get('/my-books', (req, res, next) => {
   //get current user list of books
   //get details of books
    //render my-books page
    // console.log(req.session.currentUser)
    res.render('books/my-books');
});
module.exports = router;

//router.post('/my-books/:title/:authors', (req, res, next) => {
//     // console.log(req.params.title, req.params.authors);
//     User.findByIdAndUpdate(
//         req.session.currentUser._id,
//         {
//             $push: {
//                 favorites: {
//                     title: req.params.title,
//                     authors: req.params.authors,
//                 },
//             },
//         },
//         { new: true }
//     )
//         .then(() => {
//             res.redirect('/books/my-books');
//         })
//         .catch((err) => console.error(err));
// });

const isLoggedIn = require('../middleware/isLoggedIn');

const router = require('express').Router();

const cloudinary = require('../config/cloudinary.config');

const User = require('../models/User.model');

/* GET home page */
router.get('/', (req, res, next) => {
    res.render('index');
});

//Details page get route
router.get('/details', (req, res, next) => {
    res.render('page-details');
});

//Contact page get route
router.get('/contact', (req, res, next) => {
    res.render('contact');
});

// router.get("/profile", isLoggedIn, (req, res, next) => {
router.get('/profile', (req, res, next) => {
    res.render('profile');
});

router.get('/user/edit-user', (req, res, next) => {
    res.render('user/edit-user');
});

router.post(
    '/user/edit-user',
    cloudinary.single('profile-picture'),
    (req, res, next) => {
        // console.log(req.file)
        let path;

        if (req.file) {
            path = req.file.path;
        }

        // if(req.body.password){}

        User.findByIdAndUpdate(
            req.session.currentUser._id,
            {
                username: req.body.username,
                email: req.body.email,
                // password: req.body.password,
                profilePicture: path,
            },
            { new: true }
        )
            .then((updatedUser) => {
                req.session.currentUser = updatedUser;
                res.redirect('/profile');
            })
            .catch((err) => {
                console.log(err);
                next(err);
            });
    }
);

router.post('/user/delete-user', (req, res, next) => {
    User.findByIdAndDelete(req.session.currentUser._id)
        .then(() => {
            req.session.destroy();
            res.redirect('/');
        })
        .catch((err) => {
            console.log(err);
            next(err);
        });
});

router.post('/thanks-page', (req, res, next) => {
    res.render('thanks-page');
});

module.exports = router;

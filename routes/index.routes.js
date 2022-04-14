const isLoggedIn = require("../middleware/isLoggedIn");

const router = require("express").Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

//Details page get route
router.get("/details", (req, res, next) => {
  res.render("page-details");
})

//Contact page get route
router.get("/contact", (req, res, next) => {
  res.render("contact");
})

// router.get("/profile", isLoggedIn, (req, res, next) => {
router.get("/profile", (req, res, next) => {
  res.render("profile");
})

//My bookclubs get route
router.get("/clubs/my-bookclubs", (req, res, next) => {
  res.render("clubs/my-bookclubs");
})

//My books get route
router.get("/books/my-books", (req, res, next) => {
  res.render("books/my-books");
})

module.exports = router;

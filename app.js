// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require('dotenv/config');

// ℹ️ Connects to the database
require('./db');

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require('express');

// Handles the handlebars
// https://www.npmjs.com/package/hbs
const hbs = require('hbs');

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require('./config')(app);

require('./config/session.config')(app);

// this middleware allows us to have global user object --> "userInSession"
// which we can use now anywhere in our application (in any HBS file)
const globalUserObject = require('./config/global-user.config');
app.use(globalUserObject);

const capitalized = require('./utils/capitalized');
const projectName = 'Bookclub';

app.locals.appTitle = `${capitalized(projectName)}`;

// 👇 Start handling routes here
const index = require('./routes/index.routes');
app.use('/', index);

const authRoutes = require('./routes/auth.routes');
app.use('/auth', authRoutes);

const bookRoutes = require('./routes/books.routes');
app.use('/books', bookRoutes);

const authorRoutes = require('./routes/authors.routes');
app.use('/authors', authorRoutes);

const bookClubRoutes = require('./routes/bookclubs.routes');
app.use('/clubs', bookClubRoutes);

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require('./error-handling')(app);

module.exports = app;

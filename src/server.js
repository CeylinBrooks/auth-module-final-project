'use strict'

// 3rd Party Resources
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const cookieParser = require('cookie-parser')

// Esoteric Resources
const errorHandler = require('./error-handlers/500.js');
const notFound = require('./error-handlers/404.js');
const authRoutes = require('./auth/routes.js');
const v1Routes = require('./routes/v1.js')
const methodOverride = require('method-override');

// Prepare the express app
const app = express();

// App Level MW
app.use(cors());
app.use(morgan('dev'));
app.use(cookieParser())

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.use(methodOverride('_method'));

// Set the view engine for server-side templating
app.set('view engine', 'ejs');

// Routes
app.use(authRoutes);
app.use('/api/v1', v1Routes);

// Catchalls
app.use('*', notFound);
app.use(errorHandler);

module.exports = {
  server: app,
  start: (port) => {
    app.listen(port, () => {
      console.log(`Server Up on ${port}`);
    });
  },
};
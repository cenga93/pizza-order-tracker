const express = require('express');
const dotenv = require('dotenv');
const expressLayouts = require('express-ejs-layouts');
const path = require('path');
const morgan = require('morgan');
// -----------------------------------------------
// const connection = require('./src/database/connection');
const app = express();
const PORT = process.env.PORT || 3000;
const defaultRouter = require('./src/router/default');

// path
const __public = path.join(__dirname, 'public');
const __src = path.join(__dirname, 'src');
const __views = path.join(__src, 'views');

// dotenv init
dotenv.config();

// init database connection
// connection();

// app config
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(expressLayouts);

// set template engine
app.set('view engine', 'ejs');
app.set('views', __views);
app.set('layout', 'layout/_default');

// static files
app.use('/css', express.static(path.join(__public, '/css')));
app.use('/js', express.static(path.join(__public, '/js')));
app.use('/img', express.static(path.join(__public, '/img')));
app.use('/bootstrap/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')));
app.use('/bootstrap/js', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')));
app.use('/jq', express.static(path.join(__dirname, '/node_modules/jquery/dist')));
app.use('/fonts', express.static(path.join(__public, '/www/fonts')));
app.use('/fontsvg', express.static(path.join(__public, '/www/fontsvg')));

// load routes
app.use(defaultRouter);

// start server
app.listen(PORT, () => console.log(`Listening on port: http://localhost:${PORT}`));

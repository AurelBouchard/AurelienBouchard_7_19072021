// Author : AurelBouchard

//"use strict"; // ???????????????????????????????????????????

const express = require('express');
const bodyParser = require('body-parser');

const postRoutes = require('./routes/post');
const userRoutes = require('./routes/user');
const path = require('path');

const dotenv = require('dotenv');
//dotenv.config({ path: path.join(__dirname, '.env') });

const app = express();

const connectToDB = require('./db_management/connection');
const prepareDB = require('./db_management/setup');

// connecting to SQL using sequelize
connectToDB();

// create tables if not exist
prepareDB();


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});


app.use(bodyParser.json()); // DOES NOT HANDLE MULTIPART BODIES !!

//app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/posts', postRoutes);    // / + /:id + /:id/like
app.use('/api/auth', userRoutes);       // /api/auth/signup  +   /api/auth/login    +   /api/auth/unsubscribe

module.exports = app;

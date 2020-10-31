/**
 * Module dependencies
 */
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const config = require('./Config');

/**
 * Create Express App
 */
const app = express();

/**
 * Set Bodyparser for app
 */
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.text({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: false }));

/**
 * Set cores for app
 */
app.use(cors());

/**
 * Connect Database
 */
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
    autoIndex: false, // Don't build indexes
    serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
};

mongoose.connect(config.dbConnectionString, options)
    .catch((err) => {
        console.log(err);
        process.exit(1);
    });

// When successfully connected
mongoose.connection.on('connected', () => {
    console.log('Mongo database connected');
});

// When the connection is disconnected
mongoose.connection.on('disconnected', () => {
    console.log('Mongoose default connection disconnected');
});

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', () => {
    mongoose.connection.close(() => {
        console.log('Mongoose default connection disconnected through app termination');
        process.exit(0);
    });
});

// Loading Models
const User = require('./models/User');
const Department = require('./models/Department');
const Request = require('./models/Request');

/**
 * Here Load All Route Files
 */
const IndexRoute = require('./routes/IndexRoute');
const UserRoute = require('./routes/UserRoute');
const DepartmentRoute = require('./routes/DepartmentRoute');
const RequestRoute = require('./routes/RequestRoute');

/**
 * Here Define All Main Route
 */
app.use('/', IndexRoute);
app.use('/user', UserRoute);
app.use('/department', DepartmentRoute);
app.use('/request', RequestRoute);

/**
 * Export App
 */
module.exports = app;

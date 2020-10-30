const express = require('express');
const dotenv = require('dotenv');

const router = express.Router();
const packageJson = require('../../package.json');

dotenv.config();

router.get('/', (req, res, next) => {
    res.status(200).send({
        title: 'MERN Demo Api Backend',
        environment: process.env.NODE_ENV,
        version: packageJson.version,
    });
});

module.exports = router;
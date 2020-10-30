global.SALT_KEY = 'sJTpWGMQLKpwrz4R2ukjrC2XMG_Yd5';
require('dotenv').config();

const dev = {
    dbConnectionString: 'mongodb://localhost:27017/mern_demo?retryWrites=true&w=majority',
};

const config = {
    dev
};

module.exports = config['dev'];
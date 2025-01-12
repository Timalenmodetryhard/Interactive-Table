require('dotenv').config({ path: '../.env' });

const config = {
    uri: process.env.MONGO_URI,
};

module.exports = config;

const dotenv = require('dotenv');
const path = require('path');

dotenv.config({
    path: (`${process.env.NODE_ENV}.env`)
});

module.exports = {
    NODE_ENV : process.env.NODE_ENV || 'development',
    MAIN_API_URL : process.env.MAIN_API_URL || 'http://localhost:5000/api',
    MONGO_URL: process.env.MONGO_URL,
    PORT : process.env.PORT || 5000
}
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

require('dotenv').config();

const server = express();

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use(morgan('dev'));

const port = process.env.PORT || 3000;

server.listen(port, () => console.log(`Server's Running! Port: ${port}`));

module.exports = server;
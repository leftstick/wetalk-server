'use strict';

var bodyParser = require('body-parser');
var cors = require('./cors');

module.exports = function(app, server) {
    return new Promise(function(resolve) {

        app.use(bodyParser.json());
        app.use(cors);
        resolve();

    });
};

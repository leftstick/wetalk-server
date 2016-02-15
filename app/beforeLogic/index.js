'use strict';

var bodyParser = require('body-parser');
var cors = require('./cors');

module.exports = function(app, server){
    app.use(bodyParser.json());
    app.use(cors);
};

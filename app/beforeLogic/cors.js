'use strict';

var cors = function(req, res, next){
    if (!req.get('Origin')){
        return next();
    }
    res.set('Access-Control-Allow-Origin', req.headers.origin);
    res.set('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT, HEAD, TRACE, DELETE');
    res.set('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Range');
    res.set('Access-Control-Allow-Credentials', 'true');
    if (req.method === 'OPTIONS'){
        return res.status(200).end();
    }
    next();
};

module.exports = cors;

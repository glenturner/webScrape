
const http = require('http');
const mongoose = require('mongoose');

const uristring = 'mongodb://heroku_rgfzg47m:592hmdsffcphck84slgc06guab@ds147551.mlab.com:47551/heroku_rgfzg47m';

/*process.env.MONGOLAB_URI ||
process.env.MONGOLAB_SILVER_URI ||
'mongodb://localhost/news_db';*/

const theport = process.env.PORT || 3000;

// Database configuration - MongoDB
mongoose.connect(uristring, function(err, res){
    if(err){
        console.log('ERROR connecting to: ' + uristring + '. ' + err);
    } else{
        console.log ('Successfully connected to: ' + uristring);
    }
});

const db = mongoose.connection;

module.exports = db;
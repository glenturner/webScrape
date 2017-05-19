
const http = require('http');
const mongoose = require('mongoose');

let uristring = /*'mongodb://heroku_qcgh736g:5bse42ta0huomkht175oprbcrt@ds027779.mlab.com:27779/heroku_qcgh736g';*/

process.env.MONGOLAB_URI ||
process.env.MONGOLAB_SILVER_URI ||
'mongodb://localhost/news_db';

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
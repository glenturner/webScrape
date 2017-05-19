
const http = require('http');
const mongoose = require('mongoose');


const uristring = process.env.MONGODB_URI || 'mongodb://localhost/news_db';


// Database configuration - MongoDB
mongoose.connect(uristring, function(err, res){
    if(err){
        console.log('ERROR connecting to: ' + uristring + '. ' + err);
    } else{
        console.log ('Successfully connected to: ' + uristring);
    }
});

mongoose.Promise = Promise;

const db = mongoose.connection;

module.exports = db;

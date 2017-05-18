const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const logger = require('morgan');
const request = require('request');
const cheerio = require('cheerio');
//Serve static content for the app from the "public" directory in the application directory.

const exHandlebars = require("express-handlebars");

app.engine("handlebars", exHandlebars({ defaultLayout: "main" }));
app.set("view engine", "handlebars");


app.use(logger('dev'));
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(express.static('Public'));


// Require models
const Note = require('./Models/note.js');
const User = require('./Models/user.js');
const Article = require('./Models/article.js');

const db = require('./Config/connection.js');

app.get('/', function(req, res){
    res.render('index');
});

// // request vice
app.get('/vice', function(req, res){
    request('https://news.vice.com/', function(error, response, html){
        let $ = cheerio.load(html);
        $('.stream-unit').each(function(i, element){
            var result = {};

            // Add the text and href of every link, and save them as properties of the result object
            result.title = $(this).find('.simple-unit .title').text();
            // Testing/Debugging //
            console.log("This is " + result.title);
            result.link = $(this).find("a").attr("href");

            let entry = new Article(result);
            entry.save(function(err, doc){
                if(err){
                    console.log(err);
                } else {
                    console.log(doc);
                }
            });
        });
    });
    res.send('<a href="/" class="btn thin black lighten-1">View articles </a>');
});
// vice news find articles
app.get('/articles', function(req, res){
    Article.find({}, function(err, doc){
        if(err){
            console.log(err);
        } else{
            res.json(doc);
        }
    });
});

app.get('/articles/:id', function(req, res){
    Article.findOne({'_id': req.params.id})
        .populate('note')
        .exec(function(err, doc){
            if (err){
                console.log(err);
            } else {
                res.json(doc);
            }
        });
});

app.post('/articles/:id', function(req, res){
    let newNote = new Note(req.body);

    newNote.save(function(err, doc){
        if(err){
            console.log(err);
        } else {
            Article.findOneAndUpdate({'_id': req.params.id}, {'note':doc._id})
                .exec(function(err, doc){
                    if (err){
                        console.log(err);
                    } else {
                        res.send(doc);
                    }
                });

        }
    });
});

let port = process.env.PORT || 3000;

app.listen(port, function(){
    console.log('App running on port ' + port);
});
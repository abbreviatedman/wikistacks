'use strict';
//jshint esversion: 6
//jshint node: true

const express = require('express');
const bodyParser = require('body-parser');
const chalk = require('chalk');
const app = express();
const wikiRouter = require('./routes/wiki.js');
const nunjucks = require('nunjucks');
const models = require('./models');
const port = 3000;

// point nunjucks to the directory containing templates and turn off caching; configure returns an Environment
// instance, which we'll want to use to add Markdown support later.
const env = nunjucks.configure('views', {noCache: true});
// have res.render work with html files
app.set('view engine', 'html');
// when res.render works with html files, have it use nunjucks to do so
app.engine('html', nunjucks.render);

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

models.Users.sync({})
.then(function () {
    return models.Pages.sync({force:true});
})
.then(function () {
    app.listen(port, function () {
        console.log(`Server is listening on port ${port}!`);
    });
})
.catch(console.error);

app.get('/', function(req,res,next){
  res.redirect("/wiki");
});

app.use("/wiki", wikiRouter);



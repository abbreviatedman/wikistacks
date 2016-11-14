'use strict';
//jshint esversion: 6
//jshint node: true

const express = require('express');
const router = express.Router();
const models = require('../models');
const Page = models.Pages;
const User = models.Users;

router.get('/', (req,res,next)=>{
  res.render('../views/index.html');
});

router.get('/add', (req,res,next)=>{
  res.render('../views/addpage.html');
});

router.post('/', (req,res,next)=>{
   // res.json(req.body);
   console.log(req.body);
  var page = Page.build({
    title: req.body.title,
    content: req.body.content
  });


  page.save()
  .then(function(savePage){
    res.redirect(savePage.route);
  }).catch(next);


});

router.get("/:urlTitle", (req,res,next)=>{

  Page.findOne({
     where: {
      urlTitle: req.params.urlTitle
     }
  })
  .then(function(foundPage){
    res.render('wikipage', {page: foundPage});
  })
  .catch(next);

});


module.exports = router;

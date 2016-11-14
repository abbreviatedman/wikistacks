'use strict';
//jshint esversion: 6
//jshint node: true

const Sequelize = require('sequelize');
let db = new Sequelize('postgres://localhost:5432/wikistack',{
  logging: false
});

const Pages = db.define('page', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  urlTitle:{
    type: Sequelize.STRING,
    allowNull: false
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  status: {
    type: Sequelize.ENUM('open', 'closed'),

  },
  date: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW
  }
}, {
  getterMethods: {
    route: function(){
      return "/wiki/" + this.getDataValue("urlTitle");
    }
  },
  hooks: {
      beforeValidate: function (page, options) {
        if (page.title) {
    // Removes all non-alphanumeric characters from title
    // And make whitespace underscore
          page.urlTitle = page.title.replace(/\s+/g, '_').replace(/\W/g, '');
        }else {
    // Generates random 5 letter string
          page.urlTitle = Math.random().toString(36).substring(2, 7);
        }
      }
    }
});

// Pages.hook("beforeValidate", function(page, options){
//   if (title) {
//     // Removes all non-alphanumeric characters from title
//     // And make whitespace underscore
//           this.urlTitle = title.replace(/\s+/g, '_').replace(/\W/g, '');
//         }else {
//     // Generates random 5 letter string
//           this.urlTitle = Math.random().toString(36).substring(2, 7);
//         }
// });

const Users = db.define('user', {
   name: {
    type: Sequelize.STRING,
    is: ["^[a-z]+$",'i'],
    allowNull: false
  },
   email: {
    type: Sequelize.STRING,
    isEmail: true,
    allowNull: false
  }
});


module.exports = {
  Pages: Pages,
  Users: Users
};

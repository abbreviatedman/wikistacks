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
    },
  hooks: {
      beforeValidate: function generateUrlTitle (title) {
        if (title) {
    // Removes all non-alphanumeric characters from title
    // And make whitespace underscore
          return title.replace(/\s+/g, '_').replace(/\W/g, '');
        }else {
    // Generates random 5 letter string
          return Math.random().toString(36).substring(2, 7);
        }
      }
    }
  }
});

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

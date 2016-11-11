const Sequelize = require('sequelize');
let db = new Sequelize('postgres://localhost:5432/wikistack',{
  logging: false
});

const Pages = sequelize.define('page' {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  urlTitle:{
    type: Sequelize.STRING,
    isUrl: true,
    allowNull: false
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  status: {
    type: Sequelize.STRING,
    allowNull: true
  }
});

const Users = sequelize.define('user' {
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

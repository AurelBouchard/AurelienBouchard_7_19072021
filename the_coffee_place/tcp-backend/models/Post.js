const Sequelize = require("sequelize");
const sequelize = require('../db_management/sequelize');

const Post = sequelize.define("Post", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    datetime: {
        type: Sequelize.DATE,       // DATE = DATETIME for mysql
        allowNull: false,
    },
/*    author: {                     // foreign key in SQL : UserId
        type: Sequelize.STRING,     // STRING = VARCHAR(255)
        allowNull: false,
    },*/
    text: {
        type: Sequelize.TEXT,
        allowNull: false,
    },
});

 module.exports = Post;
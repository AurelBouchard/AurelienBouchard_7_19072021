const Sequelize = require("sequelize");
const sequelize = require('../util/database');

const Post = sequelize.define("user", {
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
/*    authorId: {       // AUTOMATICALLY ADDED WITH
        type: Sequelize.INTEGER,     // STRING = VARCHAR(255)
        allowNull: false,
    },*/
    text: {
        type: Sequelize.TEXT,
        allowNull: false,
    },
});

 module.exports = Post;
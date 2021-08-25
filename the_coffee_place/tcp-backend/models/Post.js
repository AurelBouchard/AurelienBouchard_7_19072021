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
    author: {                       // used to quicker the frontend jobs
        type: Sequelize.STRING,     // STRING = VARCHAR(255)
        allowNull: false,
    },
    text: {
        type: Sequelize.TEXT,
        allowNull: false,
    },
    nOfLike: {
        type: Sequelize.INTEGER,
        defaultValue:0,
    },
    nOfComment: {
        type: Sequelize.INTEGER,
        defaultValue:0,
    }
});

 module.exports = Post;
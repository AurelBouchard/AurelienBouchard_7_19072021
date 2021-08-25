const Sequelize = require("sequelize");
//const sequelize = require('../db_management/sequelize');

// this object will be used to create a new table each time a new user is added


const PostsLikedById = {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    postId: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: false,
    },
    createdAt: {
        type: Sequelize.DATE,
        //defaultValue: Sequelize.fn('now'),
        allowNull: true,
    },
    updatedAt: {
        type: Sequelize.DATE,
        //defaultValue: Sequelize.fn('now'),
        allowNull: true,
    }
};

module.exports = PostsLikedById;
const Sequelize = require("sequelize");
//const sequelize = require('../db_management/sequelize');

// this object will be used to create a new table each time a new user is added


const CommentsLikedById = {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    commentId: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: false,
    },
/*    createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now'),
        allowNull: false,
    },
    updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now'),
        allowNull: false,
    }*/
};


module.exports = CommentsLikedById;
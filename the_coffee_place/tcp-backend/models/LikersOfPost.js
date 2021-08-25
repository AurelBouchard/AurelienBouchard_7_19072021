const Sequelize = require("sequelize");
//const sequelize = require('../db_management/sequelize');

const LikersOfPost = {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    userId: {
        type: Sequelize.INTEGER,
        //defaultValue: 0,
        allowNull: true,
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

module.exports = LikersOfPost;
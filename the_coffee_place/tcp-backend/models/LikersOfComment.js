const Sequelize = require("sequelize");
//const sequelize = require('../db_management/sequelize');

const LikersOfComment = {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
};

module.exports = LikersOfComment;
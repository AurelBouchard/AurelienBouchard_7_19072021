const Sequelize = require("sequelize");
const sequelize = require('../db_management/sequelize');

const User = sequelize.define("User", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    pseudo: {
        type: Sequelize.STRING,     // STRING = VARCHAR(255)
        allowNull: false,
        unique: true
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    firstName: {
        type: Sequelize.STRING,
        defaultValue: "?",
    },
    lastName: {
        type: Sequelize.STRING,
        defaultValue: "?",
    },
    email: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: true
    },
    about: {
        type: Sequelize.TEXT,
        allowNull: true,
    },
});

module.exports = User;
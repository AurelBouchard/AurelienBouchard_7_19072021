const Sequelize = require("sequelize");
require('dotenv').config();

const sequelize = new Sequelize(`${process.env.DB_NAME}`, `${process.env.DB_USER}`, `${process.env.DB_PASSWORD}`, {
/*    define: {
        freezeTableName: true
    },*/
    dialect: "mysql",

    host: process.env.DB_HOST,
    port: process.env.DB_port
});

module.exports = sequelize;
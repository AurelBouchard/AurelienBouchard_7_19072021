const sequelize = require('../util/database');


async function connectToDB() {
    try {
        await sequelize.authenticate();
        console.log('Connection to database has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:\n', error);
    }
};

module.exports = connectToDB;
const sequelize = require('./sequelize');
const app = require("../app");

async function connectToDB() {
    console.log('Connecting to database ...');

        const connect = await sequelize.authenticate();
        //.then((result) => {
                //console.log(result);
                console.log("Connection is ok");
                app.connectionIsOk = true;
        //    })
        //    .catch((err) => {
        //        console.error("Unable to connect to the database : "+err.name+".\n"+err.parent.text);
        //    })

}

module.exports = connectToDB;
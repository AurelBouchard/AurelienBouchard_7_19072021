const sequelize = require("./sequelize");

const User = require("../models/User")
const Post = require("../models/Post")

function prepareDB() {
    console.log("Preparing database")
    User.hasMany(Post);

    sequelize
        .sync()
        .then((result) => {
            console.log("Database sync complete");
        })
        .catch((err) => {
            console.log("ERROR SYNCING DB:\n" + err);
        });
}

module.exports = prepareDB;
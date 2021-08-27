const sequelize = require("./sequelize");

const User = require("../models/User");
const Post = require("../models/Post");
const Comm = require('../models/Comm');
const Like = require('../models/Like');

function prepareDB() {
    console.log("Preparing database")
    User.hasMany(Post);     // foreign key : userId
    Post.belongsTo(User);

    Post.hasMany(Like);     // foreign key : postId
    Like.belongsTo(Post);

    User.hasMany(Comm);     // foreign key : userId
    Comm.belongsTo(User);

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
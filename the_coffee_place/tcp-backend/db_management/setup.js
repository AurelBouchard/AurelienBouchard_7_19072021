const User = require("../models/User")
const Post = require("../models/Post")

async function prepareDB() {
    console.log("Preparing database");
    User.sync();
    Post.sync();
}

module.exports = prepareDB;
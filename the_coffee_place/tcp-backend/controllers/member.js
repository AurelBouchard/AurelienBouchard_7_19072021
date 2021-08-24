const User = require('../models/User.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
//const sequelize = require('../db_management/sequelize');



exports.getAll = (req, res) => {
    User.findAll({attributes:['pseudo', 'firstName', 'lastName', 'email', 'about', 'createdAt']})
        .then(allMembers => {
            console.log(allMembers)

            res.status(200).json({allMembers});
        })

};


exports.getOne = (req, res) => {
    User.findOne({where: {pseudo: req.params.pseudo}})
        .then(user => {
            if (!user) {
                console.log("User not found");
                return res.status(400).json({error: "Utilisateur non trouvé."});
            }

            res.status(200).json({
                pseudo: user.pseudo,
                lastName: user.lastName,
                firstName: user.firstName,
                email: user.email,
                about: user.about,
                memberSince: user.createdAt,
            });

            console.log("User's data :");
            console.log(user);
        })
};


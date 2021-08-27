const sequelize = require('../db_management/sequelize');
const queryInterface = sequelize.getQueryInterface();
const User = require('../models/User.js');
const PostsLikedById = require('../models/PostsLikedById');
const CommentsLikedById = require('../models/CommentsLikedById');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');




exports.signUp = (req, res) => {

    if (!isPswOk(req.body.password)) {
            res.status(400).json({message: "Mot de passe trop faible"});
            return 0}

    bcrypt.hash(req.body.password, 10)
        .then(hash =>{

            // preparing and create new user
            const newUser = User.build({
                pseudo: req.body.pseudo,
                email: req.body.email,
                password: hash
            });

            console.log("Try create : "+req.body.pseudo+" / "+req.body.email+" / "+hash);

            newUser.save()
                .then((user) => {
                    // each user have 2 tables dedicated : liked posts and liked comments
                    queryInterface.createTable(
                        "PostsLikedById"+user.dataValues.id,
                        PostsLikedById,
                        {comment:'Created with the user'}
                    )
                    queryInterface.createTable(
                        "CommentsLikedById"+user.dataValues.id,
                        CommentsLikedById,
                        {comment:'Created with the user'}
                    )
                    console.log("User "+user.dataValues.id+" created.");
                    res.status(201).json({message: "Le nouvel utilisateur a été créé !"});
                })
                .catch(err => {
                    try {
                        console.log("Unable to create user: \n" + err.name + ".\n" + err.parent.text);
                    } catch {
                        console.log(err);
                    }

                    res.status(400).json({err});
                });

        })
        .catch(error => res.status(500).json({error}));
};


exports.logIn = (req, res) => {
    User.findOne({where: {pseudo: req.body.pseudo}})
        .then(user => {
            if (!user) {
                console.log("User not found");
                return res.status(400).json({error: "Utilisateur non trouvé."});}

            bcrypt.compare(req.body.password, user.password)
                .then(valid =>{
                    if (!valid) {
                        console.log("Wrong password");
                        return res.status(401).json({error: "Mot de passe erroné."});}

                    console.log("User logged in.");
                    res.status(200).json({/*
                        userId: user.id,
                        token:
                            jwt.sign(
                            {userId: user.id},
                                process.env.JWT_PASS_PHRASE,
                            {expiresIn: '8h'}
                        )*/
                    });
                })
                .catch(error => res.status(500).json({error}));
        })
        .catch(error => res.status(500).json({error}));

};


exports.getFullProfile = (req, res) => {
	User.findOne({where: {pseudo: req.params.pseudo}})
		.then(user => {
            console.log("give full profile data")
			return res.status(200).json({user});
		})
		.catch(err =>  res.status(400).json({err}))
};


exports.update = (req, res) => {
    console.log("---------------------");
    console.log(req.body);
    User.update({ ...req.body },{where: {id: req.params.id}})
        .then(() => {
            console.log("profile update successful")
            return res.status(200).json({message:"Profil mis à jour"});
        })
        .catch(err =>  res.status(400).json({err}))
};


exports.remove = (req, res) => {
    User.destroy({where: {id: req.params.id}})
        .then(()=> {
            console.log("You've been erased.");
            res.status(200).json({message: "Utilisateur supprimé"})
        })
        .catch(error => res.status(400).json({ error }));

};




function isPswOk(password) {
    // use regex : ^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})
    // (?=.*[a-z]) => must includes lowercase
    // (?=.*[A-Z]) => must includes uppercase
    // (?=.*[0-9]) => must includes numbers
    // (?=.*[?!@#$%^&*=|£²³`"'ø§€]) => must includes special char
    // (?=.{8,}) => must be at least 8 chars long
    const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[?!@#$%^&*=|£²³`"'ø§€])(?=.{8,})/;
    return pattern.test(password);
}

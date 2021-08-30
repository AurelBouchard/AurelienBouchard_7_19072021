const sequelize = require('../db_management/sequelize');
const queryInterface = sequelize.getQueryInterface();
const User = require('../models/User.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Like = require("../models/Like");
const {getLikedPosts} = require("./user");




exports.signUp = (req, res) => {

/*    if (!isPswOk(req.body.password)) {    // see note down page
            res.status(400).json({message: "Mot de passe trop faible"});
            return 0}*/

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
                    console.log("User "+user.dataValues.id+" created.");
                    res.status(201).json({message: "Le nouvel utilisateur a été créé !"});
                })
                .catch(err => { try { console.log("Unable to create user : \n" + err.name + ".\n" + err.parent.text);
                    } catch { console.log(err); }
                    res.status(500).json({err});
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


exports.getLikedPosts = (req, res) => {
    console.log("getting the list of id of posts liked by this user")
    Like.findAll({where: {pseudo: req.params.pseudo}, attributes:['PostId']} )
        .then(likedPosts => {
            console.log(likedPosts)
            const list = likedPosts.map( like => like.dataValues.PostId );
            console.log("list :");
            console.log(list);
            res.status(200).json(list)
        })
        .catch(err => { try { console.log("Unable to create user : \n" + err.name + ".\n" + err.parent.text);
        } catch { console.log(err); }
            res.status(404).json({err});
        });
};


exports.update = (req, res) => {
    User.update({ ...req.body },{where: {id: req.params.id}})
        .then(() => {
            console.log("profile update successful")
            return res.status(200).json({message:"Profil mis à jour"});
        })
        .catch(err =>  res.status(400).json({err}))
};


exports.updatePW = (req, res) => {
    User.findOne({where: {id: req.params.id}})
        .then((user) => {
            bcrypt.compare(req.body.oldPassword, user.password)
                .then(valid => {
                    if (!valid) {
                        console.log("Wrong password");
                        return res.status(401).json({error: "Mot de passe erroné."});
                    }

                    console.log("Old password ok");
                })
                .then(() => {
                    bcrypt.hash(req.body.newPassword, 10)
                        .then(hash => {
                            return User.update({ password: hash },{where: {id: req.params.id}})
                        })
                        .then(() => {
                            console.log("password update successful")
                            return res.status(200).json({message:"Mot de passe mis à jour"});
                        })


                })
                .catch(error => res.status(500).json({error}));
        })
        .catch(err =>  res.status(400).json({err}))
};


exports.setAdmin = (req, res) => {
            if (req.body.magicWord !== process.env.MAGIC) {
                console.log("this is not the magic word");
                return res.status(401).json({message: "Mauvais mot magique"})
            } else {
                User.update({isAdmin:1},{where: {id: req.params.id}})
                    .then(() => {
                        console.log("magic word ok => you are admin !");
                        return res.status(200).json({message: "Vous êtes administrateur"})
                    })
                    .catch(err =>  res.status(400).json({err}))
            }
};


exports.remove = (req, res) => {
    User.destroy({where: {id: req.params.id}})
        .then(()=> {
            console.log("You've been erased.");
            res.status(200).json({message: "Utilisateur supprimé"})
        })
        .catch(error => res.status(400).json({ error }));

};



/*
// PASSWORD PATTERN VALIDATED BY FRONTEND WITH SAME REGEX
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
*/

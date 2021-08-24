const User = require('../models/User.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
//const sequelize = require('../db_management/sequelize');



exports.signUp = (req, res) => {

    if (!isPswOk(req.body.password)) {
            res.status(400).json({message: "Mot de passe trop faible"});
            return 0}

    bcrypt.hash(req.body.password, 10)
        .then(hash =>{

            const newUser = User.build({
                pseudo: req.body.pseudo,
                email: req.body.email,
                password: hash
            });

            console.log("Try create : "+req.body.pseudo+" / "+req.body.email+" / "+hash);

            newUser.save()
                .then(() => {
                    console.log("User created.")
                    res.status(201).json({message: "Le nouvel utilisateur a été créé !"})
                })
                .catch(err => {
                    console.log("Unable to create user: \n"+err.name+".\n"+err.parent.text)
                    res.status(400).json({err});
                });
        })
        .catch(error => res.status(500).json({error}));
};


exports.logIn = (req, res) => {
    User.findOne({email: req.body.email})
        .then(user => {
            if (!user) {return res.status(401).json({error: "Utilisateur non trouvé."});}

            bcrypt.compare(req.body.password, user.password)
                .then(valid =>{
                    if (!valid) {return res.status(401).json({error: "Mot de passe erroné."});}
                    res.status(200).json({
                        userId: user._id, // fourni par mongodb à la creation de l'utilisateur
                        token:
                            jwt.sign(
                            {userId: user._id},
                                process.env.JWT_PASS_PHRASE,
                            {expiresIn: '8h'}
                        )
                    });
                })
                .catch(error => res.status(500).json({error}));
        })
        .catch(error => res.status(500).json({error}));

};


exports.remove = (req, res) => {
    // this endpoint is not handled by frontend by now
    // in the future it will must provide a DELETE request from an authenticated and logged user

    User.deleteOne({_id: req.params.id})
        .then(()=> res.status(200).json({message:"Utilisateur supprimé"}))
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
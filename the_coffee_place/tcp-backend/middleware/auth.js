const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];

        console.log("here in auth, token is :")
        console.log(token)

        const decodedToken = jwt.verify(token, `${process.env.JWT_PASS_PHRASE}`);
        const pseudo = decodedToken.pseudo;

        if (req.body.pseudo && req.body.pseudo !== pseudo) {
            throw "Invalid pseudo";
        } else {
            next();
        }

    } catch (error) {
        console.log("Authentication error :");
        console.log(error);
        res.status(403).json({error: error | "Requête non authentifiée !"});
    }
};
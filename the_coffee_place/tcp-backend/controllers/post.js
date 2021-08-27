const User = require('../models/User.js');
const Post = require('../models/Post');
const sequelize = require("../db_management/sequelize");
const queryInterface = sequelize.getQueryInterface();
const LikersOfPost = require("../models/LikersOfPost");
const PostLikedById = require('../models/PostsLikedById')
const {Sequelize} = require("sequelize");




exports.create = (req, res) => {
    User.findOne({where: {pseudo: req.body.author}})
        .then(author => {
            if (!author) {
                console.log("User not found");
                return res.status(400).json({error: "Utilisateur non trouvé."});
            }
            return author.createPost(req.body);
        })
        .then((post)=>{
            // then each post have its own list of likers :
            queryInterface.createTable(
                "LikersOfPost"+post.id,
                LikersOfPost,
                {comment:'Created with the user'}
            )
        })
        .then(() => {
            console.log("Post inserted")
            res.status(201).json({message: "Post enregistré"})
        })
        .catch(error => res.status(400).json({ error }));
};


exports.like = (req, res) => {

    if (req.body.liked) {     // user = liker
        let liker = 0;

        console.log("\nfinding who is the liker");
        User.findOne( {where: {pseudo: req.body.pseudo} } )
            .then(user => {
                liker = user.id;
                console.log("\ngetting the table PostsLikedById"+liker);
                return  sequelize.define("PostsLikedById"+liker, PostLikedById);
            })
            .then(table => {
                console.log("\nadding the postId ("+req.params.id+") to the list of posts liked by this user");
                return table.create({attributes: {postId: parseInt(req.params.id)}})   //  ??????????????????????????? ne fonctionne pas, mais pas d'erreur
            })
            .then(() => {
                console.log("\ngetting the table LikersOfPost"+req.params.id);
                return sequelize.define("LikersOfPost"+req.params.id, LikersOfPost );
            })
            .then(table => {
                console.log("\nadding the userId ("+liker+") to the list of user who like this post");
                return table.create({userId: liker})   //  ??????????????????????????? ne fonctionne pas, mais pas d'erreur
            })
            .then(() => {
                console.log("\nfinding the post with its id ("+req.params.id+")");
                return Post.findOne({where: {id: req.params.id}}, {attributes: ['id','nOfLike']})//, {attributes: ['id','nOfLike']})
            })
            .then(post => {
                console.log("\nincrement nOfLike of this post");
                post.increment('nOfLike');
            })
            .then(() => {
                console.log("\nend of 'like' procedure")
                return res.status(200).json({message: "Post liké"});
            })
            .catch(error => {
                console.log("error while creating like :");
                console.log(error)
                res.status(400).json({error});
            })

        } else {    // user = not a liker anymore

                // remove id of post to list of liked by user

                // remove userId to list of post likers

                // decrement


        }

};


exports.getAll = (req, res) => {
    Post.findAll({attributes:['datetime', 'text', 'author']})      // must Post.replaced by findAndCountAll() https://sequelize.org/master/manual/model-querying-finders.html#-code-findandcountall--code-
        .then(posts => res.status(200).json(posts))
        .catch(error => res.status(400).json({ error }));
};


exports.findById = (req, res) => {
    Post.findOne({where: {id: req.params.id} })
        .then(post => res.status(200).json(post))
        .catch(error => res.status(404).json({ error }));
};


/*exports.modify = (req, res) => {
    const updatedPost = req.file ?
        {...JSON.parse(req.body.post),
            imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
        } : {...req.body};

    Post.updateOne({ _id: req.params.id }, { ...updatedPost, _id: req.params.id })
        .then(() => res.status(200).json({ message: "Post modifiée !"}))
        .catch(error => res.status(400).json({ error }));
};*/


exports.remove = (req, res) => {    // BY ADMIN ONLY
    if (isNaN(req.params.index)) {
        // when a pseudo is provided
        Post.destroy({where: {author: req.params.index}})
            .then(()=> { res.status(200).json({message: "Post(s) supprimé(s)"}); })
            .catch(error => res.status(400).json({ error }));

    } else {
        // an id of post is provided
        Post.destroy({where: {id: req.params.index}})
            .then(()=> { res.status(200).json({message: "Post supprimé"}); })
            .catch(error => res.status(400).json({ error }));
    }


};

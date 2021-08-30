const User = require('../models/User');
const Post = require('../models/Post');
const Comm = require('../models/Comm');
const Like = require('../models/Like');
//const sequelize = require("../db_management/sequelize");
//const queryInterface = sequelize.getQueryInterface();
//const LikersOfPost = require("../models/Like");
//const {Sequelize} = require("sequelize");




exports.create = (req, res) => {
    User.findOne({where: {pseudo: req.body.author}})
        .then(author => {
            if (!author) {
                console.log("User not found");
                return res.status(400).json({error: "Utilisateur non trouvé."});
            }
            return author.createPost(req.body);
        })
        .then(() => {
            console.log("Post inserted")
            res.status(201).json({message: "Post enregistré"})
        })
        .catch(err => { try { console.log("Unable to create post : \n" + err.name + ".\n" + err.parent.text);
        } catch { console.log(err); }
            res.status(400).json({err});
        });
};


exports.addLike = (req, res) => {
    if (req.body.liked) {
        // STRATEGY : find who like, find the concerned post then increment the nOfLikers and create Like that belong to that post
        console.log("\nfinding who is the liker");
        User.findOne({where: {pseudo: req.body.pseudo}})
            .then(user => {

                console.log("\nfinding the post");
                return Post.findOne({where: {id: req.params.id}})
                    .then((post) => {
                        console.log("\nincrement nOfLike of this post");
                        post.increment('nOfLike');

                        console.log("create like");
                        post.createLike({'userId':user.id, 'pseudo':req.body.pseudo});
                        res.status(201).json({message: "Like ajouté"});
                    })
                    .catch(err => {
                        try { console.log("Error while creating like : \n" + err.name + ".\n" + err.parent.text);
                        } catch { console.log(err); }
                        res.status(500).json({err});
                    });
            })
            .catch(err => {
                console.log("user not found");
                res.status(404).json({err});
            });

    } else {
        // STRATEGY : remove the like then find the post and decrement nOfLike
        console.log("\nremove the like");
        Like.destroy({where :{pseudo: req.body.pseudo, postId: req.params.id} })
            .then(() => {
                console.log("\nfinding the post");
                return Post.findOne({where: {id: req.params.id}})
            })
            .then((post) => {
                console.log("\ndecrement nOfLike of this post");
                post.decrement('nOfLike');
                res.status(200).json({message: "Like supprimé"})
            })
            .catch(err => {
                try { console.log("Error while removing like : \n" + err.name + ".\n" + err.parent.text);
                } catch { console.log(err); }
                res.status(500).json({err});
            });
        }
};


exports.addComment = (req, res) => {

        console.log("\nfinding who make the comment");
        User.findOne( {where: {pseudo: req.body.author} } )
            .then(commenter => {
                let entry = {};
                entry['author'] = req.body.author;
                entry['text'] = req.body.comm;
                entry['postId'] = req.params.id;

                console.log("\ncreate the comment");
                return commenter.createComm(entry);
            })
            .then(() =>{
                console.log("\nfinding the post");
                return Post.findOne({where: {id:req.params.id}});
            })
            .then((post) => {
                console.log("\nincrement nOfComment of this post");
                post.increment('nOfComment');
            })
            .then(() => {
                console.log("Comment inserted")
                res.status(201).json({message: "Commentaire enregistré"})
            })
            .catch(err => { try { console.log("Error while creating comment : \n" + err.name + ".\n" + err.parent.text);
            } catch { console.log(err); }
                res.status(500).json({err});
            });
};


exports.getAll = (req, res) => {
    Post.findAll({attributes:['id','text', 'author', 'nOfComment', 'nOfLike', 'UserId', 'createdAt']})      // use findAndCountAll() instead ? https://sequelize.org/master/manual/model-querying-finders.html#-code-findandcountall--code-
        .then(posts => {
            // adapt posts :
            const formattedPosts = posts.map((post) => {
                let formattedPost = {};
                //formattedPost['date'] = ((post.dataValues.datetime).toLocaleString('fr-FR')).split(',')[0];
                let dateTime = [(((post.dataValues.createdAt).toLocaleString('fr-FR')).split(',')[0]).slice(0,-5),
                    (((post.dataValues.createdAt).toLocaleString('fr-FR')).split(',')[1]).slice(0,-3)];
                formattedPost['clock'] = dateTime.join(" - ");
                formattedPost['text'] = post.dataValues.text;
                formattedPost['author'] = post.dataValues.author;
                formattedPost['nOfComment'] = post.dataValues.nOfComment;
                formattedPost['nOfLike'] = post.dataValues.nOfLike;
                formattedPost['UserId'] = post.dataValues.UserId;
                formattedPost['postId'] = post.dataValues.id;
                return formattedPost;
            });
            res.status(200).json(formattedPosts);
        })
        .catch(error => res.status(400).json({ error }));
};


exports.findById = (req, res) => {
    Post.findOne({where: {id: req.params.id} })
        .then(post => res.status(200).json(post))
        .catch(error => res.status(404).json({ error }));
};


exports.getComments = (req, res) => {
    console.log("getting all comments for one post")
    Comm.findAll({where: {postId: req.params.id} })
        .then(comments => {
            console.log(comments);
            // adapt comments :
            const formattedComments = comments.map((comm) => {
                let formattedComm = {};
                formattedComm['text'] = comm.dataValues.text;
                formattedComm['author'] = comm.dataValues.author;
                console.log(formattedComm)
                return formattedComm;
            });
            console.log("------------------------------------------------------------------------ FINALLY :")
            console.log(formattedComments)
            res.status(200).json(formattedComments)
        })
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


/* time formating :
*     const time = new Date;
* time.toLocaleString('fr-FR')).split(',')[0]
*/

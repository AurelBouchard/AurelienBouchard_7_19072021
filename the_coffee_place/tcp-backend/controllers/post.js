const User = require('../models/User.js');
const Post = require('../models/Post');


exports.create = (req, res) => {

    User.findOne({where: {pseudo: req.body.author}})
        .then(author => {
            if (!author) {
                console.log("User not found");
                return res.status(400).json({error: "Utilisateur non trouvé."});
            }
            author.createPost(req.body);
        })
        .then(() => {
            console.log("Post inserted")
            res.status(201).json({message: "Post enregistré !"})
        })
        .catch(error => res.status(400).json({ error }));
};


exports.like = (req, res) => {
    const opinion = req.body.like;  // 1 = like, 0 = unquote
    switch(opinion) {                               // transform to if ---------------------
        case 1:     // post is liked
            Post.updateOne({ _id: req.params.id },     //mongoose function
                {
                    // increment N of likers
                    $inc: { likes: 1},

                    // add userId in list of likers
                    $push: { usersLiked: req.body.userId}
                })
                .then( res.status(200).json({message: "post liked"}) )
                .catch(error => res.status(404).json({ error }));
            break;

        case 0:     // post is not liked or disliked
            Post.findOne({ _id: req.params.id })     //mongoose function
                .then( post =>
                    {   // check if post were liked or disliked
                        try {   // if post were liked
                            if(post.usersLiked.includes(req.body.userId)) {
                                post.updateOne(
                                    // decrement N of likers then remove userId in list of likers
                                    { $inc: { likes: -1}, $pull: { usersLiked: req.body.userId} })
                                    .then( res.status(200).json({message: "post is not liked anymore"}) )
                                    .catch(error => res.status(404).json({ error }));
                            }
                        } catch (err) {console.log(err | "this post is not liked")}

                        try {  // if post were disliked
                            if(post.usersDisliked.includes(req.body.userId)) {
                                post.updateOne(
                                    // decrement N of dislikers then remove userId in list of dislikers
                                    { $inc: { dislikes: -1}, $pull: { usersDisliked: req.body.userId} })
                                    .then( res.status(200).json({message: "post is not disliked anymore"}) )
                                    .catch(error => res.status(404).json({ error }));
                            }
                        } catch (err) {console.log(err | "this post is not disliked")};
                    }
                )
                .catch(error => res.status(404).json({ error }));
            break;

    }

};


exports.getAll = (req, res) => {
    Post.findAll({attributes:['datetime', 'text', 'author']})
        .then(posts => {
            console.log(posts)
            res.status(200).json(posts)
        })
        .catch(error => res.status(400).json({ error }));
};


exports.findById = (req, res) => {
    Post.findOne({ _id: req.params.id })     //mongoose function
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
    Post.deleteOne({_id: req.params.id})     //mongoose function
        .then(()=> res.status(200).json({message:"Post supprimée "}))
        .catch(error => res.status(400).json({ error }));
};

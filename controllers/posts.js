const user = require('../db/models').User;
const comment = require('../db/models').Post;
const like = require('../db/models').Like;
const ResponseFormat = require('../core').ResponseFormat;
module.exports = {
    create(req, res) {
        return post
        .create({
            text: req.body.text,
            image: req.body.image || "",
            userId: req.params.userId
        })
        .then(post => res.status(201).json(ResponseFormat.build(
            post,
            "Post Create Successfully",
            201,
            "success"
        )))
        .catch(error => res.status(400).json(ResponseFormat.error(
            error,
            "Something went wrong when create Post",
            "error"
        )))
    },
    list(req, res) {
        return post
        .all()
        .then(posts => res.status(200).json(ResponseFormat.build(
            posts,
            "Posts Information Retrieve successfully",
            200,
            "success"
        )))
        .catch(error => res.status(400).send(ResponseFormat.build(
            error,
            "something went wrong when retrieve Information",
            400,
            "error"
        )));
    },	
    getPostDetails (req, res) {
        return post
        .findById(req.params.postId, {
            include: [{
                model: like,
                as: 'likes',
				include: [{
					model:user
				}]
            }],
        })
        .then(pst => {
            if(!pst) {
                return res.status(404).json(
                    ResponseFormat.build(
                        {},
                        "No post found",
                        404,
                        "error"
                    )
                )
            }

            return res.status(200).json(
                ResponseFormat.build(
                    pst,
                    "Post information retrieve successfully",
                    200,
                    "success"
                )
            )
        })
        .catch(error => res.status(500).json(
            ResponseFormat.error(
                error,
                "Something went wrong when retrieve the user details",
                500,
                "error"
            )
        ));
    },	
    update(req, res) {
        return post
        .findById(req.params.postId)
        .then(pst => {
            if(!pst) {
                return res.status(404).json(
                    ResponseFormat.error(
                        {},
                        "Post not found",
                        404,
                        "error"
                    )
                );
            }

            return pst
            .update({
                text: req.body.text || pst.text,
                image: req.body.image || pst.image,
                userId: pst.userId
            })
            .then(() => res.status(200).json(
                ResponseFormat.build(
                    pst,
                    "Post Update successfully",
                    200,
                    "success"
                )
            ))
            .catch((error) => res.status(500).json(
                ResponseFormat.build(
                    {},
                    "something went wrong when update the post",
                    500,
                    "error"
                )
            ));
        });
    },
    destroy (req, res) {
        return post
        .findById(req.params.postId)
        .then(pst => {
            if(!pst) {
                return res.status(404).json(
                    ResponseFormat.error(
                        {},
                        "post not found",
                        404,
                        "error"
                    )
                );
            }

            return pst
            .destroy()
            .then(() => res.status(200).json(
               ResponseFormat.build(
                 {},
                 "post deleted successfully",
                 200,
                 "success"
               )
            ))
            .catch(error => res.status(500).json(
                ResponseFormat.error(
                    error,
                    "something went wrong when delete the post",
                    500,
                    "error"
                )
            ));
        });
    }
}
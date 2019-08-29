const user = require('../db/models').User;
const comment = require('../db/models').Post;
const like = require('../db/models').Like;
const ResponseFormat = require('../core').ResponseFormat;
module.exports = {
    create(req, res) {
        return like
        .create({
            userId: req.params.userId,
			postId: req.params.postId
        })
        .then(like => res.status(201).json(ResponseFormat.build(
            like,
            "Like Create Successfully",
            201,
            "success"
        )))
        .catch(error => res.status(400).json(ResponseFormat.error(
            error,
            "Something went wrong when create Like",
            "error"
        )))
    },
    destroy (req, res) {
        return like
        .findById(req.params.likeId)
        .then(lke => {
            if(!lke) {
                return res.status(404).json(
                    ResponseFormat.error(
                        {},
                        "like not found",
                        404,
                        "error"
                    )
                );
            }

            return lke
            .destroy()
            .then(() => res.status(200).json(
               ResponseFormat.build(
                 {},
                 "like deleted successfully",
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
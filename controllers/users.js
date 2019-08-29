const user = require('../db/models').User;
const comment = require('../db/models').Post;
const ResponseFormat = require('../core').ResponseFormat;
module.exports = {
    create(req, res) {
        return user
        .create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
			pass: req.body.pass
        })
        .then(user => res.status(201).json(ResponseFormat.build(
            user,
            "User Create Successfully",
            201,
            "success"
        )))
        .catch(error => res.status(400).json(ResponseFormat.error(
            error,
            "Something went wrong when create User",
            "error"
        )))
    },
    list(req, res) {
        return user
        .all()
        .then(users => res.status(200).json(ResponseFormat.build(
            users,
            "User Information Reterive successfully",
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
    listWithPost(req, res) {
        return user
        .findAll({
            include: [{
                model: post,
                as: 'posts'
            }],
            order:[
             ['createdAt', 'DESC'],
             [{model: post, as:'posts'}, 'createdAt', 'DESC'],
            ],
        })
        .then((users) => res.status(200).json(
            ResponseFormat.build(
                users,
                "all user information are retrieve successfully",
                200,
                "success"
            )
        ))
        .catch((error) => res.status(500).json(
            ResponseFormat.error(
                error,
                "something went wrong when retrieve the data",
                500,
                "error"
            )
        ))
    },
    getUserDetails (req, res) {
        return user
        .findById(req.params.userId, {
            include: [{
                model: post,
                as: 'posts'
            }],
        })
        .then(users => {
            if(!users) {
                return res.status(404).json(
                    ResponseFormat.build(
                        {},
                        "No user found",
                        404,
                        "error"
                    )
                )
            }
            return res.status(200).json(
                ResponseFormat.build(
                    users,
                    "User information retrieve successfully",
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
        return user
        .findById(req.params.userId)
        .then(usr => {
            if(!usr) {
                return res.status(404).json(
                    ResponseFormat.error(
                        {},
                        "User not found",
                        404,
                        "error"
                    )
                );
            }

            return usr
            .update({
                firstName: req.body.firstName || usr.firstName,
                lastName: req.body.lastName || usr.lastName,
                email:  req.body.email || usr.email,
				pass:  req.body.pass || usr.pass
            })
            .then(() => res.status(200).json(
                ResponseFormat.build(
                    usr,
                    "user Update successfully",
                    200,
                    "success"
                )
            ))
            .catch((error) => res.status(500).json(
                ResponseFormat.build(
                    {},
                    "something went wrong when update the user",
                    500,
                    "error"
                )
            ));
        });
    },
    destroy (req, res) {
        return user
        .findById(req.params.userId)
        .then(usr => {
            if(!usr) {
                return res.status(404).json(
                    ResponseFormat.error(
                        {},
                        "user not found",
                        404,
                        "error"
                    )
                );
            }

            return usr
            .destroy()
            .then(() => res.status(200).json(
               ResponseFormat.build(
                 {},
                 "user deleted successfully",
                 200,
                 "success"
               )
            ))
            .catch(error => res.status(500).json(
                ResponseFormat.error(
                    error,
                    "something went wrong when delete the user",
                    500,
                    "error"
                )
            ));
        });
    }
}
const user = require('../db/models').User;
const ResponseFormat = require('../core').ResponseFormat;
module.exports = {
    create(req, res) {
        return request
        .create({
            userId: req.params.userId
        })
        .then(request => res.status(201).json(ResponseFormat.build(
            request,
            "Request Create Successfully",
            201,
            "success"
        )))
        .catch(error => res.status(400).json(ResponseFormat.error(
            error,
            "Something went wrong when create Request",
            "error"
        )))
    },
}
const postsService = require('../service/posts.service');

exports.addPost = (req, res, next) => {
    const { title, description, imagePath, addedByUserId } = req.body;

    if (!title || !description || !imagePath || !addedByUserId) {
        return res.status(400).send({
            success: 0,
            message: "All fields are required."
        });
    }

    const data = {
        title,
        description,
        imagePath,
        datetimeCreated: new Date(), // Setting the current date as datetimeCreated
        addedByUserId
    };

    postsService.addPost(data, (err, results) => {
        if (err) {
            console.log(err);
            return res.status(400).send({
                success: 0,
                data: 'Bad request'
            });
        }
        return res.status(200).send({
            success: 1,
            data: results
        });
    });
};

exports.getAllPosts = (req, res, next) => {
    postsService.getAllPosts((err, results) => {
        if (err) {
            console.log(err);
            return res.status(400).send({
                success: 0,
                data: 'Bad request'
            });
        }
        return res.status(200).send({
            success: 1,
            data: results
        });
    });
};


exports.addPostComment = (req, res, next) => {

    const { comment, post_id, addedByUserId } = req.body;

    if (!comment || !post_id || !addedByUserId) {
        return res.status(400).send({
            success: 0,
            message: "All fields are required."
        });
    }

    const data = {
        comment, 
        datetimeCreated: new Date(),
        post_id,
        addedByUserId
    }; 
    postsService.addPostComment(data, (err, results) => {
        if (err) {
            console.log(err);
            return res.status(400).send({
                success: 0,
                data: 'Bad request'
            });
        }
        return res.status(200).send({
            success: 1,
            data: results
        });
    });
}



exports.getCommentsFromPost = (req, res, next) => {
    const data = {
        /* Ensure post_id matches the database column name, the query parameter, and the data passed */
        post_id: req.query.post_id // Expect post_id from query parameters
    };
    
    postsService.getCommentsFromPost(data, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send({
                success: 0,
                message: 'Internal server error'
            });
        }

        // Check if the results are empty, meaning no comments found for the given post_id
        if (results.length === 0) {
            return res.status(404).send({
                success: 0,
                message: `Post with ID ${data.post_id} not found`
            });
        }

        return res.status(200).send({
            success: 1,
            data: results,
        });
    });
};



exports.likePost = (req, res, next) => {
    const data = {
        post_id: req.body.post_id 
    };
    
    postsService.likePost(data, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(400).send({
                success: 0,
                message: 'Bad request'
            });
        }

        return res.status(200).send({
            success: 1,
            data: results,
        });
    });
};

exports.dislikePost = (req, res, next) => {
    const data = {
        post_id: req.body.post_id 
    };
    
    postsService.dislikePost(data, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(400).send({
                success: 0,
                message: 'Bad request'
            });
        }

        return res.status(200).send({
            success: 1,
            data: results,
        });
    });
};

exports.deletePost = (req, res, next) => {
    const data = {
        post_id: req.query.post_id 
    };
    
    postsService.deletePost(data, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(400).send({
                success: 0,
                message: 'Bad request'
            });
        }

        return res.status(200).send({
            success: 1,
            data: results,
        });
    });
}




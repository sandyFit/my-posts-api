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
        post_id: req.query.post_id // Ensure this matches the key in postsService
    };
    
    postsService.getCommentsFromPost(data, (err, results) => {
        if (err) {
            console.log(err);
            return res.status(400).send({
                success: 0,
                data: 'Bad request'
            });
        }
        return res.status(200).send({
            success: 1,
            data: results,
        });
    });
};




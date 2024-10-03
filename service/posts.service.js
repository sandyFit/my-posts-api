const db = require('../config/db.config');

exports.addPost = (data, callback) => {
    db.query(
        `INSERT INTO posts (title, description, imagePath, datetimeCreated, addedByUserId) 
            VALUES (?, ?, ?, ?, ?)`,
        [data.title, data.description, data.imagePath, data.datetimeCreated, data.addedByUserId],
        (err, results, fields) => {
            if (err) {
                return callback(err);
            }
            return callback(null, "Post added successfully");
        }
    )
}

exports.getAllPosts = (callback) => {
    db.query(
        `SELECT 
            p.id AS postId, 
            p.title, 
            p.description, 
            p.datetimeCreated, 
            p.addedByUserId,
            p.likesCount,
            p.dislikesCount,
            u.firstName, 
            u.lastName 
         FROM posts AS p
         INNER JOIN users AS u ON p.addedByUserId = u.id`,
        [],
        (err, results, fields) => {
            if (err) {
                return callback(err);
            }
            return callback(null, results);
        }
    );
};

exports.addPostComment = (data, callback) => {
    db.query(
        `INSERT INTO comments (comment, datetimeCreated, post_id, addedByUserId) 
            VALUES (?, ?, ?, ?)`,
        [data.comment, data.datetimeCreated, data.post_id, data.addedByUserId],
        (err, results, fields) => {
            if (err) {
                return callback(err);
            }
            return callback(null, "Comment added successfully");
        }
    )
}

exports.getCommentsFromPost = (data, callback) => {
    db.query(
        `SELECT
            c.id,
            c.comment, 
            c.datetimeCreated,
            c.addedByUserId,
            u.firstName, 
            u.lastName 
         FROM comments AS c
         INNER JOIN users AS u ON c.addedByUserId = u.id
         WHERE c.post_id = ?`,
        [data.post_id], // Ensure you use post_id as per your data object
        (err, results, fields) => {
            if (err) {
                return callback(err);
            }
            return callback(null, results);
        }
    );
};

exports.likePost = (data, callback) => {
    db.query(
        `UPDATE posts
        SET likesCount = likesCount + 1
        WHERE id = ?`,
        [data.post_id],
        (err, results, fields) => {
            if (err) {
                return callback(err); // If there's an error during query execution, return the error
            }
            
            // Check if one row was successfully updated in the database
            // AffectedRows is a MySQL property that indicates how many rows were affected by an SQL query
            if (results.affectedRows === 1) {
                return callback(null, 'Like successful'); // If one row was updated, the like was successful
            } else {
                return callback(new Error('Invalid post')); // If no rows were updated, the post_id might not exist
            }
        }
    )
}
exports.dislikePost = (data, callback) => {
    db.query(
        `UPDATE posts
        SET dislikesCount = dislikesCount + 1
        WHERE id = ?`,
        [data.post_id],
        (err, results, fields) => {
            if (err) {
                return callback(err); // If there's an error during query execution, return the error
            }
            
            // Check if one row was successfully updated in the database
            // AffectedRows is a MySQL property that indicates how many rows were affected by an SQL query
            if (results.affectedRows === 1) {
                return callback(null, 'Dislike successful'); // If one row was updated, the like was successful
            } else {
                return callback(new Error('Invalid post')); // If no rows were updated, the post_id might not exist
            }
        }
    )
}

exports.deletePost = (data, callback) => {
    db.query(
        `DELETE FROM posts
        WHERE id = ?`,
        [data.post_id],
        (err, results, fields) => {
            if (err) {
                return callback(err); // If there's an error during query execution, return the error
            }

            if (results.affectedRows === 1) {
                return callback(null, 'Post successfully deleted'); // If one row was updated, the like was successful
            } else {
                return callback(new Error('Invalid post')); // If no rows were updated, the post_id might not exist
            }
        }
    )
}

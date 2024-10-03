const postsController = require('../controller/posts.controller');
const express = require('express');
const router = express.Router();

/**
 * @swagger
 * /posts/add-post:
 *   post:
 *     summary: Add a new post
 *     description: Adds a new post to the database.
 *     tags:
 *       - posts
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Title of the post
 *                 example: Justifying Design's Impact
 *               description:
 *                 type: string
 *                 description: Description of the post
 *                 example: To demonstrate value, teams should show smaller, measurable wins, maintain communication, and build relationships within the organization.
 *               imagePath:
 *                 type: string
 *                 description: URL of the post's image
 *                 example: https://example.com/images/product1.jpg
 *               datetimeCreated:
 *                 type: string
 *                 format: date-time
 *                 description: Timestamp when the post was created
 *                 example: 2024-10-02T00:00:00Z
 *               addedByUserId:
 *                 type: integer
 *                 description: ID of the user who added the post
 *                 example: 1
 *     responses:
 *       200:
 *         description: Post added successfully
 *       400:
 *         description: Bad request, invalid input
 *       500:
 *         description: Internal Server Error. Something went wrong on the server side.
 */
router.post('/add-post', postsController.addPost);

/**
 * @swagger
 * /posts/get-all-posts:
 *   get:
 *     summary: Add a new comment
 *     description: Fetches all posts from the database.
 *     tags:
 *       - posts
 *     responses:
 *       200:
 *         description: A list of posts
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal Server Error. Something went wrong on the server side.
 */
router.get('/get-all-posts', postsController.getAllPosts);

/**
 /**
 * @swagger
 * /posts/add-post-comment:
 *   post:
 *     summary: Add a comment to a post
 *     description: Adds a new comment to a specific post in the database by providing the post ID, user ID, and the comment text.
 *     tags:
 *       - posts
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - comment
 *               - post_id
 *               - addedByUserId
 *             properties:
 *               comment:
 *                 type: string
 *                 description: The comment text.
 *                 example: "This post is very informative!"
 *               post_id:
 *                 type: integer
 *                 description: ID of the post being commented on.
 *                 example: 1
 *               addedByUserId:
 *                 type: integer
 *                 description: ID of the user adding the comment.
 *                 example: 2
 *     responses:
 *       201:
 *         description: Comment added successfully.
 *       400:
 *         description: Bad Request. This may occur if any required data is missing or improperly formatted.
 *       500:
 *         description: Internal Server Error. Something went wrong on the server side.
 */

router.post('/add-post-comment', postsController.addPostComment);

/**
 * @swagger
 * /posts/get-comments-from-post:
 *   get:
 *     summary: Get all comments
 *     description: Fetches all comments from a given post ID.
 *     tags:
 *       - posts
 *     parameters:
 *       - in: query
 *         name: post_id
 *         type: integer
 *         description: Post id
 *         required: true
 *     responses:
 *       200:
 *         description: A list of comments
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal Server Error. Something went wrong on the server side.
 */

router.get('/get-comments-from-post', postsController.getCommentsFromPost);

/**
 /**
 * @swagger
 * /posts/like-post:
 *   put:
 *     summary: Like a post
 *     description: Increment the like count of a specific post by its ID.
 *     tags:
 *       - posts
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - post_id
 *             properties:
 *               post_id:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       200:
 *         description: Post successfully liked
 *       400:
 *         description: Invalid post ID or bad request
 *       500:
 *         description: Internal Server Error
 */

router.put('/like-post', postsController.likePost);


/**
 /**
 * @swagger
 * /posts/dislike-post:
 *   put:
 *     summary: dislike a post
 *     description: Increment the dislike count of a specific post by its ID.
 *     tags:
 *       - posts
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - post_id
 *             properties:
 *               post_id:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       200:
 *         description: Post successfully unliked
 *       400:
 *         description: Invalid post ID or bad request
 *       500:
 *         description: Internal Server Error
 */

router.put('/dislike-post', postsController.dislikePost);

/**
 * @swagger
 * /posts/delete-post:
 *   delete:
 *     summary: Delete a post.
 *     description: Delete a post from a given ID.
 *     tags:
 *       - posts
 *     parameters:
 *       - in: query
 *         name: post_id
 *         type: integer
 *         description: Post id
 *         required: true
 *     responses:
 *       200:
 *         description: Post was successfully deleted
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal Server Error. Something went wrong on the server side.
 */

router.delete('/delete-post', postsController.deletePost);


module.exports = router;

const express = require("express");
const router = express.Router();
const blogController = require("../controller/blogController");
const commentController = require("../controller/commentController")
/**
 * @swagger
 * /api/blogs:
 *   get:
 *     summary: Get all blogs
 *     responses:
 *       200:
 *         description: Success
 */
router.get("/blogs", blogController.getBlogs);
/**
 * @swagger
 * /addblog:
 *   post:
 *     summary: Create a new blog
 *     tags: [Blogs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               author:
 *                 type: string
 *               tags:
 *                  type: string
 *             required:
 *               - title
 *               - content
 *                 - author
 *  
 *     responses:
 *       201:
 *         description: Blog created successfully
 *       400:
 *         description: Bad request
 */
router.post("/addblog", blogController.addBlog);
/**
 * @swagger
 * /editblog/{id}:
 *   put:
 *     summary: Update an existing blog
 *     tags: [Blogs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the blog to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               author:
 *                 type: string
 *               tags:
 *                 type: string
 *             required:
 *               - title
 *               - content
 *     responses:
 *       200:
 *         description: Blog updated successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: Blog not found
 */

router.put("/editblog/:id", blogController.updateBlog);
/**
 * @swagger
 * /deleteblog/{id}:
 *   delete:
 *     summary: Delete a blog by ID
 *     tags: [Blogs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Blog ID to delete
 *     responses:
 *       200:
 *         description: Blog deleted successfully
 *       404:
 *         description: Blog not found
 *       500:
 *         description: Internal server error
 */

router.delete("/deleteblog/:id", blogController.deleteBlog);
/**
 * @swagger
 * /addcom/{id}:
 *   post:
 *     summary: Add a comment to a blog
 *     tags: [Blogs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Blog ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               comments:
 *                 type: string
 *             required:
 *               - comments
 *     responses:
 *       201:
 *         description: Comment added successfully
 *       400:
 *         description: Comment text is required
 *       404:
 *         description: Blog not found
 *       500:
 *         description: Internal server error
 */

router.post("/addcom/:id",commentController.addComment)
module.exports = router;

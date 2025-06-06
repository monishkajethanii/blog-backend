const express = require("express");
const router = express.Router();
const blogController = require("../controller/blogController");
const commentController = require("../controller/commentController")

router.get("/blogs", blogController.getBlogs);
router.post("/addblog", blogController.addBlog);
router.put("/editblog/:id", blogController.updateBlog);
router.delete("/deleteblog/:id", blogController.deleteBlog);
router.post("/addcom/:id",commentController.addComment)
module.exports = router;

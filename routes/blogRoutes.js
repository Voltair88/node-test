const express = require("express");
const blogController = require("../controllers/blogController");
const Router = express.Router();

// blog routes

Router.get("/", blogController.blog_index);

Router.post("/", blogController.blog_create_post);

Router.get("/create", blogController.blog_create_get);

Router.get("/:id", blogController.blog_details);

Router.delete("/:id", blogController.blog_delete);

module.exports = Router;
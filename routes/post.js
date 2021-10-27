const router = require("express").Router();
const Post = require("../models/Post");
const User = require("../models/User");

// create a blog post ...
router.post("/", async (req, res) => {
  const newPost = new Post(req.body);

  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (error) {
    console.log(error);
  }
});

// update a blog post ...
router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (post.userId === req.body.userId) {
      await post.updateOne({ $set: req.body });
      res.status(200).json("Post has been successfully updated");
    } else {
      res.status(403).json("you can only edit your own blog post");
    }
  } catch (error) {
    console.log(error);
  }
});

// delete a blog post ...
router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (post.userId === req.body.userId) {
      await post.deleteOne({ $set: req.body });
      res.status(200).json("Post has been deleted");
    } else {
      res.status(403).json("you can only delete your own blog post");
    }
  } catch (error) {
    console.log(error);
  }
});

// get a blog post ...
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (error) {
    console.log(error);
  }
});

// get all blog posts ...
router.get("/", async (req, res) => {
  try {
    const post = await Post.find();
    res.status(200).json(post);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;

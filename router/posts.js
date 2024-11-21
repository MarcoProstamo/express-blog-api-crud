const path = require("path");
const posts = require(path.join("../db", "posts.js"));

const express = require("express");
const router = express.Router();

// Index
router.get("/", (req, res) => {
  res.json(posts);
});

// Show
router.get("/:id", (req, res) => {
  id = parseInt(req.params.id);
  if (isNaN(id)) {
    res.status(406).json({ error: "Id Not Valid" });
    return;
  }
  const selectedPost = posts.find((post) => post.id === id);
  if (!selectedPost) {
    res.status(404).json({ error: "Post Not Found" });
    return;
  }
  res.json(selectedPost);
});

// Create
router.post("/", (req, res) => {
  res.json("Post Creato");
});

// Update
router.put("/:id", (req, res) => {
  id = parseInt(req.params.id);
  if (isNaN(id)) {
    res.status(406).json({ error: "Id Not Valid" });
    return;
  }
  const selectedPost = posts.find((post) => post.id === id);
  if (!selectedPost) {
    res.status(404).json({ error: "Post Not Found" });
    return;
  }
  res.json(`Post con ID: ${id} → Sostituito`);
});

// Modify
router.patch("/:id", (req, res) => {
  id = parseInt(req.params.id);
  if (isNaN(id)) {
    res.status(406).json({ error: "Id Not Valid" });
    return;
  }
  const selectedPost = posts.find((post) => post.id === id);
  if (!selectedPost) {
    res.status(404).json({ error: "Post Not Found" });
    return;
  }
  res.json(`Post con ID: ${id} → Modificato`);
});

// Destroy
router.delete("/:id", (req, res) => {
  id = parseInt(req.params.id);
  if (isNaN(id)) {
    res.status(406).json({ error: "Id Not Valid" });
    return;
  }

  let selectedPostIndex;
  posts.find((post, index) => {
    if (post.id === id) selectedPostIndex = index;
  });

  if (!posts.find((post) => post.id === id)) {
    res.status(404).json({ error: "Post Not Found" });
    return;
  }

  const postEliminato = posts[selectedPostIndex];
  posts.slice(selectedPostIndex, 1);

  res.json({ postEliminato, posts });
});

module.exports = router;

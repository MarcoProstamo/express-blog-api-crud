const posts = require("../db/posts");

function index(req, res) {
  const filter = req.query.filter ?? "";
  let validPosts = [];
  const filteredPosts = posts.filter((post) => {
    if (post.tags.includes(filter.toLowerCase())) validPosts.push(post);
    return validPosts;
  });
  validPosts.length > 0 ? res.json(validPosts) : res.json(posts);
}

function show(req, res) {
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
}

function create(req, res) {
  res.json("Post Creato");
}

function update(req, res) {
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
}

function modify(req, res) {
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
}

function destroy(req, res) {
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

  posts.splice(selectedPostIndex, 1);
  console.log(posts);
  res.sendStatus(204);
}

module.exports = { index, show, create, update, modify, destroy };

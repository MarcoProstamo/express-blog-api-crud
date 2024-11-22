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
  const newPost = {
    titolo: req.body.titolo,
    contenuto: req.body.contenuto,
    immagine: req.body.immagine,
    tags: req.body.tags,
  };
  newPost.id = 42; // Fixed Value for the Exercise

  if (!newPost.titolo) return res.status(400).json({ error: "Invalid Title" });
  if (!newPost.contenuto)
    return res.status(400).json({ error: "Invalid Content" });
  if (!newPost.immagine)
    return res.status(400).json({ error: "Invalid Image" });
  if (!newPost.tags?.length)
    return res.status(400).json({ error: "Invalid Tags" });

  posts.push(newPost);
  res.sendStatus(201);
}

function update(req, res) {
  const newPost = {
    titolo: req.body.titolo,
    contenuto: req.body.contenuto,
    immagine: req.body.immagine,
    tags: req.body.tags,
  };

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

  if (!newPost.titolo) return res.status(400).json({ error: "Invalid Title" });
  if (!newPost.contenuto)
    return res.status(400).json({ error: "Invalid Content" });
  if (!newPost.immagine)
    return res.status(400).json({ error: "Invalid Image" });
  if (!newPost.tags?.length)
    return res.status(400).json({ error: "Invalid Tags" });

  selectedPost.titolo = newPost.titolo;
  selectedPost.contenuto = newPost.contenuto;
  selectedPost.immagine = newPost.immagine;
  selectedPost.tags = newPost.tags;

  console.log(posts);

  res.json(`Post con ID: ${id} → Sostituito`);
}

function modify(req, res) {
  const newPost = {
    titolo: req.body.titolo,
    contenuto: req.body.contenuto,
    immagine: req.body.immagine,
    tags: req.body.tags,
  };

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

  if (newPost.titolo) selectedPost.titolo = newPost.titolo;
  if (newPost.contenuto) selectedPost.contenuto = newPost.contenuto;
  if (newPost.immagine) selectedPost.immagine = newPost.immagine;
  if (newPost.tags?.length) selectedPost.tags = newPost.tags;

  console.log(posts);
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

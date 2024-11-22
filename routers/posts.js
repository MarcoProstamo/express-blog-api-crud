const express = require("express");
const router = express.Router();
router.use(express.json());

const postController = require("../controllers/postController.js");

// Index
router.get("/", postController.index);
router.get("/:id", postController.show);
router.post("/", postController.create);
router.put("/:id", postController.update);
router.patch("/:id", postController.modify);
router.delete("/:id", postController.destroy);

module.exports = router;

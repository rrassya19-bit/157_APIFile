const express = require("express");
const router = express.Router();
const penulisController = require("../controller/penulisController");
const komikController = require("../controller/komikController");
const genreController = require("../controller/genreController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/register", penulisController.register);

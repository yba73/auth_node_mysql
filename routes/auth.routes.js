const router = require("express").Router();
const { register, login } = require("../controllers/auth.controllers");
const { authMiddleware } = require("../middlewares/auth.middleware");

router.post("/register", register);
router.post("/login", login);

module.exports = router;

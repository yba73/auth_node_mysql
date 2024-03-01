const router = require("express").Router();
const {
  getUser,
  updateUser,
  deleteUser,
} = require("../controllers/users.controllers");
const { authMiddleware } = require("../middlewares/auth.middleware");

router.get("/:id", authMiddleware, getUser);
router.put("/:id", authMiddleware, updateUser);
router.delete("/:id", authMiddleware, deleteUser);

module.exports = router;

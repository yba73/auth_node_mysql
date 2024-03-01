const { register, login } = require("../controllers/auth.controllers");
const {
  getUsers,
  deleteUserByAdmin,
} = require("../controllers/users.controllers");
const { authMiddleware } = require("../middlewares/auth.middleware");
const { isAdmin } = require("../middlewares/isAdmin");

const router = require("express").Router();
/*=== auth ===*/
router.post("/register", register);
router.post("/login", login);
/*===// auth //===*/

/*=== users ===*/
router.get("/users", authMiddleware, isAdmin, getUsers);
router.delete("/users/:id", authMiddleware, isAdmin, deleteUserByAdmin);
/*===// users //===*/

module.exports = router;

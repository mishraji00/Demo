const {insertUser,getUserById,getUsers,deleteUser,updateUser,login} = require("../Controllers/userRegController");
const router = require("express").Router();
const {authenticateToken} =require("../TokenValidation/Token")

router.post("/", insertUser);
router.get("/", authenticateToken, getUsers);
router.get("/:id", authenticateToken, getUserById);
router.put("/:id", authenticateToken,updateUser);
router.delete("/:id", authenticateToken,deleteUser);
router.post("/login", login);

module.exports = router;


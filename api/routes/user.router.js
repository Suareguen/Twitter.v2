const router = require("express").Router();
const {
  getAllUsers,
  getOneUser,
  createUser,
  updateUser,
  deleteUser,
  getUserProfile,
} = require("../controllers/user.controller.js");

const { checkAdmin } = require("../middlewares/auth.js");



router.get("/profile", getUserProfile);


//Admin routes

router.get('/',checkAdmin, getAllUsers)
router.get("/:userId",checkAdmin, getOneUser)

router.post("/",checkAdmin, createUser);

router.put('/:userId',checkAdmin, updateUser)

router.delete("/:userId", checkAdmin, deleteUser);


module.exports = router;

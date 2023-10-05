const router = require("express").Router();
const {
  getAllUsers,
  getOneUser,
  createUser,
  updateUser,
  deleteUser
} = require("../controllers/user.controller.js");

const { checkAuth } =require('../middlewares/auth.js')


router.get('/',checkAuth, getAllUsers)
router.get("/:userId", getOneUser)

router.post("/", createUser);

router.put('/:userId', updateUser)

router.delete('/:userId', deleteUser)


module.exports = router;

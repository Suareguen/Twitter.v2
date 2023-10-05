const router = require('express').Router()
const { checkAuth } = require("../middlewares/auth.js");

router.use('/user',checkAuth,require('./user.router.js'))
router.use("/post", require("./post.router.js"))
router.use("/auth", require("./auth.router.js"))
router.use('/contactInfo', require('./contact_info.router.js'))




module.exports = router




const router = require('express').Router()


router.use('/user', require('./user.router.js'))
router.use("/post", require("./post.router.js"))
router.use("/auth", require("./auth.router.js"));




module.exports = router




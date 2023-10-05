const jwt = require("jsonwebtoken");
const User = require("../models/users.model.js");
require("dotenv").config();

function checkAuth(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(404).send("Token not found");
  }
  jwt.verify(
    req.headers.authorization,
    process.env.SECRET,
    async (error, payload) => {
      if (error) {
        console.log(error.message)
        return res.status(401).send("Token not valid");
      }
      const user = await User.findOne({
        where: {
          email: payload.email,
        },
      });
      if (!user) {
        return res.status(401).send("Token not valid");
      }
      res.locals.user = user;
      next();
    }
  );
}

function checkAdmin(req, res, next) {
    if(res.locals.user.role !== 'admin'){
        return res.status(401).json('Admins only')
    }
    else {
        next()
    }

}





module.exports = { checkAuth, checkAdmin };

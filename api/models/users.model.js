const { connection } = require('../../database/index.js')
const { DataTypes } = require('sequelize')


const User = connection.define("user", {
  userName: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
    unique: {
      args: true,
      msg: "Email incorrect",
    },
    validate: {
      isEmail: true
    },
  },








  
  password: {
    type: DataTypes.STRING,
    validate: {
      len: {
        args: [8, Infinity],
        msg: "Password incorrect",
      },
      
    },
  },
  role: {
    type: DataTypes.ENUM("user", "admin"),
    defaultValue: "user",
  },

});



module.exports = User
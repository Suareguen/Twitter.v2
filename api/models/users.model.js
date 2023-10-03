const { connection } = require('../../database/index.js')
const { DataTypes } = require('sequelize')


const User = connection.define("user", {
  userName: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
  },
  password: {
    type: DataTypes.STRING,
  },
  role: {
    type: DataTypes.ENUM("user", "admin"),
    defaultValue: "user",
  },
})



module.exports = User
const { connection } = require("../../database/index.js");
const { DataTypes } = require("sequelize");

const Post = connection.define("post", {
  title: {
    type: DataTypes.STRING,
  },
  body: {
    type: DataTypes.STRING,
  },
  likes: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
});

module.exports = Post;

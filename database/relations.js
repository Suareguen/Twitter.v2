const User = require("../api/models/users.model.js");
const Post = require("../api/models/posts.model.js");
const ContactInfo = require("../api/models/contact_info.model.js");
const Comment = require("../api/models/comments.model.js");

const addRelationsToModels = () => {
  try {
    // One to One
    User.hasOne(ContactInfo);
    ContactInfo.belongsTo(User);

    // Many to Many
    User.belongsToMany(Post, {
      through: "users_posts",
      as: 'favouriteTweets'
    });
    Post.belongsToMany(User, {
      through: "users_posts",
      as: 'favouriteByUser',
    });

    //One to Many
    User.hasMany(Post, { as:'tweets' });
    Post.belongsTo(User);


    //One to Many
    User.hasMany(Comment);
    Comment.belongsTo(User);

    // One to Many
    Post.hasMany(Comment);
    Comment.belongsTo(Post);

    console.log("Relations added to models!!!");
  } catch (error) {
    throw error;
  }
};

module.exports = addRelationsToModels;

const User = require("../models/users.model.js");
const ContactInfo = require("../models/contact_info.model.js");
const Post = require("../models/posts.model.js");
const Comments = require("../models/comments.model.js");

const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    return res.status(200).json({ users });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getOneUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.userId);
    if (user) {
      return res.status(200).json({ user });
    } else {
      return res.status(404).send("User not found");
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const createUser = async (req, res) => {
  try {
    const userExists = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (userExists) {
      return res.status(409).send("User already exists!!!");
    }
    const user = await User.create(req.body);
    const contactInfo = await ContactInfo.create(req.body);
    await contactInfo.setUser(user);

    return res.status(200).json({ user, contactInfo });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const [user] = await User.update(req.body, {
      where: {
        id: req.params.userId,
      },
    });
    if (user) {
      return res.status(200).json({ message: "User Updated" });
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await User.destroy({
      where: { id: req.params.userId },
    });

    if (user) {
      return res.status(200).json({ message: "User deleted" });
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

async function getUserProfile(req, res) {
  try {
    const user = await User.findOne({
      where: {
        id: res.locals.user.id,
      },
      include: {
        model: Post,
        as: "tweets",
        attributes: ['id', 'title', 'body', 'likes']
      },
    });
    if(user) {
      return res.status(200).json({user})
    }
    else {
      return res.status(404).json('User not found');
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

const getOwnProfile = async (req, res) => {
  try {
    const user = await User.findOne({
      where: { id: res.locals.user.id },
      include: [
        {
          model: Post,
          as: "posts",
          include: {
            model: Comments,
          },
        },
        {
          model: Post,
          attributes: ["id", "title", "content", "likes"],
          as: "favourireTweets",
          // Aquí abajo hacemos que no se nos muestre la tabla intermedia.
          through: { attributes: [] },
        },
      ],
    });

    return res.status(200).json({ user });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports = {
  getAllUsers,
  getOneUser,
  createUser,
  updateUser,
  deleteUser,
  getUserProfile,
};

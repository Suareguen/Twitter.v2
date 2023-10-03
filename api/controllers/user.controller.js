const User = require("../models/users.model.js");

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
    const user = await User.create(req.body);
    return res.status(200).json({ user });
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
    if(user) {
        return res.status(200).json({ message: "User Updated" });
    }
    else {
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

module.exports = {
  getAllUsers,
  getOneUser,
  createUser,
  updateUser,
  deleteUser,
};

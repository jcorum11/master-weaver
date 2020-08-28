const { User } = require("../models");
const { findOneAndDelete } = require("../models/User");

const userController = {
  // GET all users
  getAllUsers(req, res) {
    User.find({})
      .select("-__v")
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.status(400).json(err));
  },

  // GET a single user by its _id and populated thought and friend data
  getUserById({ params }, res) {
    User.findOne({ _id: params.id })
      .select("-__v")
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json("No user with this id!!!");
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.status(500).json(err));
  },

  // POST a new user, expects:"username" and "email"
  createUser({ body }, res) {
    User.create(body)
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.status(400).json(err));
  },

  // PUT to update a user by its _id
  updateUser({ params, body }, res) {
    User.findOneAndUpdate({ _id: params.id }, body, {
      new: true,
      runValidators: true,
    })
      .select("-__v")
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json("No user found with this id!!!");
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.status(400).json(err));
  },

  // DELETE to remove user by its _id
  // BONUS: Remove a user's associated thoughts when deleted.
  deleteUser({ params }, res) {
    User.findOneAndDelete({ _id: params.id })
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json("No user found with this id!!!");
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.status(400).json(err));
  },
};

module.exports = userController;

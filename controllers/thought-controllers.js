const { Thought, User } = require("../models");

const thoughtController = {
  // GET all thoughts
  getAllThoughts(req, res) {
    Thought.find({})
      .select("-__v")
      .then((dbThoughtData) => res.json(dbThoughtData))
      .catch((err) => res.status(500).json(err));
  },

  // GET a single thought by its _id
  getThoughtById({ params }, res) {
    Thought.findOne({ _id: params.id })
      .select("-__v")
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res.status(404).json({ message: "No thought found with this id!!!" });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((err) => res.status(500).json(err));
  },

  // POST a new Thought, expects:"username" and "thoughtText"
  createThought({ params, body }, res) {
    Thought.create(body)
      .then(({ _id }) => {
        return User.findOneAndUpdate(
          { _id: params.userId },
          { $push: { thoughts: _id } },
          { new: true }
        );
      })
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res.status(404).json({message: "No user found with this id!!!"})
        }
        res.json(dbThoughtData);
      })
      .catch((err) => res.status(400).json(err));
  },

  // PUT to update a thought by its _id
  updateThought({ params, body }, res) {
    Thought.findOneAndUpdate({ _id: params.id }, body, {
      new: true,
      runValidators: true,
    })
      .select("-__v")
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res.status(404).json({ message: "No thought found with this id!!!" });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((err) => res.status(400).json(err));
  },

  // DELETE to remove thought by its _id
  deleteThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.id })
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res.status(404).json({ message: "No thought found with this id!!!" });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((err) => res.status(400).json(err));
  },

  //-----------------------------------------------------------------

  // add reply to thought
  addReaction({ params, body }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $push: { reactions: body } },
      { new: true, runValidators: true }
    )
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res.status(404).json({ message: "No thought found with this id!!!" });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((err) => res.status(500).json(err));
  },

  // DELETE to remove Reaction by its _id
  removeReaction({ params }, res) {
    Thought.findOneAndDelete(
      { _id: params.thoughtId },
      { $pull: { reactions: { reactionId: params.reactionId } } }
    )
      .then((dbReactionData) => {
        if (!dbReactionData) {
          res.status(404).json("No thought found with this id!!!");
          return;
        }
        res.json(dbReactionData);
      })
      .catch((err) => res.status(400).json(err));
  },
};

module.exports = thoughtController;

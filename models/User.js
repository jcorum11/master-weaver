const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [
      /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
      "That is not a valid email!!!",
    ],
  },
  // thoughts
  // friends
});

// Schema Settings
// Create a virtual called friendCount that retrieves the length of the user's friends array field on query.

const User = model("User", UserSchema);

module.exports = User;

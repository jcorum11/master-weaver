const { Schema, model } = require("mongoose");
const moment = require("moment");

const ThoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      // format date to something readable with moment.js
      get: (createdAtVal) =>
        moment(createdAtVal).format("MMM DD, YYYY [at] hh:mm a"),
    },
    username: {
      type: String,
      required: true,
    },
    // - reactions (These are like replies)
    //   -Array of nested documents created with the reactionSchema
  },
  { toJSON: { virtuals: true, getters: true } }
);

// Schema Settings
// Create a virtual called reactionCount that retrieves the length of the thought's reactions array field on query.

const Thought = model("Thought", ThoughtSchema);

module.exports = Thought;

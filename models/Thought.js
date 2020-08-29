const { Schema, model, Types } = require("mongoose");
const moment = require("moment");

// user reactions
const ReactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtValue) =>
        moment(createdAtValue).format("MMM DD, YYYY [at] hh:mm a"),
    },
  },
  { toJSON: { virtuals: true, getters: true } }
);

// user thoughts
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
    reactions: [ReactionSchema],
  },
  { toJSON: { virtuals: true, getters: true } }
);

// retrieves the length of the thought's reactions array field on query.
ThoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

const Thought = model("Thought", ThoughtSchema);

module.exports = Thought;

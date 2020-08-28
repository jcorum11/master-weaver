const { Schema, model, Types } = require("mongoose");
const moment = require("moment");

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
    username: {
      type: String,
      required: true,
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

// Schema Settings
  // This will not be a model, but rather will be used as the reaction field's subdocument schema in the Thought model.

const Reaction = model("Reaction", ReactionSchema);

module.exports = Reaction;

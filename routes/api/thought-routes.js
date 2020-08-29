const router = require("express").Router();
const {
  getAllThoughts,
  getThoughtById,
  createThought,
  updateThought,
  deleteThought,
  addReaction, 
  removeReaction,
} = require("../../controllers/thought-controllers");

router.route("/").get(getAllThoughts);
router
  .route("/:id")
  .get(getThoughtById)
  .put(updateThought)
  .delete(deleteThought);
router.route("/user/:userId").post(createThought);
// /api/thoughts
//   GET to get all thoughts
//   GET to get a single thought by its _id
//   POST to create a new thought (don't forget to push the created thought's _id to the associated user's thoughts array field)
//   // example data
//   {
//     "thoughtText": "Here's a cool thought...",
//     "username": "lernantino",
//     "userId": "5edff358a0fcb779aa7b118b"
//   }
//   PUT to update a thought by its _id
//   DELETE to remove a thought by its _id

router.route("/:thoughtId/reactions").post(addReaction)
router.route("/:thoughtId/reactions/:reactionId").delete(removeReaction);

module.exports = router;

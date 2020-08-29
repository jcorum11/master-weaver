const router = require("express").Router();
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} = require("../../controllers/user-controllers");

const { addFriend } = require("../../controllers/friend-controller");

router.route("/").get(getAllUsers).post(createUser);
//   BONUS: Remove a user's associated thoughts when deleted.

router.route("/:id").get(getUserById).put(updateUser).delete(deleteUser);

// /api/users/:userId/friends/:friendId
//   POST to add a new friend to a user's friend list
//   DELETE to remove a friend from a user's friend list
router.route("/:userId/friends/:friendId").post(addFriend).delete()

module.exports = router;

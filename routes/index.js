const router = require("express").Router();
const apiRoutes = require("./api");

router.use("/api", apiRoutes);

router.use((req, res) =>
  res
    .status(404)
    .send(
      "<h1> 404 Error!<h1><h2>You have wandered dangerously near the brink of space, please return to the universe you came from space traveler."
    )
);

module.exports = router;

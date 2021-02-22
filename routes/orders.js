const express = require("express");
// const passport = require("passport");
const router = express.Router();
const { checkout } = require("../controllers/orderControllers");

router.post(
  "/checkout",
  // passport.authenticate("jwt", { session: false }),
  checkout
);

module.exports = router;

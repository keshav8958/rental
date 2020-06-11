const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { getUserById, login, getAllBookings } = require("../controllers/auth");
const { check } = require("express-validator");

router.get("/", auth, getUserById);

router.post(
  "/",
  [
    check("email", "Email must be valid").isEmail(),
    check("password", "Please provide password").not().isEmpty(),
  ],

  login
);

router.get("/allBookings", getAllBookings);

module.exports = router;

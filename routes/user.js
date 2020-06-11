const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const { createUser } = require("../controllers/user");

router.post(
  "/",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Email should be valid").isEmail(),
    check("password", "Must be more than 6 characters").isLength({ min: 6 }),
  ],
  createUser
);

module.exports = router;

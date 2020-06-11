const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { validationResult } = require("express-validator");

// Get user by Id And Authenticate user

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .select("-password")
      .populate("rented.product");

    if (!user) {
      return res.status(400).json({ error: "No user found" });
    }
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

// login

exports.login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Invalid Credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid Credentials" });
    }

    const payload = { user: { id: user.id } };

    jwt.sign(
      payload,
      config.get("jwtSecret"),
      { expiresIn: 300000 },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

exports.getAllBookings = async (req, res) => {
  try {
    const users = await User.find();
    let allBookings = [];

    users.map((user) => {
      user.rented.map((rented) => {
        allBookings.push(rented);
      });
    });

    res.json(allBookings);
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};

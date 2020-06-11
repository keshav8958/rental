const Category = require("../models/Category");
const { validationResult } = require("express-validator");

// Get all categories

exports.getAllCategory = async (req, res) => {
  try {
    const categories = await Category.find();
    if (!categories) {
      return res.status(400).json({ error: "No category exists till now" });
    }
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// Get category by Id

exports.getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.cid);
    if (!category) {
      return res.status(400).json({ error: "No Category found" });
    }
    res.json(category);
  } catch (error) {
    if (error.name == "CastError") {
      return res.status(400).json({ msg: "No category found" });
    }
    res.status(500).json({ error: "Server error" });
  }
};

// Create category

exports.createCategory = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }
  const { name } = req.body;

  try {
    let category = await Category.findOne({ name });
    if (category) {
      return res.status(400).json({ error: "Category already exists" });
    }
    category = new Category({ name });
    await category.save();
    res.json(category);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// Update category

exports.updateCategory = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }

  try {
    const category = await Category.findById(req.params.cid);
    if (!category) {
      return res.status(400).json({ error: "No category found" });
    }
    category.name = req.body.name;
    await category.save();
    res.json({ message: "Category updated successfully" });
  } catch (error) {
    if (error.name == "CastError") {
      return res.status(400).json({ msg: "No category found" });
    }
    res.status(500).json({ error: "Server error" });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.cid);
    if (!category) {
      return res.status(400).json({ error: "No category found" });
    }
    await category.remove();

    res.json({ message: "Category deleted successfully" });
  } catch (error) {
    if (error.name == "CastError") {
      return res.status(400).json({ msg: "No category found" });
    }
    res.status(500).json({ error: "Server error" });
  }
};

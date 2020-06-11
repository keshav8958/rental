const express = require("express");
const router = express.Router();

const { check } = require("express-validator");
const auth = require("../middleware/auth");
const {
  createCategory,
  getAllCategory,
  updateCategory,
  getCategoryById,
  deleteCategory,
} = require("../controllers/category");

router.get("/", getAllCategory);

router.get("/:cid", getCategoryById);

router.post(
  "/",
  [check("name", "Name is required").not().isEmpty()],
  auth,
  createCategory
);

router.put(
  "/:cid",
  [check("name", "Name is required").not().isEmpty()],
  updateCategory
);

router.delete("/:cid", deleteCategory);

module.exports = router;

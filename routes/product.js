const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const {
  createProduct,
  updateProduct,
  getAllProduct,
  getProductById,
  reserveProduct,
  deleteProduct,
} = require("../controllers/product");
const auth = require("../middleware/auth");

router.get("/", getAllProduct);

router.get("/:pid", getProductById);

router.post(
  "/",

  [
    check("category", "Category is required").not().isEmpty(),
    check("address", "Address is reuired").not().isEmpty(),
    check("name", "Name is required").not().isEmpty(),
    check("price", "Price is required").isInt().not().isEmpty(),
    check("price", "Price should be valid").isInt(),
    check("city", "City is required").not().isEmpty(),
    check("country", "Country is required").not().isEmpty(),
  ],
  auth,
  createProduct
);

router.put("/:pid", auth, updateProduct);
router.delete("/:pid", auth, deleteProduct);

// Booking

router.post("/reserve/:pid", auth, reserveProduct);

module.exports = router;

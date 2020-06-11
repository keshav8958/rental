const Product = require("../models/Product");
const User = require("../models/User");
const { validationResult } = require("express-validator");

exports.getAllProduct = async (req, res) => {
  try {
    const products = await Product.find().populate("user rented.user");

    if (!products) {
      return res.status(400).json({ error: "No products exists" });
    }
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.pid);
    if (!product) {
      return res.status(400).json({ error: "No product found" });
    }
    res.json(product);
  } catch (error) {
    if (error.name == "CastError") {
      return res.status(400).json({ msg: "No product found" });
    }
    res.status(500).json({ error: "Server error" });
  }
};

exports.createProduct = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }

  try {
    req.body.user = req.user.id;
    let product = new Product({ ...req.body });

    await product.save();
    res.json(product);
  } catch (error) {
    res.status(400).json({ error: "Server error" });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    let product = await Product.findById(req.params.pid);
    let user = await User.findById(req.user.id);

    if (!product) {
      return res.status(400).json({ error: "No product found" });
    }
    const {
      name,
      address,
      city,
      country,
      price,
      image,
      features,
      category,
      description,
    } = req.body;

    let updatedProduct = {};

    if (image) updatedProduct.image = image;
    if (name) updatedProduct.name = name;
    if (address) updatedProduct.address = address;
    if (city) updatedProduct.city = city;
    if (country) updatedProduct.country = country;
    if (price) updatedProduct.price = price;
    if (features) updatedProduct.features = features;
    if (description) updatedProduct.description = description;
    if (category) updatedProduct.category = category;

    if (user.role === 0) {
      if (req.user.id.toString() !== product.user.toString()) {
        return res.status(401).json({ error: "You are not authorized" });
      }
    }

    product = await Product.findByIdAndUpdate(
      req.params.pid,
      { $set: updatedProduct },
      { new: true }
    );

    await product.save();
    res.json(product);
  } catch (error) {
    if (error.name == "CastError") {
      return res.status(400).json({ msg: "No product found" });
    }
    res.status(500).json({ error: "Server error" });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    let product = await Product.findById(req.params.pid);
    let user = await User.findById(req.user.id);
    if (!product) {
      return res.status(400).json({ error: "No product found" });
    }
    if (user.role === 0) {
      if (req.user.id.toString() !== product.user.toString()) {
        return res.status(401).json({ error: "You are not authorized" });
      }
    }

    await product.remove();
    res.json({ message: "Product deleted Successfully" });
  } catch (error) {
    if (error.name == "CastError") {
      return res.status(400).json({ msg: "No product found" });
    }
    res.status(500).json({ error: "Server error" });
  }
};

// Booking
exports.reserveProduct = async (req, res) => {
  const productId = req.params.pid;
  const userId = req.user.id;
  const { from, to } = req.body;

  try {
    const product = await Product.findById(productId);

    const isReserved = () => {
      let isTrue = false;
      product.rented.forEach((rentItem) => {
        var startDate1 = from;
        var endDate1 = to;
        var startDate2 = rentItem.from;
        var endDate2 = rentItem.to;
        if (
          (startDate1 >= startDate2 && startDate1 <= endDate2) ||
          (startDate2 > startDate1 && startDate2 < endDate1)
        ) {
          isTrue = true;
        } else {
          isTrue = false;
        }
      });
      return isTrue;
    };

    if (isReserved()) {
      return res
        .status(400)
        .json({ error: "Product Already reserved for propided date" });
    }

    const rented = { from, to, user: userId };
    product.rented.push(rented);

    const user = await User.findById(req.user.id);
    const rentedd = { from, to, product: productId, name: product.name };
    user.rented.push(rentedd);

    await product.save();
    await user.save();
    res.json(product);
  } catch (error) {
    if (error.name == "CastError") {
      return res.status(400).json({ msg: "No product found" });
    }
    res.status(500).send("Server Error");
  }
};

const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
  image: {
    type: [String],
  },
  address: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  name: {
    type: String,
    required: true,
  },
  rented: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      from: String,
      to: String,
    },
  ],
  price: {
    type: Number,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },

  features: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Product", productSchema);

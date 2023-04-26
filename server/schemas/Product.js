const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  title: String,
  description: String,
  price: Number,
  discountPercentage: Number,
  rating: Number,
  stock: Number,
  brand: String,
  category: String,
  thumbnail: String,
  images: Object,
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;

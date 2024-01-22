const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: false,
  },
  price: {
    type: Number,
    required: true,
  },
  img: {
    data: Buffer,
    contentType: String,
  },
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;

const mongoose = require("mongoose");
const { Schema } = mongoose;

const customerSchema = new Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phonenumber: {
    type: String,
    default: null,
  },
  location: {
    type: String,
    default: null,
  },
  password: {
    type: String,
    required: true,
  },
  cart: [
    {
      type: String,
    },
  ],
  orderHistory: {
    type: Array,
    default: [],
  },
});

const Customer = mongoose.model("Customer", customerSchema);
module.exports = Customer;

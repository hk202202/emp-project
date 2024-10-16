const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: String,
  email: String,
  mobileNo: String,
  designation: String, // HR/Manager/Sales
  gender: String, // Male/Female
  course: String, // MCA/BCA/BSC
  image: String, // Path or URL to the image
  createDate: { type: Date, default: Date.now }, // Automatically stores creation date
  userId: String, // In case you still want to keep track of users
  company: String, // For the company field
});

module.exports = mongoose.model("products", productSchema);

const express = require("express");
const cors = require("cors");
const user = require("./db/user");
const multer = require("multer");
require("./db/config");
const Product = require("./db/product");
const User = require("./db/user");
const { default: mongoose } = require("mongoose");
const app = express();
app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Save files to the "uploads" folder
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

app.post("/register", async (req, resp) => {
  let user = new User(req.body);
  let result = await user.save();
  result = result.toObject();
  delete result.password;
  resp.send(result);
});

app.post("/login", async (req, resp) => {
  if (req.body.password && req.body.email) {
    let user = await User.findOne(req.body).select("-password");
    if (user) resp.send(user);
    else resp.send("No user found");
  } else {
    resp.send("No user found");
  }
});

app.post("/add-product", upload.single("file"), async (req, resp) => {
  try {
    // Create a new product
    const { name, email, mobileNo, designation, gender, course } = req.body;

    // File path is stored in req.file
    const product = new Product({
      name,
      email,
      mobileNo,
      designation,
      gender,
      course,
      image: req.file.path, // Store the file path in the database
    });

    const result = await product.save();
    resp.status(201).send(result);
  } catch (error) {
    console.error("Error adding product:", error);
    resp.status(500).send({ error: "Failed to add product" });
  }
});

app.get("/products", async (req, resp) => {
  // Get the page and limit from query parameters or set defaults
  let { page = 1, limit = 10 } = req.query;

  // Convert page and limit to integers (they are strings by default)
  page = parseInt(page);
  limit = parseInt(limit);

  try {
    // Calculate how many products to skip based on the current page
    const skip = (page - 1) * limit;

    // Get the total number of products
    const totalProducts = await Product.countDocuments();

    // Fetch paginated products using skip and limit
    const products = await Product.find().skip(skip).limit(limit);

    // Send the products along with pagination info
    if (products.length > 0) {
      resp.send({
        products,
        totalProducts,
        totalPages: Math.ceil(totalProducts / limit),
        currentPage: page,
      });
    } else {
      resp.send({ result: "Not found" });
    }
  } catch (error) {
    // Handle errors (e.g., in case of a database issue)
    resp.status(500).send({ error: "Failed to fetch products" });
  }
});

app.delete("/product/:_id", async (req, resp) => {
  //  resp.send(req.params.id)
  var id = req.params;
  const result = await Product.deleteOne(id);

  //  confirm.log(result)
  // resp.send(result)
  // console.log(id);
  resp.send(result);
});

app.get("/product/:_id", async (req, resp) => {
  let result = await Product.findOne(req.params);
  if (result) {
    resp.send(result);
  } else {
    resp.send({ result: "No Record Found." });
  }
});

app.put("/product/:_id", upload.single("file"), async (req, resp) => {
  const { _id } = req.params;

  // Prepare the data for updating
  const updatedData = {
    name: req.body.name,
    email: req.body.email,
    mobileNo: req.body.mobileNo,
    designation: req.body.designation,
    gender: req.body.gender,
    course: req.body.course, // Updated to course
  };

  // Handle file upload
  if (req.file) {
    updatedData.file = req.file.path; // Save the file path or handle it as needed
  }

  let result = await Product.updateOne({ _id }, { $set: updatedData });
  resp.send(result);
});
app.get("/search/:key", async (req, resp) => {
  let result = await Product.find({
    name: { $regex: req.params.key, $options: "i" }, // 'i' makes it case-insensitive
  });
  resp.send(result);
});

app.get("/sort", async (req, res) => {
  const { sortBy = "name", order = "asc" } = req.query; // Query parameters for sorting
  const validSortFields = ["name", "email", "createDate", "_id"]; // Valid fields to sort by

  if (!validSortFields.includes(sortBy)) {
    return res.status(400).json({ error: "Invalid sort field" });
  }

  // Set sorting order (asc/desc)
  const sortOrder = order === "desc" ? -1 : 1;

  try {
    const products = await Product.find().sort({ [sortBy]: sortOrder });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Error fetching products" });
  }
});

app.listen(5000);

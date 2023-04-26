//express and cors setup
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const { config } = require("dotenv");
const Product = require("./schemas/Product");
config();

//middleware
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully!");
});

app.listen(5005, () => {
  console.log("Server has started on port 5005!");
});

app.get("/products", async (req, res) => {
  try {
    const products = await Product.find();
    return res.status(200).json(products);
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Error fetching products", error: err });
  }
});

app.post("/products/:id", async (req, res) => {
  try {
    const productId = parseInt(req.params.id);
    const productData = req.body;

    // Check if the product with the provided ID already exists
    const existingProduct = await Product.findOne({id: productId});
    if (existingProduct) {
      return res
        .status(400)
        .json({ message: "Product with the provided ID already exists" });
    }

    // Set the _id field of the productData to the provided productId
    productData.id = productId;

    // Create a new product using the Product model and save it to the database
    const newProduct = new Product(productData);
    await newProduct.save();

    // Send a success response with the newly created product
    res.status(201).json(newProduct);
  } catch (error) {
    console.error("Error creating a new product:", error);
    res.status(500).json({ message: "Error creating a new product", error });
  }
});

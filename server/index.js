//express and cors setup
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const { config } = require("dotenv");
const Product = require("./schemas/Product");
config();

const corsOptions = {
  origin: "http://localhost:8080",
  credentials: true,
};

//middleware
app.use(cors(corsOptions));
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

app.get('/products/:id', async (req, res) => {
  try {
    const productId = req.params.id;

    // Find the product with the provided id
    const product = await Product.findOne({ id: productId });

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Send the product as a response
    res.status(200).json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ message: 'Error fetching product', error });
  }
});

app.post("/products", async (req, res) => {
  try {
    const productData = req.body;

    // Check if the product with the provided ID already exists
    const existingProduct = await Product.findOne({id: req.body.id});
    if (existingProduct) {
      return res
        .status(400)
        .json({ message: "Product with the provided ID already exists" });
    }

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

app.put('/products/:id', async (req, res) => {
  try {
    const productId = req.params.id;
    const updatedData = req.body;

    // Find the product with the provided productId and update it
    const updatedProduct = await Product.findOneAndUpdate({ id: productId }, updatedData, { new: true, runValidators: true });

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Send the updated product as a response
    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ message: 'Error updating product', error });
  }
});

app.delete('/products/:id', async (req, res) => {
  try {
    const productId = req.params.id;

    // Find the product with the provided productId and delete it
    const deletedProduct = await Product.findOneAndDelete({ id: productId });

    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Send a success response with the deleted product
    res.status(200).json({ message: 'Product deleted', deletedProduct });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ message: 'Error deleting product', error });
  }
});
//express and cors setup
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require('mongoose');
const { config } = require("dotenv");
const Product = require("./schemas/Product");
config();

//middleware
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB database connection established successfully!');
});

app.listen(5005, () => {
  console.log("Server has started on port 5005!");
});

app.get('/products', async (req, res) => {
    try {
      const products = await Product.find();
      return res.status(200).json(products);
    } catch (err) {
      res.status(500).json({ message: 'Error fetching products', error: err });
    }
  });
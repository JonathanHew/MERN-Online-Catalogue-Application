//express and cors setup
const express = require("express");
const app = express();
const cors = require("cors");

//middleware
app.use(cors());
app.use(express.json());

app.listen(5005, () => {
  console.log("Server has started on port 5005!");
});

const express = require("express");
const dotenv = require("dotenv").config();
const port = process.env.PORT;
const User = require("./models/User");
const connectDB = require("./config/db");

//connect database
connectDB();

//initialize app
const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//GET users
app.get("/users", async (req, res) => {
  const user = await User.find();
  res.status(200).json(user);
});

//POST user
app.post("/users", async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please add a user");
  }

  const user = await User.create();
  res.status(200).json(user);
});

//UPDATE user
app.put("/users/:id", async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please add a user");
  }
  const user = await User.findById(req.params.id);
  if (!user) {
    throw new Error("Couldn't find user");
  }
  const available = await User.findByIdAndUpdate(req.params.id);
  res.status(200).json(available);
});

//DELETE user
app.delete("/users/:id", async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please add a user");
  }
  const user = await User.findById(req.params.id);
  if (!user) {
    throw new Error("Couldn't find user");
  }
  const deleted = await User.findByIdAndDelete(req.params.id);
  res.status(200).json(deleted);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

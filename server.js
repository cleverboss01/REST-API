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
  if (!req.body.name || !req.body.email) {
    res.status(400);
    throw new Error("Name && email field required!");
  }

  const user = await User.create({
    name: req.body.name,
    age: req.body.age,
    email: req.body.email,
  });
  res.status(200).json(user);
});

//UPDATE user
app.put("/users/:id", async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    res.status(400);
    throw new Error("Couldn't find user");
  }
  const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json(updatedUser);
});

//DELETE user
app.delete("/users/:id", async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    res.status(400);
    throw new Error("Couldn't find user");
  }
  await user.remove();
  res.status(200).json({ message: "Removed successfully!" });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

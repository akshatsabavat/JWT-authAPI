require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/userRoutes");
const goalRoutes = require("./routes/goalRoutes");
const app = express();
const port = 3000;

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;

db.on("error", (err) => console.log(err));
db.once("open", () => console.log(`Connected to ${process.env.DATABASE_URL}`));

app.use(bodyParser.json());
app.use("/userGoals/users", userRoutes);
app.use("/userGoals/goals", goalRoutes);
app.listen(port, () => {
  console.log(`Server live on : ${port}`);
});

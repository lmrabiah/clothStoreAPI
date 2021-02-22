const express = require("express");
const cors = require("cors");
const db = require("./db/models");

const orderRoutes = require("./routes/orders");
const productRoutes = require("./routes/products");

const app = express();

//middleware
app.use(cors());

//Routes

app.use("/products", productRoutes);
app.use(orderRoutes);

// if i put wrong url ex: localhost:8000/productss
app.use((req, res, next) => {
  console.log("Path dosn't exist");
  res.status(404).json({ message: "Path not found" });
});

//all errors (error handle middle ware)
app.use((err, req, res, next) => {
  console.log(err);
  res.status(err.status ?? 500);
  res.json({ message: err.message ?? "internal server error" });
});
////Route
const run = async () => {
  try {
    await db.sequelize.sync({ alter: true });
    console.log("Connection to the database successful!");
    await app.listen(8000, () => {
      console.log("The application is running on localhost:8000");
    });
  } catch (error) {
    console.error("Error connecting to the database: ", error);
  }
};

run();

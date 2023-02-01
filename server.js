const express = require("express");
const mongoose = require("mongoose");
const ConnectDB = require("./src/config/db");
const dotenv = require("dotenv");
dotenv.config();

const authRoute = require("./src/routes/auth.route");
const userRoute = require("./src/routes/user.route");
const productRoute = require("./src/routes/product.route");
const cartRoute = require("./src/routes/cart.route");
const orderRoute = require("./src/routes/order.route");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
// app.get("/", (req, res) => {
//   res.send({ name: "Kapil" });
// });
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);

ConnectDB();
let port = process.env.PORT;
app.listen(process.env.PORT || 8000, () => {
  console.log(`Backend Server Running on ${port} http://localhost:${port}`);
});

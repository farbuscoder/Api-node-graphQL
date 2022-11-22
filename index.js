import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import productRoutes from "./routes/products.route.js";

const app = express();
dotenv.config();

const connect = () => {
  mongoose
    .connect(process.env.MONGO_DB)
    .then(() => {
      console.log("connected to DB");
    })
    .catch((err) => {
      throw err;
    });
};

app.use(express.json());
app.use(cors());
app.use("/api/products", productRoutes);

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong!";
  return res.status(status).json({
    success: false,
    status,
    message,
  });
});

app.listen(8500, () => {
  connect();
  console.log("Conectado al server, puerto: 8500");
});

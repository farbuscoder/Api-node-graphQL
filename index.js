import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import palettesRoutes from "./src/routes/palettes.route.js";
import authRoutes from "./src/routes/auth.routes.js";
import cookieParser from "cookie-parser";
import userRoutes from "./src/routes/user.routes.js";
import debug from "debug";

const app = express();
dotenv.config();

const connect = () => {
  mongoose
    .set("strictQuery", false)
    .connect(process.env.MONGO_DB)
    .then(() => {
      console.log("connected to DB");
    })
    .catch((err) => {
      throw err;
    });
};

//MIDDLEWARES
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
    optionsSuccessStatus: 200,
  })
);
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/palettes", palettesRoutes);
app.use("/api/users", userRoutes);

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong!";
  return res.status(status).json({
    success: false,
    status,
    message,
  });
});

app.get("/", (req, res) => {
  res.send("This server is Connected");
});

app.listen(process.env.PORT, () => {
  connect();
  debug("Conectado al server, puerto: 8500");
});

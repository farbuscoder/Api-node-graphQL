import express from "express";
import {
  addProduct,
  deleteProduct,
  getProductById,
  getProducts,
  modifyProduct,
} from "../controllers/products.controller.js";

const router = express.Router();

//Get a product by id
router.get("/:id", getProductById);

//Create a product
router.post("/add", addProduct);

//Modify a product
router.put("/:id", modifyProduct);

//Delete a product
router.delete("/:id", deleteProduct);

//Get all Product
router.get("/", getProducts);

//Increase rank
router.post("/rank/:id");

export default router;

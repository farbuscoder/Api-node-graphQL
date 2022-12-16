import express from "express";
import {
  addPalette,
  deletePalette,
  getPaletteById,
  getPalettes,
  modifyPalette,
} from "../controllers/palettes.controller.js";

const router = express.Router();

//Get a Palette by id
router.get("/:id", getPaletteById);

//Create a Palette
router.post("/add", addPalette);

//Modify a Palette
router.put("/:id", modifyPalette);

//Delete a Palette
router.delete("/:id", deletePalette);

//Get all Palette
router.get("/", getPalettes);

//Increase rank
router.post("/rank/:id");

export default router;

import express from "express";
import {
  savePalette,
  deletePalette,
  getPaletteById,
  getPalettes,
  modifyPalette,
  trend,
  getPaletteByTag,
  searchPaletteTag,
  getRecentPalettes,
} from "../controllers/palettes.controller.js";
import { checkToken } from "../../checkToken.js";

const router = express.Router();

//Get a Palette by id
router.get("/:id", getPaletteById);

//Create a Palette
router.post("/add", checkToken, savePalette);

//Modify a Palette
router.put("/:id", checkToken, modifyPalette);

//Delete a Palette
router.delete("/:id", checkToken, deletePalette);

//Get all Palette
router.get("/", getPalettes);

//Get trending palettes (with most likes)
router.get("/get/trend", trend);

// Get related palettes by tag
router.get("/get/tags", getPaletteByTag);

//Get palettes by searching a tag
router.get("/get/search", searchPaletteTag);

//Get recent palettes
router.get("/get/recent/", getRecentPalettes);

export default router;

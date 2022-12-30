import express from "express";
import {
  getUserById,
  updateUser,
  deleteUser,
  likeAPalette,
  addOrRemoveFromFavorites,
} from "../controllers/user.controllers.js";
import { checkToken } from "../../checkToken.js";

const router = express.Router();

//Get user
router.get("/find/:id", getUserById);

//Update user
router.put("/:id", checkToken, updateUser);

//Delete user
router.delete("/:id", checkToken, deleteUser);

//Like a palette
router.put("/like/:paletteId", checkToken, likeAPalette);

//Add/ remove a palette from favorites
router.put("/favorites/:paletteId", checkToken, addOrRemoveFromFavorites);

export default router;

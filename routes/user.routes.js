import express from "express";
import { checkToken } from "../checkToken.js";
import {
  getUserById,
  updateUser,
  deleteUser,
  likeAPalette,
} from "../controllers/user.controllers.js";

const router = express.Router();

//Get user
router.get("/find/:id", getUserById);

//Update user
router.put("/:id", checkToken, updateUser);

//Delete user
router.delete("/:id", checkToken, deleteUser);

//Like a palette
router.put("/like/:paletteId", checkToken, likeAPalette);

export default router;

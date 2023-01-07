import express from "express";
import {
  getUserById,
  updateUser,
  deleteUser,
  likeAPalette,
  addOrRemoveFromFavorites,
  deleteUserWithPasswordVerification,
  getUsers,
} from "../controllers/user.controllers.js";
import { checkToken } from "../../checkToken.js";

const router = express.Router();

//Get user
router.get("/find/:id", getUserById);

//Get all users
router.get("/all/", getUsers);

//Update user
router.put("/:id", checkToken, updateUser);

//Delete user
router.delete("/:id", checkToken, deleteUser);

//Delete user with password verification

router.delete("/delete/account", deleteUserWithPasswordVerification);

//Like a palette
router.put("/like/:paletteId", checkToken, likeAPalette);

//Add/ remove a palette from favorites
router.put("/favorites/:paletteId", checkToken, addOrRemoveFromFavorites);

export default router;

import User from "../models/users.js";
import Palette from "../models/palettes.js";
import { createError } from "../error.js";

//UPDATE AN USER BY PARAMS ID
export const updateUser = async (req, res, next) => {
  if (req.params.id === req.user.id) {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json({ user: updatedUser, message: "User Actualizado" });
    } catch (error) {
      next(error);
    }
  } else {
    return next(createError(403, "You can update only on your account!"));
  }
};

//DELETE AN USER BY PARAMS ID
export const deleteUser = async (req, res, next) => {
  if (req.params.id === req.user.id) {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("User has been deleted");
    } catch (error) {
      next(error);
    }
  } else {
    return next(createError(403, "You can update only on your account!"));
  }
};

//GET USER BY PARAMS ID
export const getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    return next(createError(403, "This user does not exist!"));
  }
};

//LIKE A PALETTE
export const likeAPalette = async (req, res, next) => {
  const id = req.user.id;
  const paletteId = req.params.paletteId;
  const palette = await Palette.findById(paletteId);

  //If the palette has already been liked then the function pulls the userId from likes array.
  if (palette.likes.includes(id)) {
    await Palette.findByIdAndUpdate(paletteId, {
      $pull: { likes: id },
      $inc: {
        likesNumber: -1,
      },
    });
    res.status(201).json({ message: "El palette ha sido Deslikeado" });
  } else {
    try {
      await Palette.findByIdAndUpdate(paletteId, {
        $addToSet: { likes: id },
        $inc: {
          likesNumber: 1,
        },
      });
      res.status(201).json({ message: "El palette ha sido likeado" });
    } catch (error) {
      return next(createError(403, "Something went wrong!"));
    }
  }
};

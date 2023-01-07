import User from "../models/users.js";
import Palette from "../models/palettes.js";
import bcrypt from "bcrypt";
import { createError } from "../../error.js";

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

//DELETE USER USING PASSWORD VERIFICATION

export const deleteUserWithPasswordVerification = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const actualUser = await User.findOne({ email: email });
    if (!actualUser) {
      return res.status(404).json({ message: "Something went wrong" });
    }

    const matchPassword = await bcrypt.compare(password, actualUser.password);

    if (!matchPassword) {
      return res.status(404).json({ message: "Invalid credentials" });
    }

    if (matchPassword) {
      await User.findByIdAndDelete(actualUser._id);
    }

    res.status(201).json({ message: "User has been deleted" });

    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
    next();
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

// CONSEGUIR TODOS LOS USERS

export const getUsers = async (req, res, next) => {
  try {
    const users = await User.aggregate([{ $sample: { size: 30 } }]);
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
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
  // console.log(req.user.id);
  console.log(req);
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

// ADD/REMOVE A PALETTE FROM FAVORITES
export const addOrRemoveFromFavorites = async (req, res, next) => {
  console.log(req.user.id);
  const id = req.user.id;
  const paletteId = req.params.paletteId;
  const user = await User.findById(id);

  //If the palette is already added as a favourite then the function pulls the paletteId from the array.
  if (user.favs.includes(paletteId)) {
    await User.findByIdAndUpdate(id, {
      $pull: { favs: paletteId },
    });
    res
      .status(201)
      .json({ message: "El palette ha sido quitado de favoritos" });
  } else {
    try {
      await User.findByIdAndUpdate(id, {
        $addToSet: { favs: paletteId },
      });
      res
        .status(201)
        .json({ message: "El palette ha sido añadidos a favoritos" });
    } catch (error) {
      return next(createError(403, "Something went wrong!"));
    }
  }
};

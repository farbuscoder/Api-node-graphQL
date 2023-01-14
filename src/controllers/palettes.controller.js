import Palette from "../models/palettes.js";
import { createError } from "../../error.js";

// SAVE A NEW PALETTE

export const savePalette = async (req, res, next) => {
  const newPalette = new Palette({ ...req.body });
  try {
    const savedPalette = await newPalette.save();
    res.status(200).json(savedPalette);
    next();
  } catch (error) {
    res.status(404).json({ message: "The palette hasnt been saved" });
    console.log(error);
    //next(error);
  }
};

// GET A PALETTE BY PARAM ID

export const getPaletteById = async (req, res, next) => {
  try {
    const palette = await Palette.findById(req.params.id);

    res.status(200).json(palette);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Can not find the palette or the id is wrong" });
    next(error);
  }
};

// GET ALL PALETTES

export const getPalettes = async (req, res, next) => {
  try {
    const palettes = await Palette.find();
    res.status(200).json(palettes);
  } catch (error) {
    res.status(405).json({ message: "Cant get all the palettes" });
  }
};

//UPDATE A PALLETE
export const modifyPalette = async (req, res, next) => {
  try {
    const palette = await Palette.findById(req.params.id);

    if (palette) {
      await Palette.findByIdAndUpdate(
        req.params.id,

        {
          $set: req.body,
        },
        {
          new: true,
        }
      );
      res.status(200).json({
        message: "The palette has been modified succesfully",
      });
    } else {
      return res
        .status(404)
        .json({ error: "Can not find the palette your are looking for" });
    }
  } catch (error) {
    console.log(error);
  }
};

//DELETE A PALETTE BY PARAM ID
export const deletePalette = async (req, res, next) => {
  try {
    const palette = await Palette.findById(req.params.id);

    if (palette) {
      await Palette.findByIdAndDelete(req.params.id);
      res.status(200).json({
        message: "The palette has been deleted succesfully",
      });
    } else {
      return res.status(404).json({ error: "Can not find the palette" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Something went wrong" });
  }
};

//GET MORE LIKED PALETTES
export const trend = async (req, res, next) => {
  try {
    const palettes = await Palette.find().sort({ likesNumber: -1 });
    res.status(201).json(palettes);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// GET PALETTES BY TAG

export const getPaletteByTag = async (req, res, next) => {
  const tags = req.query.tags?.split(",");

  try {
    const palettes = await Palette.find({ tags: { $in: tags } }).limit(20);

    if (palettes.length == 0) {
      res.json({ messagae: "Cant find palettes that match your query" });
    } else {
      res.status(201).json(palettes);
    }
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
    next(err);
  }
};

// SEARCH PALETTES BY TAG

export const searchPaletteTag = async (req, res, next) => {
  const query = req.query.q;

  try {
    const palettes = await Palette.find({
      colors: { $regex: query },
    }).limit(40);
    if (palettes.length == 0) {
      res.json({ message: "Cant find palettes that match your query" });
    } else {
      res.status(201).json(palettes);
    }
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
    next(error);
  }
};

//GET RECENT PALETTES

export const getRecentPalettes = async (req, res, next) => {
  try {
    const recentPalettes = await sortPaletteFromRecentToOlder();

    res.status(201).json(recentPalettes);
  } catch (error) {
    console.log(error);
  }
};

const sortPaletteFromRecentToOlder = async () => {
  const list = await Palette.find();
  return list.sort((a, b) => b.createdAt - a.createdAt);
};

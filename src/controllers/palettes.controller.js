import Palette from "../models/palettes.js";
import { createError } from "../../error.js";

// AGREGAR NUEVO Palette

export const addPalette = async (req, res, next) => {
  const newPalette = new Palette({ ...req.body });
  try {
    const savedPalette = await newPalette.save();
    res.status(200).json(savedPalette);
    next();
  } catch (error) {
    res.status(404).json({message:"The palette hasnt been saved"});
    console.log(error);
    //next(error);
  }
};

// CONSEGUIR UNA PALETTE POR ID

export const getPaletteById = async (req, res, next) => {
  try {
    const palette = await Palette.findById(req.params.id);

    res.status(200).json(palette);
  } catch (error) {
    res.status(500).json({error:"Can not find the palette or the id is wrong"})
    next(error);
  }
};

// CONSEGUIR TODOS LOS PRODUCTOS

export const getPalettes = async (req, res, next) => {
  try {
    const palettes = await Palette.aggregate([{ $sample: { size: 15 } }]);
    res.status(200).json(palettes);
  } catch (error) {
    res.status(405).json({message:"Cant get all the palettes"})
  }
};

//MODIFICAR PALETTE
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
      return res.status(404).json({ error: "Can not find the palette your are looking for" });
    }
  } catch (error) {
    console.log(error);
  }
};

//ELIMINAR PALETTE
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
    return res.status(500).json({error:"Something went wrong"})
  }
};

//OBTENER PALETTES CON MAS LIKES
export const trend = async (req, res, next) => {
  try {
    const palettes = await Palette.find().sort({ likesNumber: -1 });
    res.status(201).json(palettes);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

//OBTENER PALETTES POR TAGS

export const getPaletteByTag = async (req, res, next) => {
  const tags = req.query.tags?.split(",");

  try {
    const palettes = await Palette.find({ tags: { $in: tags } }).limit(20);
    res.status(201).json(palettes);
  } catch (error) {
    res.status(500).json({error:"Something went wrong"})
    next(err);
  }
};

// BUSCAR PALETTE POR TAG

export const searchPaletteTag = async (req, res, next) => {
  const query = req.query.q;
  console.log(query);
  //const tags = req.query.tags.split(",");

  try {
    const palettes = await Palette.find({
      tags: { $regex: query },
    }).limit(40);
    res.status(201).json(palettes);
  } catch (error) {
    res.status(500).json({error:"Something went wrong"})
    next(error);
  }
};

//AGREGAR ORDENACION POR FECHA

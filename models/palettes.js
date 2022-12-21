import mongoose from "mongoose";

const PaletteSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: false,
    },
    colors: {
      type: [String],
      default: [],
    },
    likes: {
      type: [String],
      default: [],
    },
    likesNumber: {
      type: Number,
      default: 0,
    },
    tags: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Palette", PaletteSchema);

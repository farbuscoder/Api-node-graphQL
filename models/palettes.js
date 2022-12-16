import mongoose from "mongoose";

const PaletteSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      requited: true,
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
  },
  { timestamps: true }
);

export default mongoose.model("Palette", PaletteSchema);

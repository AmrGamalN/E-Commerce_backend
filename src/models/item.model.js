import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  stock: { type: Number, default: 0 },
  category: { type: String, required: true },
  isDeleted: { type: Boolean, default: false },
}, { timestamps: true });

export const Item = mongoose.model("Item", itemSchema);
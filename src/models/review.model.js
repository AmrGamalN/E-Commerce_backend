import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  itemId: { type: mongoose.Schema.Types.ObjectId, ref: "Item", required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: String,
  isDeleted: { type: Boolean, default: false }
}, { timestamps: true });

export const Review = mongoose.model("Review", reviewSchema);

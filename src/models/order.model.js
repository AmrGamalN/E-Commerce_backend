import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items: [{ itemId: { type: mongoose.Schema.Types.ObjectId, ref: "Item" }, quantity: Number, price: Number }],
  totalPrice: Number,
  status: { type: String, default: "Pending", enum: ["Pending","Processing","Shipped","Delivered","Cancelled"] },
  address: { type: String, required: true },
  paymentStatus: { type: String, default: "Pending", enum: ["Pending","Paid","Failed"] }
}, { timestamps: true });

export const Order = mongoose.model("Order", orderSchema);

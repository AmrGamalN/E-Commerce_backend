import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  phone: { type: String, required: true },
  role: { type: String, enum: ["User","Admin","Manager"], default:"User" },
  isBlocked: { type: Boolean, default: false },
  isDeleted: { type: Boolean, default: false },
  isConfirmEmail: { type: Boolean, default: false },
}, { timestamps: true });

userSchema.pre("save", async function(next){
  if(this.isModified("password")){
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

export const User = mongoose.model("User", userSchema);

import { redisClient } from "../config/redis.js";
import { User } from "../models/user.model.js";
import { Otp } from "../models/otp.model.js";
import { generateOTP } from "../utils/otp.js";
import { sendEmail } from "../utils/logger.js";
import bcrypt from "bcrypt";
import { generateAccessToken, generateRefreshToken } from "../utils/token.js";

export class UserService {
  static instance;
  static getInstance() {
    if(!UserService.instance) UserService.instance = new UserService();
    return UserService.instance;
  }

  async register(userData){
    const newUser = await User.create(userData);
    await redisClient.setEx(userData.email, 600, JSON.stringify(userData));
    const otp = generateOTP();
    await Otp.create({email:userData.email, otp});
    await sendEmail({to:userData.email, subject:"Verify your email", text:`OTP: ${otp}`});
    return {message:"User registered successfully, verify email", statusCode:201, success:true};
  }

  async verifyOTP(email, otpInput){
    const otpRecord = await Otp.findOne({email, otp:otpInput});
    if(!otpRecord) throw new Error("Invalid OTP");
    const userData = JSON.parse(await redisClient.get(email));
    const user = await User.findOne({email});
    if(!user) throw new Error("User not found");
    user.isConfirmEmail = true;
    await user.save();
    await Otp.deleteMany({email});
    await redisClient.del(email);
    return {message:"Email verified successfully", statusCode:200, success:true};
  }

  async login(email, password){
    const user = await User.findOne({email});
    if(!user) throw new Error("User not found");
    if(!user.isConfirmEmail) throw new Error("Email not verified");
    const match = await bcrypt.compare(password, user.password);
    if(!match) throw new Error("Invalid credentials");

    const accessToken = generateAccessToken({id:user._id, role:user.role});
    const refreshToken = generateRefreshToken({id:user._id, role:user.role});
    await redisClient.setEx(refreshToken, 7*24*60*60, user._id.toString()); 

    return {accessToken, refreshToken, statusCode:200, success:true};
  }
  async register(userData){
  const newUser = await User.create(userData);
  await redisClient.setEx(userData.email, 600, JSON.stringify(userData));
  const otp = generateOTP();
  await Otp.create({ email: userData.email, otp });

  console.log(`🟢 OTP for ${userData.email}: ${otp}`);

  await sendEmail({ to: userData.email, subject:"Verify your email", text:`OTP: ${otp}` });
  return { message: "User registered successfully, verify email", statusCode: 201, success: true };
}

}

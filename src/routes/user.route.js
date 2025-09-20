import express from "express";
import { UserController } from "../controllers/user.controller.js";
import { zodValidation } from "../middlewares/validation.middleware.js";
import { createUserSchema, loginUserSchema, verifyOtpSchema } from "../dto/user.dto.js";

const router = express.Router();
const userController = new UserController();

router.post("/register", zodValidation(createUserSchema), (req, res, next) => {
  console.log("register endpoint");
  userController.register(req, res, next);
});

router.post("/verify-otp", zodValidation(verifyOtpSchema), (req, res, next) => {
  console.log("verifyOTP endpoint");
  userController.verifyOTP(req, res, next);
});

router.post("/login", zodValidation(loginUserSchema), (req, res, next) => {
  console.log("login endpoint");
  userController.login(req, res, next);
});

export default router;

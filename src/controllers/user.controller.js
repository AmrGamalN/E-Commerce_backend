import { UserService } from "../services/user.service.js";

export class UserController {
  constructor() {
    this.userService = UserService.getInstance();
  }

  register = async (req, res, next) => {
    try {
      console.log(" register endpoint");
      const result = await this.userService.register(req.body);
      res.status(result.statusCode).json(result);
    } catch (error) {
      next(error);
    }
  }

  verifyOTP = async (req, res, next) => {
    try {
      console.log(" verifyOTP endpoint");
      const { email, otp } = req.body;
      const result = await this.userService.verifyOTP(email, otp);
      res.status(result.statusCode).json(result);
    } catch (error) {
      next(error);
    }
  }

  login = async (req, res, next) => {
    try {
      console.log(" login endpoint");
      const { email, password } = req.body;
      const result = await this.userService.login(email, password);
      res.status(result.statusCode).json(result);
    } catch (error) {
      next(error);
    }
  }
}

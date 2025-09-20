import { CustomError } from "../utils/customError.utils.js";

export const zodValidation = (schema) => (req, res, next) => {
  const parser = schema.safeParse(req.body);
  if (!parser.success) {
    throw new CustomError(
      "Validation Error",
      400,
      "Bad Request",
      parser.errors
    );
  }
  next();
};
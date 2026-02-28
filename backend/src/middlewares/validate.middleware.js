import { AppError } from "./error.middleware.js";

export const validate = (schema) => (req, res, next) => {
  try {
    schema.parse(req.body);
    next();
  } catch (err) {
    const message = err.errors?.[0]?.message || "Validation error";
    next(new AppError(message, 400));
  }
};

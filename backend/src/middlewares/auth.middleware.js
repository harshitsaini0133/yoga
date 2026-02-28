import { verifyToken } from "../utils/jwt.js";
import { AppError } from "./error.middleware.js";

export const verifyAuth = (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      throw new AppError("Unauthorized - No token provided", 401);
    }

    const { id, role } = verifyToken(token);
    req.user = { id, role };
    next();
  } catch (error) {
    if (error instanceof AppError) {
      next(error);
    } else {
      next(new AppError(error.message || "Unauthorized", 401));
    }
  }
};

import { verifyToken } from "../utils/jwt.js";
import { AppError } from "./error.middleware.js";

export const verifyAuth = (req, _res, next) => {
  try {
    let token = req.cookies?.token;

    if (!token && req.headers.authorization?.startsWith("Bearer ")) {
      token = req.headers.authorization.split(" ")[1];
    }

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

import { errorResponse } from "../utils/response.js";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export class AppError extends Error {
  constructor(message, statusCode = 500, errors = null) {
    super(message);

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true;
    this.errors = errors;

    Error.captureStackTrace(this, this.constructor);
  }
}

const handlePrismaError = (err) => {
  if (err.code === "P2002") {
    return new AppError("Duplicate field value", 409);
  }

  if (err.code === "P2025") {
    return new AppError("Record not found", 404);
  }

  return new AppError("Database error", 500);
};

const handleFirebaseError = (err) => {
  if (err.code?.includes("auth")) {
    return new AppError("Invalid or expired authentication token", 401);
  }

  return new AppError("Authentication service error", 500);
};

export const errorHandler = (err, req, res, next) => {
  let error = err;
  error.message = err.message;

  // Prisma Errors
  if (err instanceof PrismaClientKnownRequestError) {
    error = handlePrismaError(err);
  }

  // Firebase Errors
  if (
    err.code &&
    typeof err.code === "string" &&
    err.code.startsWith("auth/")
  ) {
    error = handleFirebaseError(err);
  }

  // Default AppError
  if (!error.statusCode) {
    error = new AppError("Internal Server Error", 500);
  }

  console.error(`[ERROR] ${error.message}`);

  return errorResponse(
    res,
    process.env.NODE_ENV === "production"
      ? error.statusCode === 500
        ? "Something went wrong"
        : error.message
      : error.message,
    error.statusCode,
    process.env.NODE_ENV === "development" ? err : null,
  );
};

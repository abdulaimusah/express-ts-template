import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/errors";
import { sendErrorResponse } from "../utils/responses";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof AppError) {
    sendErrorResponse(res, err.message, err.statusCode);
  } else {
    console.error("Unhandled error:", err);
    sendErrorResponse(res, "An unexpected error occurred", 500);
  }
};
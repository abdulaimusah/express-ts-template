import { Response } from "express";

export const sendSuccessResponse = (
  res: Response,
  data: any,
  statusCode = 200
) => {
  res.status(statusCode).json({
    status: "success",
    data,
  });
};

export const sendErrorResponse = (
  res: Response,
  message: string,
  statusCode = 400
) => {
  res.status(statusCode).json({
    status: "error",
    message,
  });
};
import { Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync";
import { sendSuccessResponse } from "../utils/responses";
import UserService from "../services/userService";

class UserController {
  createUser = catchAsync(async (req: Request, res: Response) => {
    const user = await UserService.findOrCreateUser(req.body);
    sendSuccessResponse(res, { user }, 201);
  });

  getUser = catchAsync(async (req: Request, res: Response) => {
    const user = await UserService.getUserById(req.params.id);
    sendSuccessResponse(res, { user });
  });

  updateUser = catchAsync(async (req: Request, res: Response) => {
    const user = await UserService.updateUser(req.params.id, req.body);
    sendSuccessResponse(res, { user });
  });
}

export default new UserController();
import { Request, Response, NextFunction } from "express";
import { UnauthorizedError } from "../utils/errors";
import { createInstance } from "@rownd/node";
import UserService from "../services/userService";

const rownd = createInstance({
  app_key: process.env.ROWND_APP_KEY,
  app_secret: process.env.ROWND_APP_SECRET,
});
const { authenticate } = rownd.express;

declare global {
  namespace Express {
    interface Request {
      isAuthenticated?: boolean;
      tokenInfo?: any;
      user?: any;
    }
  }
}

export const rowndAuth = authenticate({
  fetchUserInfo: true,
  setFullUserProfile: true,
});

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated && req.user?.role === "admin") {
    next();
  } else {
    next(new UnauthorizedError("Admin access required"));
  }
};

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Call the original auth middleware
    await new Promise<void>((resolve, reject) => {
      rowndAuth(req, res, (err: any) => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });

    // Ensure that the user object is available after authentication
    if (!req.user || !req.user.data?.email) {
      return next(new UnauthorizedError("User authentication failed."));
    }

    // Use the findOrCreateUser method to check if the user exists or create a new one
    const user = await UserService.findOrCreateUser({
      id: req.user.data.user_id,
      email: req.user.data.email,
      given_name: req.user.data.given_name || req.user.data.name,
      family_name: req.user.data.family_name,
      picture: req.user.data.profilePicture,
      email_verified: req.user.data.auth_level === "verified",
    });

    // Attach the user information to the request object for later use
    req.user = user;

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    console.error("Error in enhanced auth middleware:", error);
    next(new Error("An error occurred while processing the user information."));
  }
};
